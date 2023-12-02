import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Await, Link, useNavigate} from '@remix-run/react';
import {useVariantUrl} from '~/utils';
import {Suspense, useContext, useState} from 'react';
import {Audio} from 'react-loader-spinner';
import './Cart.css';
import {CartContext} from '../Layout/Layout';
import {
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import ActionButton from '../ActionButton/ActionButton';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';

export const CartComponent = ({cart, layout}) => {
  return (
    <div className="cart-container">
      <Suspense
        fallback={
          <Audio height="80" width="80" radius="9" ariaLabel="Loading" />
        }
      >
        <Await resolve={cart}>
          {(cart) => <CartMain cart={cart} layout={layout} />}
        </Await>
      </Suspense>
    </div>
  );
};

export function CartMain({layout, cart}) {
  const navigate = useNavigate();
  const {cartOpen, setCartOpen} = useContext(CartContext);
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);

  if (layout === 'aside') {
    return (
      <>
        {cartOpen && (
          <button
            className={`cart-close-outside${cartOpen ? ' cart-visible' : ''}`}
            onClick={() => setCartOpen(false)}
          />
        )}
        <aside className={`cart-aside${cartOpen ? ' cart-visible' : ''}`}>
          {linesCount ? (
            <>
              <div className="cart-aside-header">
                <h2 className="cart-aside-title">Your cart</h2>
                <span
                  className="cart-close-btn"
                  onClick={() => setCartOpen(false)}
                >
                  <AiOutlineClose />
                </span>
              </div>
              <CartDetails cart={cart} layout="aside" />
            </>
          ) : (
            <CartEmpty layout="aside" />
          )}
        </aside>
      </>
    );
  }
  return (
    <div className="cart-page">
      {linesCount ? (
        <>
          <div className="cart-page-header">
            <h1 className="cart-page-title">Your cart</h1>
            <span
              className="cart-page-link"
              onClick={() => navigate('/products')}
            >
              Continue shopping
            </span>
          </div>
          <CartDetails cart={cart} layout="page" />
        </>
      ) : (
        <CartEmpty layout="page" />
      )}
    </div>
  );
}

function CartDetails({layout, cart}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes.filter((code) => code.applicable).length);

  if (layout === 'aside') {
    return (
      <>
        <div className="cart-aside-details-label">
          <span>Product</span>
          <span>Total</span>
        </div>
        <CartLines
          withDiscount={withDiscount}
          lines={cart?.lines}
          layout={layout}
        />
        {cartHasItems && <CartSummary cost={cart.cost} layout={layout} />}
      </>
    );
  }
  return (
    <>
      <div className="cart-page-details-label">
        <span>Product</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>
      <CartLines
        withDiscount={withDiscount}
        lines={cart?.lines}
        layout={layout}
      />
      <CartSummary cost={cart.cost} layout={layout} cart={cart} />
    </>
  );
}

function CartLines({lines, layout}) {
  if (!lines) return null;
  return (
    <div className={`cart-lines-${layout}`}>
      {lines.nodes.map((line) => (
        <CartLineItem key={line.id} line={line} layout={layout} />
      ))}
    </div>
  );
}

function CartLineItem({layout, line}) {
  const {id, merchandise, cost} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  if (layout === 'aside') {
    return (
      <div key={id} className="cart-line-aside">
        {image && (
          <Image
            alt={title}
            data={image}
            loading="lazy"
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        )}

        <div className="cart-line-aside-detail">
          <span className="cart-line-web-title">Kiki&apos;s homebox</span>
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => (window.location.href = lineItemUrl)}
          >
            <h4 className="cart-line-product-title">{product.title}</h4>
          </Link>
          <div className="cart-line-text">
            <Money
              className="cart-line-money"
              withoutTrailingZeros
              data={cost.amountPerQuantity}
            />
            <div>
              {selectedOptions.map(
                (option) =>
                  option.name !== 'Title' && (
                    <div key={option.name} className="cart-line-options">
                      {option.name}: {option.value}
                    </div>
                  ),
              )}
            </div>
          </div>
          <CartLineQuantity line={line} />
        </div>
        <CartLinePrice line={line} as="span" />
      </div>
    );
  }

  return (
    <div key={id} className="cart-line-page">
      {image && (
        <Image
          alt={title}
          data={image}
          loading="lazy"
          sizes="(min-width: 45em) 50vw, 100vw"
        />
      )}
      <div className="cart-line-page-description">
        <span className="cart-line-web-title">Kiki&apos;s homebox</span>
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => (window.location.href = lineItemUrl)}
        >
          <h4 className="cart-line-product-title">{product.title}</h4>
        </Link>
        <div className="cart-line-text">
          <Money
            className="cart-line-money"
            withoutTrailingZeros
            data={cost.amountPerQuantity}
          />
          <div>
            {selectedOptions.map(
              (option) =>
                option.name !== 'Title' && (
                  <div key={option.name} className="cart-line-options">
                    {option.name}: {option.value}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <CartLineQuantity line={line} />
      <CartLinePrice line={line} as="span" />
    </div>
  );
}

export function CartSummary({cost, layout, cart}) {
  if (layout === 'aside') {
    return (
      <div className="cart-summary-aside">
        <CartOrderNote layout={layout} />
        <div className="cart-summary-detail">
          <div className="cart-summary-text">Estimated total</div>
          <Money data={cost.totalAmount} withoutTrailingZeros />
        </div>
        <div className="cart-summary-policy">
          Tax included. <Link to="/policies/shipping-policy">Shipping</Link> and
          discounts calculated at checkout.
        </div>
        <ActionButton
          filled
          onClick={() => window.open(cart.checkoutUrl)}
          text="Check out"
          customClassName={['cart-checkout-btn']}
        />
      </div>
    );
  }

  return (
    <div className="cart-summary-page">
      <CartOrderNote layout={layout} />
      <div className="cart-summary-detail-container">
        <div className="cart-summary-detail">
          <div className="cart-summary-text">Estimated total</div>
          <Money data={cost.totalAmount} withoutTrailingZeros />
        </div>
        <div className="cart-summary-policy">
          Tax included. <Link to="/policies/shipping-policy">Shipping</Link> and
          discounts calculated at checkout.
        </div>
        <ActionButton
          filled
          onClick={() => window.open(cart.checkoutUrl)}
          text="Check out"
          customClassName={['cart-checkout-btn']}
        />
      </div>
    </div>
  );
}

function CartLineRemoveButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button className="cart-line-remove-btn" type="submit">
        <AiOutlineDelete />
      </button>
    </CartForm>
  );
}

function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-buttons">
      <div className="cart-line-quantity">
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            name="decrease-quantity"
            value={prevQuantity}
          >
            <AiOutlineMinus />
          </button>
        </CartLineUpdateButton>
        <span>{quantity}</span>
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
          >
            <AiOutlinePlus />
          </button>
        </CartLineUpdateButton>
      </div>
      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  );
}

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <div className="cart-line-price">
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </div>
  );
}

export function CartEmpty({layout = 'aside'}) {
  const {setCartOpen} = useContext(CartContext);
  const navigate = useNavigate();
  if (layout === 'aside') {
    return (
      <div className="cart-aside-empty-container">
        <div className="cart-aside-empty-header">
          <span className="cart-close-btn" onClick={() => setCartOpen(false)}>
            <AiOutlineClose />
          </span>
        </div>
        <div className="cart-aside-empty">
          <h2 className="cart-aside-empty-title">Your cart is empty</h2>
          <ActionButton
            filled
            onClick={() => {
              navigate('/products');
              setCartOpen(false);
            }}
            text="Continue shopping"
            customClassName={['cart-aside-empty-btn']}
          />
          <div className="cart-aside-empty-login">
            <h3 className="cart-aside-empty-login-title">Have an account?</h3>
            <div>
              <Link
                to={'/account/login'}
                className="cart-aside-empty-login-link"
                as="span"
              >
                Log in
              </Link>{' '}
              to check out faster.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-page-empty">
      <h2 className="cart-page-empty-title">Your cart is empty</h2>
      <ActionButton
        filled
        onClick={() => {
          navigate('/products');
          setCartOpen(false);
        }}
        text="Continue shopping"
        customClassName={['cart-page-empty-btn']}
      />
      <div className="cart-page-empty-login">
        <h3 className="cart-page-empty-login-title">Have an account?</h3>
        <div>
          <Link to={'/account/login'} className="cart-page-link" as="span">
            Log in
          </Link>{' '}
          to check out faster.
        </div>
      </div>
    </div>
  );
}

function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

const CartOrderNote = ({layout}) => {
  const [noteOpen, setNoteOpen] = useState(false);
  const [cartNote, setCartNote] = useState('');
  if (layout === 'aside') {
    return (
      <CartForm route="/cart" action={CartForm.ACTIONS.NoteUpdate}>
        <div className="cart-aside-order-note-container">
          <div
            className={`cart-aside-order-note-header${
              noteOpen ? '' : ' note-close'
            }`}
            onClick={() => setNoteOpen((prev) => !prev)}
          >
            <span>Order special instructions</span>
            {noteOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
          {noteOpen && (
            <>
              <textarea
                name="note"
                className="cart-note-text"
                value={cartNote}
                onChange={(e) => setCartNote(e.target.value)}
              />
              <ActionButton
                customClassName={['cart-order-note-btn']}
                type="submit"
                text="Add note"
              />
            </>
          )}
        </div>
      </CartForm>
    );
  }

  return (
    <div className="cart-page-order-note-container">
      <CartForm route="/cart" action={CartForm.ACTIONS.NoteUpdate}>
        <span>Order special instructions</span>
        <textarea
          name="note"
          className="cart-note-text"
          value={cartNote}
          onChange={(e) => setCartNote(e.target.value)}
        />
        <ActionButton
          customClassName={['cart-order-note-btn']}
          type="submit"
          text="Add note"
        />
      </CartForm>
    </div>
  );
};
