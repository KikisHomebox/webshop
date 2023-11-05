import ProductImage from './ProductImage';
import ProductMain from './ProductMain';

import './ProductPage.css';

const ProductPage = ({product, variants}) => {
  return (
    <div className="product">
      <ProductImage product={product} />
      <ProductMain product={product} variants={variants} />
    </div>
  );
};

export default ProductPage;
