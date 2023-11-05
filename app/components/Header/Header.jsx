import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import logo from '../../../public/kikiHomeBoxLogo.avif';
import './header.css';
import {BsSearch, BsPerson, BsCart3} from 'react-icons/bs';
import HeaderTop from './HeaderTop';
import {HeaderMenu} from './HeaderMenu';

export function Header({header, isLoggedIn, cart}) {
  const {menu} = header;
  return (
    <div>
      <HeaderTop />
      <header className="header">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle}>
          <img src={logo} className="image" alt="Kiki's Home Box"></img>
        </NavLink>
        <HeaderMenu menu={menu} viewport="desktop" />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </header>
    </div>
  );
}

function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : <BsPerson style={{fontSize: '20px'}} />}
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return (
    <a href="#search-aside">
      {' '}
      <BsSearch style={{fontSize: '20px'}} />{' '}
    </a>
  );
}

function CartBadge({count}) {
  return (
    <a href="#cart-aside" style={{textDecoration: 'none'}}>
      <BsCart3 style={{fontSize: '20px'}} /> {count}
    </a>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
