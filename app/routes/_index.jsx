import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import MainPage from '~/components/MainPage/MainPage';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}) {
  const {storefront} = context;

  const recommendedProducts = await storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
  );
  const {blogs} = await storefront.query(BLOGS_QUERY);
  const bestSellers = await storefront.query(BEST_SELLING_PRODUCTS_QUERY);

  return json({
    recommendedProducts: recommendedProducts.products.nodes,
    blogs: blogs.nodes[0],
    bestSellers: bestSellers.products.nodes,
  });
}

export default function Homepage() {
  const {recommendedProducts, blogs, bestSellers} = useLoaderData();
  return (
    <div className="home">
      <MainPage
        recommendedProducts={recommendedProducts}
        blogs={blogs}
        bestSellers={bestSellers}
      />
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 100) {
      nodes {
        id
        availableForSale
        price {
          amount
        }
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

const BEST_SELLING_PRODUCTS_QUERY = `#graphql
  fragment BestSellingProduct on Product {
    id
    title
    handle
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 100) {
      nodes {
        id
        availableForSale
        price {
          amount
        }
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
  query BestSellingProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 3, sortKey: BEST_SELLING, reverse: true) {
      nodes {
        ...BestSellingProduct
      }
    }
  }
`;

const BLOGS_QUERY = `#graphql
  query Blogs(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    blogs(
      first: 3,
    ) {
      nodes {
        title
        handle
        seo {
          title
          description
        }
        articles(
          first: 3,
          reverse: true
        ) {
          nodes{
            contentHtml
            handle
            publishedAt
            id
            image {
              id
              altText
              url
            }
            title
            blog {
              handle
            }
            seo {
              description
              title
            }
          }
        }
      }
    }
  }
`;
