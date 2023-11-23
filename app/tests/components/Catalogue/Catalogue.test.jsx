import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Catalogue from '~/components/Catalogue/Catalogue';

const MOCK_PRODUCTS = {
  nodes: [
    {
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
    },
    {
      id: 'gid://shopify/Product/123457',
      title: 'Test Product 2',
      handle: 'test-product-2',
      availableForSale: false,
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
            id: 'gid://shopify/ProductVariant/333333',
            availableForSale: false,
            price: {
              amount: '195.99',
            },
          },
          {
            id: 'gid://shopify/ProductVariant/444444',
            availableForSale: false,
            price: {
              amount: '199.99',
            },
          },
        ],
      },
      images: {
        nodes: [
          {
            id: 'gid://shopify/ProductImage/123457',
            url: 'https://cdn.shopify.com/s/files/2',
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
        ],
      },
      seo: {
        title: null,
        description: null,
      },
    },
  ],
};

const MOCK_COLLECTIONS = {
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

jest.mock('../../../components/Catalogue/FilterAndSort', () => () => {
  return <div>Filter and sort</div>;
});

jest.mock('../../../components/Pagination/Pagination', () => () => {
  return <div>Pagination</div>;
});

// Mock the global window object
beforeEach(() => {
  global.scrollTo = jest.fn();
});

afterEach(() => {
  global.scrollTo.mockClear();
  delete global.scrollTo;
});

describe('Catalogue Component', () => {
  const props = {
    products: MOCK_PRODUCTS,
    collections: MOCK_COLLECTIONS,
  };

  it('Catalogue should render products', () => {
    render(<Catalogue {...props} />);
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('Catalogue should render filter and sort component', () => {
    render(<Catalogue {...props} />);
    expect(screen.getByText('Filter and sort')).toBeInTheDocument();
  });

  it('Catalogue should render Pagination component', () => {
    render(<Catalogue {...props} />);
    expect(screen.getByText('Pagination')).toBeInTheDocument();
  });
});
