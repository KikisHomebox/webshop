import {Image} from '@shopify/hydrogen';
import {useEffect, useState} from 'react';

const ProductImage = ({product}) => {
  const {selectedVariant} = product;
  const [selectedImg, setSelectedImg] = useState(selectedVariant?.image);
  const relatedImages = product?.images?.nodes;

  useEffect(() => {
    setSelectedImg(selectedVariant?.image);
  }, [product]);

  if (!selectedImg) {
    return <div className="product-image" />;
  }
  return (
    <div className="product-images">
      <Image
        alt={selectedImg.altText || 'Product Image'}
        aspectRatio="1/1"
        data={selectedImg}
        key={selectedImg.id}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
      <div className="product-related-images">
        {relatedImages.map((img) => (
          <Image
            className={`product-related-images-img ${
              selectedImg.id === img.id
                ? 'product-related-images-img--selected'
                : ''
            }`}
            alt={img.alt || 'Product related image'}
            aspectRatio="1/1"
            data={img}
            key={img.id}
            onClick={() => setSelectedImg(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
