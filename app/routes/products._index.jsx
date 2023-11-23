import {useLoaderData} from '@remix-run/react';
import Catalogue from '../components/Catalogue/Catalogue';
import {json} from '@shopify/remix-oxygen';

export async function loader({context, request}) {
  const {storefront} = context;

  const {products} = await storefront.query(ALL_PRODUCTS_QUERY);
  const {collections} = await storefront.query(ALL_COLLECTIONS_QUERY);
  return json({
    products,
    collections,
  });
}

export default function Products() {
  const {products, collections} = useLoaderData();
  return <Catalogue products={products} collections={collections} />;
}

const ALL_COLLECTIONS_QUERY = `#graphql
  query StoreCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 30) {
      nodes {
        id
        title
      }
    }
  }
`;

const ALL_PRODUCTS_QUERY = `#graphql
fragment Product on Product {
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
  createdAt
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
  collections(first:20) {
    nodes {
      id
      title
    }
  }
  seo {
    title
    description
  }
}
query AllProducts (
    $country: CountryCode, 
    $language: LanguageCode,
  )
  @inContext(country: $country, language: $language) {
  products(first: 250) {
    nodes {
      ...Product
    }
  }
}
`;
