import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import './recommendedProducts.css';

const RecommendedProducts = ({products}) => {
  return (
    <div className="recommendedProducts-grid">
      <h2>
        Check out our hassle-free kits that includes all the essentials for an
        easy move
      </h2>
      <div className="recommendedProducts-body">
        {products.nodes.map((product) => (
          <Link
            key={product.id}
            className="recommendedProduct"
            to={`/products/${product.handle}`}
          >
            <Image
              data={product.images.nodes[0]}
              aspectRatio="1/1"
              sizes="(min-width: 45em) 20vw, 50vw"
            />
            <h4>{product.title}</h4>
            <small>
              <Money data={product.priceRange.minVariantPrice} />
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
