import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {CartComponent, CartMain} from '../../../components/Cart/Cart';
import React from 'react';
import {useNavigate} from '@remix-run/react';

const MOCK_CART_EMPTY = {
  id: 'mock_cart_id',
  checkoutUrl: 'mock_cart_checkout_url',
  totalQuantity: 2,
  buyerIdentity: {
    countryCode: 'FI',
    customer: null,
    email: null,
    phone: null,
  },
  lines: {
    nodes: [],
  },
  cost: {
    subtotalAmount: {
      currencyCode: 'EUR',
      amount: '0.0',
    },
    totalAmount: {
      currencyCode: 'EUR',
      amount: '0.0',
    },
    totalDutyAmount: null,
    totalTaxAmount: null,
  },
  note: '',
  attributes: [],
  discountCodes: [],
};

const MOCK_CART_WITH_ITEMS = {
  id: 'mock_cart_id',
  checkoutUrl: 'mock_cart_checkout_url',
  totalQuantity: 2,
  buyerIdentity: {
    countryCode: 'FI',
    customer: null,
    email: null,
    phone: null,
  },
  lines: {
    nodes: [
      {
        id: 'mockCartLine1',
        quantity: 1,
        attributes: [],
        cost: {
          totalAmount: {
            currencyCode: 'EUR',
            amount: '189.99',
          },
          amountPerQuantity: {
            currencyCode: 'EUR',
            amount: '189.99',
          },
          compareAtAmountPerQuantity: null,
        },
        merchandise: {
          id: 'gid://shopify/ProductVariant/44665556140300',
          availableForSale: true,
          compareAtPrice: null,
          price: {
            currencyCode: 'EUR',
            amount: '189.99',
          },
          requiresShipping: true,
          title: 'Single (90*200) / Spots',
          image: {
            id: 'gid://shopify/ProductImage/44670495555852',
            url: 'https://cdn.shopify.com/s/files/1/0669/4273/0508/files/Screenshot2023-10-07at19.45.43_4dbd00ad-69fc-46c8-a338-b75974c0aa96.png?v=1697435518',
            altText: null,
            width: 1136,
            height: 1146,
          },
          product: {
            handle: 'student-starter-kit',
            title: 'Student starter kit',
            id: 'gid://shopify/Product/8461723500812',
          },
          selectedOptions: [
            {
              name: 'Beddings Size',
              value: 'Single (90*200)',
            },
            {
              name: 'Color',
              value: 'Spots',
            },
          ],
        },
      },
      {
        id: 'gid://shopify/CartLine/e24c8070-c95d-45c3-a131-61d93c211530?cart=c1-e94a182ff28637196b3818bcdf50a59d',
        quantity: 1,
        attributes: [],
        cost: {
          totalAmount: {
            currencyCode: 'EUR',
            amount: '6.99',
          },
          amountPerQuantity: {
            currencyCode: 'EUR',
            amount: '6.99',
          },
          compareAtAmountPerQuantity: null,
        },
        merchandise: {
          id: 'gid://shopify/ProductVariant/43934270947596',
          availableForSale: true,
          compareAtPrice: null,
          price: {
            currencyCode: 'EUR',
            amount: '6.99',
          },
          requiresShipping: true,
          title: 'Default Title',
          image: {
            id: 'gid://shopify/ProductImage/43652905828620',
            url: 'https://cdn.shopify.com/s/files/1/0669/4273/0508/files/CY5655870_COMPOSITION_001.jpg?v=1687206906',
            altText: null,
            width: 1600,
            height: 925,
          },
          product: {
            handle: 'bathroom-mat',
            title: 'Bathroom mat',
            id: 'gid://shopify/Product/8158531453196',
          },
          selectedOptions: [
            {
              name: 'Title',
              value: 'Default Title',
            },
          ],
        },
      },
    ],
  },
  cost: {
    subtotalAmount: {
      currencyCode: 'EUR',
      amount: '196.98',
    },
    totalAmount: {
      currencyCode: 'EUR',
      amount: '196.98',
    },
    totalDutyAmount: null,
    totalTaxAmount: null,
  },
  note: '',
  attributes: [],
  discountCodes: [],
};

jest.mock('react-loader-spinner', () => {
  const Audio = jest.fn();
  return {Audio};
});

jest.mock('../../../components/ActionButton/ActionButton', () =>
  jest.fn(({onClick, text}) => <button onClick={onClick}>{text}</button>),
);

jest.mock('@shopify/hydrogen', () => {
  const Image = jest.fn();
  const Money = jest.fn();
  const CartForm = jest.fn().mockImplementation(() => <div>Cart Form</div>);
  CartForm.ACTIONS = jest.fn().mockImplementation({
    LinesRemove: jest.fn(),
    LinesUpdate: jest.fn(),
    NoteUpdate: jest.fn(),
  });

  return {
    Image,
    Money,
    CartForm,
  };
});

jest.mock('@remix-run/react', () => {
  const Link = jest.fn(({to, children}) => <a href={to}>{children}</a>);
  const useNavigate = jest.fn(() => jest.fn());
  const Await = jest.fn(() => <div>Mock Await</div>);

  return {
    Link,
    useNavigate,
    Await,
  };
});

jest.mock('../../../utils', () => {
  const useVariantUrl = jest.fn();
  return {
    useVariantUrl,
  };
});

// eslint-disable-next-line no-unused-vars
let useContextMock;
let realUseContext;

// Mock the global window object and Cart context
beforeEach(() => {
  global.open = jest.fn();
  realUseContext = React.useContext;
  useContextMock = React.useContext = () => ({setCartOpen: jest.fn()});
});

afterEach(() => {
  global.open.mockClear();
  delete global.open;
  React.useContext = realUseContext;
});

describe('CartComponent component', () => {
  it('Should render its children', () => {
    render(<CartComponent cart={MOCK_CART_EMPTY} layout="aside" />);
    expect(screen.getByText('Mock Await')).toBeInTheDocument();
  });
});

describe('CartMain aside component', () => {
  it('Should render CartEmpty component if no item is in the cart', () => {
    render(<CartMain layout="aside" cart={MOCK_CART_EMPTY} />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Have an account?')).toBeInTheDocument();

    const productButton = screen.getByText('Continue shopping');
    fireEvent.click(productButton);
    expect(useNavigate).toHaveBeenCalled();
  });

  it('Should render CartDetails component if there are items in the cart', () => {
    render(<CartMain cart={MOCK_CART_WITH_ITEMS} layout="aside" />);
    expect(MOCK_CART_WITH_ITEMS.lines.nodes.length).toBe(2);
    expect(screen.getByText('Your cart')).toBeInTheDocument();
    MOCK_CART_WITH_ITEMS.lines.nodes.map((item) => {
      expect(
        screen.getByText(item.merchandise.product.title),
      ).toBeInTheDocument();
    });
  });

  it('Should render CartSummary component if there are items in the cart', () => {
    render(<CartMain cart={MOCK_CART_WITH_ITEMS} layout="aside" />);
    expect(screen.getByText('Check out')).toBeInTheDocument();
    expect(screen.getByText('Estimated total')).toBeInTheDocument();
  });
});

describe('CartMain page component', () => {
  it('Should render CartEmpty component if no item is in the cart for page layout', () => {
    render(<CartMain layout="page" cart={MOCK_CART_EMPTY} />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Have an account?')).toBeInTheDocument();

    const productButton = screen.getByText('Continue shopping');
    fireEvent.click(productButton);
    expect(useNavigate).toHaveBeenCalled();
  });

  it('Should render CartDetails component if there are items in the cart for page layout', () => {
    render(<CartMain cart={MOCK_CART_WITH_ITEMS} layout="page" />);
    expect(MOCK_CART_WITH_ITEMS.lines.nodes.length).toBe(2);
    expect(screen.getByText('Your cart')).toBeInTheDocument();
    MOCK_CART_WITH_ITEMS.lines.nodes.map((item) => {
      expect(
        screen.getByText(item.merchandise.product.title),
      ).toBeInTheDocument();
    });
  });

  it('Should render CartSummary component if there are items in the cart', () => {
    render(<CartMain cart={MOCK_CART_WITH_ITEMS} layout="page" />);
    expect(screen.getByText('Check out')).toBeInTheDocument();
    expect(screen.getByText('Estimated total')).toBeInTheDocument();
  });
});
