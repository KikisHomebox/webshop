import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import MainPage from '~/components/MainPage/MainPage';

const seo = ({data}) => ({
  title: window.location.href.includes('/fi')
    ? `Kiki's homebox | Kaikki kodin tarvikkeet yhdessä laatikossa`
    : `Kiki's homebox | All home essentials in one box`,

  description: window.location.href.includes('/fi')
    ? "Tutustu KIKI's Home Boxiin, äärimmäiseen ratkaisuun vaivattomaan muuttoon ja asettautumiseen Suomeen. " +
      'Tarjoamme kattavia kodin tarvikkeita ja muuttajille räätälöityjä palveluita. Tutustu korkealaatuisiin' +
      "tuotteisiin, mukavuuteen ja kohtuuhintaisuuteen. Yksinkertaista siirtymistäsi helpommin ALKUUN KIKI's Home Boxin."
    : "Discover KIKI'S Home Box, the ultimate solution for hassle-free relocation and settling in Finland. " +
      'We provide comprehensive home essential kits and services tailored for movers. Explore our high-quality ' +
      "products, convenience and affordability. Simplify your transition for AN EASIER START with KIKI'S Home Box.",
});

export const handle = {
  seo,
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
