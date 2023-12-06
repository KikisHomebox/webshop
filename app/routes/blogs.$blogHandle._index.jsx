import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getPaginationVariables} from '@shopify/hydrogen';
import BlogsPage from '~/components/Blogs/BlogsPage';

export const meta = ({data}) => {
  return [{title: `Kiki's Home Box | ${data.blog.title} blog`}];
};

export const loader = async ({request, params, context: {storefront}}) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 250,
  });

  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  const {blog} = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: params.blogHandle,
      ...paginationVariables,
    },
  });

  const recommendedProducts = await storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
  );

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return json({blog, recommendedProducts});
};

export default function Blog() {
  const data = useLoaderData();

  return (
    <div>
      <BlogsPage
        blogs={data.blog}
        recommendedProducts={data.recommendedProducts}
      />
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        reverse: true
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          startCursor,
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 3, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
