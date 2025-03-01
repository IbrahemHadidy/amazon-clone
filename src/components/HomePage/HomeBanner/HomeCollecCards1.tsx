import styles from '@styles/Home.module.css';
import { Link } from 'react-router';
import useCategoryItems1 from './useCategoryItems1';

export default function HomeCollecCards1() {
  const { items, loading, error } = useCategoryItems1();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.homeBannerItemDiv}>
      {items.map((category, index) => (
        <div className={styles.homeBannerItemDivCard} key={index}>
          <div className={styles.homeBannerItemDivCardTitle}>
            {category.title}
          </div>
          <div className={styles.imgHomeBannerItemDivCard}>
            {category.items.map((item, ind) => (
              <Link
                to={`/product/${item.id}`}
                className={styles.imgBannerHomeDiv}
                key={ind}
              >
                <img
                  className={styles.imgBannerHomeDivImg}
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div className={styles.imgBannerImgName}>{item.title}</div>
              </Link>
            ))}
          </div>
          <Link
            to={`search?category=${category.slug}`}
            className={styles.seeMoreHomeBanner}
          >
            See more
          </Link>
        </div>
      ))}
    </div>
  );
}
