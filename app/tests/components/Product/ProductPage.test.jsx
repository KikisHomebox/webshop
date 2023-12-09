import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPage from '~/components/Product/ProductPage';

const MOCK_PRODUCT = {
  id: 'gid://shopify/Product/123456',
  title: 'Test Product 1',
  handle: 'test-product-1',
  availableForSale: true,
  priceRange: {
    minVariantPrice: {
      amount: '195.99',
      currencyCode: 'EUR',
    },
  },
  createdAt: '2023-01-04T13:42:12Z',
  variants: {
    nodes: [
      {
        id: 'gid://shopify/ProductVariant/111111',
        availableForSale: true,
        price: {
          amount: '195.99',
        },
      },
      {
        id: 'gid://shopify/ProductVariant/222222',
        availableForSale: true,
        price: {
          amount: '199.99',
        },
      },
    ],
  },
  images: {
    nodes: [
      {
        id: 'gid://shopify/ProductImage/123456',
        url: 'https://cdn.shopify.com/s/files/1',
        altText: null,
        width: 1070,
        height: 1070,
      },
    ],
  },
  collections: {
    nodes: [
      {
        id: 'gid://shopify/Collection/111111',
        title: 'Test Collection 1',
      },
      {
        id: 'gid://shopify/Collection/222222',
        title: 'Test Collection 2',
      },
    ],
  },
  seo: {
    title: null,
    description: null,
  },
};

jest.mock('../../../components/Product/ProductMain', () => () => {
  return <div>Product Main</div>;
});

// eslint-disable-next-line no-unused-vars
let useContextMock;
let realUseContext;

// Mock the global window object and Cart context
beforeEach(() => {
  global.scrollTo = jest.fn();
  realUseContext = React.useContext;
  useContextMock = React.useContext = () => ({setCartOpen: jest.fn()});
});

afterEach(() => {
  global.scrollTo.mockClear();
  delete global.scrollTo;
  React.useContext = realUseContext;
});

const MOCK_VARIANTS = {
  product: {
    variants: {
      nodes: {
        availableForSale: true,
        compareAtPrice: null,
        id: 'test-variant-id-1',
        images: {
          id: 'test-variant-image-id-1',
          url: 'https://cdn.shopify.com/s/files/1',
          altText: null,
          width: 1070,
          height: 1070,
        },
        price: {
          amount: '195.99',
          currencyCode: 'EUR',
        },
        product: {
          title: 'Product title',
          handle: 'product-handle',
        },
        quantityAvailable: 24,
        title: 'default title',
        sku: '',
        unitPrice: null,
        selectedOptions: [
          {
            name: 'title',
            value: 'default title',
          },
        ],
      },
    },
  },
};

jest.mock('@shopify/hydrogen', () => {
  const Image = jest.fn();
  const Money = jest.fn();

  return {
    Image,
    Money,
  };
});

jest.mock('@remix-run/react', () => {
  const Link = jest.fn(({children}) => <a href="/test">{children}</a>);
  const useNavigate = jest.fn();
  return {
    Link,
    useNavigate,
  };
});

describe('Singe Product Page component', () => {
  it('renders Singe Product Page with all components', () => {
    render(<ProductPage product={MOCK_PRODUCT} variants={MOCK_VARIANTS} />);

    expect(screen.getByText('Product Main')).toBeInTheDocument();
  });
});
