import {useLoaderData} from '@remix-run/react';
import Catalogue from '../components/Catalogue/Catalogue';
import {json} from '@shopify/remix-oxygen';

export async function loader({context, request}) {
  const {storefront} = context;

  const {products} = await storefront.query(ALL_PRODUCTS_QUERY);
  return json({products});
}

export default function Products() {
  const {products} = useLoaderData();
  return <Catalogue products={products} />;
}

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
