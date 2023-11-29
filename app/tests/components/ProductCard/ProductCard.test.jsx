import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import ProductCard from '../../../components/ProductCard/ProductCard';

jest.mock('@shopify/hydrogen', () => {
  const Money = jest.fn(() => null);
  const Image = jest.fn(() => null);
  return {
    Money,
    Image,
  };
});

jest.mock('@remix-run/react', () => {
  const useNavigate = jest.fn(() => jest.fn());
  const Link = jest.fn(() => <p>Mocked Link</p>);
  return {
    useNavigate,
    Link,
  };
});

jest.mock('../../../components/ProductCard/ProductCardButton', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <p>Mocked ProductCardButton</p>),
  };
});

describe('ProductCard', () => {
  const mockProduct = {
    id: 'id',
    title: 'title',
    handle: 'handle',
    availableForSale: true,
    createdAt: 'createdAt',
    priceRange: {
      maxVariantPrice: {
        amount: 'amount',
        currencyCode: 'currencyCode',
      },
      minVariantPrice: {
        amount: 'amount',
        currencyCode: 'currencyCode',
      },
    },
    images: {
      nodes: [
        {
          id: 'id',
          url: 'url',
          altText: 'altText',
          width: 1,
        },
      ],
    },
  };

  it('should render correctly with correct information', () => {
    render(<ProductCard product={mockProduct} />);
    // Assert that the mocked link is rendered
    expect(screen.getByText('Mocked Link')).toBeInTheDocument();
    // Assert that the product card button is rendered
    expect(screen.getByText('Mocked ProductCardButton')).toBeInTheDocument();
  });
});
