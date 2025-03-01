import styles from '@styles/Home.module.css';
import HomeBanner from './HomeBanner/HomeBanner';

export default function HomePage() {
  return (
    <section className={styles.homeScreen}>
      <HomeBanner />
    </section>
  );
}
