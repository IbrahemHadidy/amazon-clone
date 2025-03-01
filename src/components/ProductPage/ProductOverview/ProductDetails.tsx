import styles from '@styles/Product.module.css';
import { getStarRating } from '@utils/getStarRating';

import paymentCard from '@assets/electronic-pay.png';
import returnable from '@assets/returnable.png';
import secure from '@assets/secure.png';

import type Product from '@interfaces/product';

interface ProductDetailsProps {
  data: Product;
}

export default function ProductDetails({ data }: ProductDetailsProps) {
  return (
    <div className="flex flex-col max-md:w-full max-md:items-center max-md:justify-center">
      {data.brand && <div className={styles.brand}>Brand: {data.brand}</div>}
      <h1 className={styles.productTitle}>{data.title}</h1>

      <div className={styles.ratingSection}>
        <div className="flex items-center">
          <div className="text-top -mt-1 text-xl text-yellow-500">
            {getStarRating(data.rating, true)}
          </div>
          <span className={styles.ratingValue}>{data.rating}</span>
          <a href="#" className={styles.ratingsCount}>
            {data.reviews.length} ratings
          </a>
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.price}>
          <sup className={styles.currency}>USD</sup>
          <span className={styles.amount}>
            {data.price.toFixed(2).split('.')[0]}
          </span>
          <sup className={styles.decimals}>
            {data.price.toFixed(2).split('.')[1]}
          </sup>
        </div>
        <div className={styles.vatInfo}>All price include VAT.</div>
        <div className={styles.offerBadge}>
          <span className={styles.badge}>Extra 20% off</span> with meem credit
          cards
          <div className={styles.offerDetails}>
            Enter code <span className="font-semibold">MEEM20</span> at
            checkout. Discount by Amazon.
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className="flex flex-row">
          <div className={styles.featureItem}>
            <img src={paymentCard} height={40} width={40} alt="payment card" />
            <span>Electronic payment Only</span>
          </div>
          <div className={styles.featureItem}>
            <img src={returnable} height={40} width={40} alt="returnable" />
            <span>{data.returnPolicy}</span>
          </div>
          <div className={styles.featureItem}>
            <img src={secure} height={40} width={40} alt="secure" />
            <span>Secure transaction</span>
          </div>
        </div>
      </div>

      <hr className="mb-1.5 h-[1px] w-full border-none bg-gray-200 max-md:mx-4" />

      <div className="max-md:mx-[1.5rem]">
        <h2 className="mb-2 text-lg font-semibold">About this Item</h2>
        <h5 className={styles.featuresList}>
          {data.description
            .split('.')
            .map((item, index) =>
              index === data.description.split('.').length - 1 ? null : (
                <li key={index}>{item}.</li>
              )
            )}
        </h5>
      </div>
    </div>
  );
}
