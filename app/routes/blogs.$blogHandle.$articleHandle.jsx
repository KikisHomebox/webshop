import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import SingleBlogPage from '~/components/Blogs/SingleBlogPage';

const seo = ({data}) => ({
  title: `Kiki's homebox | ${data.article.articleByHandle.title}`,

  description: getMetaDescriptionText({
    blogHtml: data.article.articleByHandle.contentHtml,
  }),
});

export const handle = {
  seo,
};

function getMetaDescriptionText({blogHtml}) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = blogHtml;
  const blogText = tempElement.querySelector('p').innerText;
  return blogText.substring(0, 160);
}

export async function loader({params, context}) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  const recommendedProducts = await context.storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
  );

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog;

  return json({article, recommendedProducts});
}

export default function Article() {
  const data = useLoaderData();

  return (
    <div>
      <SingleBlogPage
        article={data.article.articleByHandle}
        blogs={data.article.articles}
        recommendedProducts={data.recommendedProducts}
      />
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
      articles(first: 15, reverse: true) {
        nodes {
          ...ArticleItem
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
