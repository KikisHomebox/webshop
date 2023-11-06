import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import './ProductCard.css';
import ProductCardButton from './ProductCardButton';

const ProductCard = ({product}) => {
  return (
    <div className="product-card">
      <Link key={product.id} to={`/products/${product.handle}`}>
        <Image
          data={product.images.nodes[0]}
          alt={product.images.nodes[0].altText}
          key={product.images.nodes[0].id}
          aspectRatio="1/1"
          sizes="(min-width: 45em) 50vw, 100vw"
        />
        <h4 className="product-card-title">{product.title}</h4>
        <div className="product-card-money">
          From <Money data={product.priceRange.minVariantPrice} as="span" />
        </div>
      </Link>
      <ProductCardButton product={product} />
    </div>
  );
};

export default ProductCard;
