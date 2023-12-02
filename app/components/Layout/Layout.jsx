import {Await} from '@remix-run/react';
import {Suspense, createContext, useState} from 'react';
import {Aside} from '~/components/Aside/Aside';
import {Footer} from '~/components/Footer/Footer';
import {Header} from '~/components/Header/Header';
import {CartComponent} from '~/components/Cart/Cart';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search/Search';
import {HeaderMenu} from '../Header/HeaderMenu';

export const CartContext = createContext(null);

export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
      }}
    >
      <div className={`${cartOpen ? 'disable-scroll' : ''}`}>
        <CartComponent cart={cart} layout="aside" />
        <SearchAside />
        <MobileMenuAside menu={header.menu} />
        <Header header={header} cart={cart} isLoggedIn={isLoggedIn} />
        <main>{children}</main>
        <Suspense>
          <Await resolve={footer}>
            {(footer) => <Footer menu={footer.menu} />}
          </Await>
        </Suspense>
      </div>
    </CartContext.Provider>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {
            /* istanbul ignore next */ ({fetchResults, inputRef}) => (
              <div>
                <input
                  name="q"
                  onChange={fetchResults}
                  onFocus={fetchResults}
                  placeholder="Search"
                  ref={inputRef}
                  type="search"
                />
                &nbsp;
                <button type="submit">Search</button>
              </div>
            )
          }
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

function MobileMenuAside({menu}) {
  return (
    <Aside id="mobile-menu-aside" heading="MENU">
      <HeaderMenu menu={menu} viewport="mobile" />
    </Aside>
  );
}
