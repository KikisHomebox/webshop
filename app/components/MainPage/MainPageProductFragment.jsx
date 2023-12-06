import ProductCard from '../ProductCard/ProductCard';
import './MainPageProductFragment.css';

const MainPageProductFragment = ({title, subtitle, products}) => {
  return (
    <div className="products-fragment">
      <h1 className="products-fragment-title">{title}</h1>
      {subtitle && <h2 className="products-fragment-subtitle">{subtitle}</h2>}
      <div className="products-fragment-wrapper">
        {products.map((product) => (
          //eslint-disable-next-line react/jsx-key
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default MainPageProductFragment;
