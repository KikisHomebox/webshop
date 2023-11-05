import {VariantSelector, CartForm} from '@shopify/hydrogen';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import {useState} from 'react';

import ProductOptions from './ProductOptions';
import ActionButton from '../ActionButton/ActionButton';

const ProductForm = ({product, selectedVariant, variants}) => {
  const [lines, setLines] = useState(
    selectedVariant
      ? [
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
          },
        ]
      : [],
  );

  const onMinus = (e) => {
    if (Array.isArray(lines) && lines.length) {
      if (lines[0]?.quantity > 1) {
        setLines([{...lines[0], quantity: lines[0].quantity - 1}]);
      }
    }
  };

  const onPlus = (e) => {
    if (Array.isArray(lines) && lines.length) {
      setLines([{...lines[0], quantity: lines[0].quantity + 1}]);
    }
  };

  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <div className="product-quantity">
        <h5>Quantity</h5>
        <div className="product-quantity-input">
          <button
            onClick={onMinus}
            disabled={lines[0]?.quantity && lines[0]?.quantity <= 1}
          >
            <AiOutlineMinus />
          </button>
          <span>
            {Array.isArray(lines) && lines.length ? lines[0]?.quantity : 0}
          </span>
          <button
            onClick={onPlus}
            disabled={
              lines[0]?.quantity &&
              lines[0]?.quantity >= selectedVariant?.quantityAvailable
            }
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
      <CartForm
        route="/cart"
        inputs={{lines}}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher) => (
          <ActionButton
            disabled={!selectedVariant || !selectedVariant.availableForSale}
            onClick={() => {
              window.location.href = window.location.href + '#cart-aside';
            }}
            text={
              selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'
            }
            fetcher={fetcher}
          />
        )}
      </CartForm>
    </div>
  );
};

export default ProductForm;
