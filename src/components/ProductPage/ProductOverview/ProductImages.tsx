import styles from '@styles/Product.module.css';
import { useState } from 'react';

// Types
import type Product from '@interfaces/product';

interface ProductImagesProps {
  data: Product;
}

export default function ProductImages({ data }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string>(data.images[0]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="align-start max-md:align-center flex h-full w-[40%] flex-col items-center max-md:w-full">
      <div className={styles.productImages}>
        <img
          className={styles.mainImage}
          src={selectedImage}
          alt="Product Image"
          loading="lazy"
        />
        <div className={styles.thumbnailList}>
          {data.images.map((image) => (
            <img
              key={image}
              src={image}
              alt="Thumbnail"
              className={`${styles.thumbnail} ${
                selectedImage === image ? styles.thumbnailActive : ''
              }`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
