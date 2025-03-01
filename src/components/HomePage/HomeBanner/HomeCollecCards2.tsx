import styles from '@styles/Home.module.css';
import { Link } from 'react-router';
import useCategoryItems2 from './useCategoryItems2';

export default function HomeCollecCards2() {
  const { items, loading, error } = useCategoryItems2();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.homeBannerItemDiv2}>
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
