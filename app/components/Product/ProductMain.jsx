import {Suspense} from 'react';
import {Await, Link} from '@remix-run/react';
import {Money} from '@shopify/hydrogen';

import ProductForm from './ProductForm';

const ProductMain = ({product, variants}) => {
  const {selectedVariant, title, descriptionHtml} = product;

  return (
    <div className="product-main">
      <h1 className="product-title">{title}</h1>
      <div className="product-price">
        {selectedVariant?.compareAtPrice ? (
          <>
            <p>Sale</p>
            <br />
            <div className="product-price-on-sale">
              {selectedVariant ? <Money data={selectedVariant.price} /> : null}
              <s>
                <Money data={selectedVariant.compareAtPrice} as="span" />
              </s>
            </div>
          </>
        ) : (
          selectedVariant?.price && (
            <Money data={selectedVariant?.price} as="span" />
          )
        )}
        &nbsp;EUR
        {!selectedVariant?.availableForSale && (
          <span className="product-availability">Sold out</span>
        )}
      </div>
      <p className="product-shipping-policy">
        Tax included.&nbsp;
        <Link
          key="product-shipping-policy"
          prefetch="intent"
          preventScrollReset
          to="/policies/shipping-policy"
        >
          Shipping
        </Link>
        &nbsp;calculated at checkout.
      </p>
      <div className="product-description">
        <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      </div>
      <Suspense
        fallback={
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={[]}
          />
        }
      >
        <Await
          errorElement="There was a problem loading product variants"
          resolve={variants}
        >
          {(data) => (
            <ProductForm
              product={product}
              selectedVariant={selectedVariant}
              variants={data.product?.variants.nodes || []}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProductMain;
