import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import ProductCardButton from '../../../components/ProductCard/ProductCardButton';
import {useNavigate} from '@remix-run/react';

jest.mock('@shopify/hydrogen', () => {
  const CartForm = jest.fn(() => 'mockCartForm');
  CartForm.ACTIONS = {
    LinesAdd: 'mockLinesAdd', // You can replace 'mockLinesAdd' with any suitable value
  };
  return {
    CartForm,
  };
});

// Mock the @remix-run/react useNavigate hook
jest.mock('@remix-run/react', () => {
  const useNavigate = jest.fn(() => jest.fn());
  return {
    useNavigate,
  };
});

describe('ProductCardButton', () => {
  it('renders "Sold out" button when product is not available for sale', () => {
    const product = {availableForSale: false};
    render(<ProductCardButton product={product} />);
    expect(screen.getByText('Sold out')).toBeInTheDocument();
  });

  it('renders "Choose option" button when there are multiple variants and clicks', () => {
    const product = {availableForSale: true, variants: {nodes: [{}, {}]}};
    render(<ProductCardButton product={product} />);
    expect(screen.getByText('Choose option')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Choose option'));
    expect(useNavigate).toHaveBeenCalled();
  });

  it('renders "Add to cart" button when there is one variant', () => {
    const product = {
      availableForSale: true,
      variants: {nodes: [{id: 'variantId'}]},
    };
    render(<ProductCardButton product={product} />);
    expect(screen.getByText('mockCartForm')).toBeInTheDocument();
  });
});
