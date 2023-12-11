import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {HeaderMenu, activeLinkStyle} from '~/components/Header/HeaderMenu';

jest.mock('@remix-run/react', () => {
  const useMatches = jest.fn(() => [
    {data: {publicStoreDomain: 'myshopify.com'}},
  ]);
  const NavLink = jest.fn(() => <p>Mocked NavLink</p>);

  return {
    useMatches,
    NavLink,
  };
});

describe('HeaderMenu', () => {
  it('renders the menu options', () => {
    const menu = {
      id: 'gid://shopify/Menu/208708206860',
      items: [
        {
          id: 'gid://shopify/MenuItem/484695179532',
          resourceId: null,
          tags: [],
          title: 'Home',
          type: 'FRONTPAGE',
          url: 'https://kikis-homebox.myshopify.com/',
          items: [],
        },
      ],
    };
    render(<HeaderMenu menu={menu} viewport="desktop" />);
    expect(screen.getByText('Mocked NavLink')).toBeInTheDocument();
  });

  it('returns null when a bogous link is provided', () => {
    const menu = {
      id: 'gid://shopify/Menu/208708206860',
      items: [
        {
          id: 'gid://shopify/MenuItem/484695179532',
          resourceId: null,
          tags: [],
          title: 'Home',
          type: 'FRONTPAGE',
          url: 'https://bogus-link/kikis-homebox.myshopify.com/',
          items: [],
        },
      ],
    };
    render(<HeaderMenu menu={menu} viewport="desktop" />);
    expect(screen.queryByText('Mocked NavLink')).toBeNull();
  });

  it('handles click event on mobile viewport', () => {
    const menu = {
      id: 'gid://shopify/Menu/208708206860',
      items: [
        {
          id: 'gid://shopify/MenuItem/484695179532',
          resourceId: null,
          tags: [],
          title: 'Home',
          type: 'FRONTPAGE',
          url: 'https://bogus-link/kikis-homebox.myshopify.com/',
          items: [],
        },
      ],
    };
    render(<HeaderMenu menu={menu} viewport="mobile" />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('header-menu-mobile');
  });
});

describe('activeLinkStyle', () => {
  it('return "bold" for fontWeight, "grey" for color', () => {
    const style = activeLinkStyle({isActive: true, isPending: true});
    expect(style).toEqual({fontWeight: 'bold', color: 'grey'});
  });

  it('return "undefined" for fontWeight, "black" for color', () => {
    const style = activeLinkStyle({isActive: false, isPending: false});
    expect(style).toEqual({fontWeight: undefined, color: 'black'});
  });

  it('return "undefined" for fontWeight, "grey" for color', () => {
    const style = activeLinkStyle({isActive: false, isPending: true});
    expect(style).toEqual({fontWeight: undefined, color: 'grey'});
  });

  it('return "bold" for fontWeight, "black" for color', () => {
    const style = activeLinkStyle({isActive: true, isPending: false});
    expect(style).toEqual({fontWeight: 'bold', color: 'black'});
  });
});
