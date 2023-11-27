import ActionButton from '../ActionButton/ActionButton';
import {useNavigate} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';

const ProductCardButton = ({product}) => {
  const navigate = useNavigate();
  if (!product.availableForSale) {
    return (
      <ActionButton
        disabled={true}
        text="Sold out"
        customClassName={['product-card-button']}
      />
    );
  }
  if (product.variants.nodes.length > 1) {
    return (
      <ActionButton
        text="Choose option"
        onClick={() => navigate(`/products/${product.handle}`)}
        customClassName={['product-card-button']}
        type={null}
      />
    );
  }
  const lines = [
    {
      merchandiseId: product.variants.nodes[0].id,
      quantity: 1,
    },
  ];
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      <ActionButton
        onClick={
          /* istanbul ignore next */ () => {
            /* istanbul ignore next */ window.location.href =
              window.location.href + '#cart-aside';
          }
        }
        text="Add to cart"
        customClassName={['product-card-button']}
      />
    </CartForm>
  );
};

export default ProductCardButton;
