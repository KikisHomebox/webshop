import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterMenu from '~/components/Footer/FooterMenu';

const MOCK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

const mockMatches = [
  {
    id: 1,
    pathname: '/home',
    data: {title: 'Home'},
    params: {id: '1'},
    handle: 'root',
  },
];

jest.mock('@remix-run/react', () => {
  const NavLink = jest.fn(({children}) => <a href="/test">{children}</a>);
  const useMatches = jest.fn(() => mockMatches);
  return {
    NavLink,
    useMatches,
  };
});

describe('Footer component', () => {
  it('renders Layout with all components', () => {
    render(<FooterMenu menu={MOCK_FOOTER_MENU} />);

    expect(screen.getByText('Quick links')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });
});
