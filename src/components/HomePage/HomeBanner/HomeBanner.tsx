import styles from '@styles/Home.module.css';
import HomeCarousel from '../HomeCarousel/HomeCarousel';
import HomeSlider from '../HomeSlider/HomeSlider';
import HomeCollecCards1 from './HomeCollecCards1';
import HomeCollecCards2 from './HomeCollecCards2';
import useSliderItems from './useSliderItems';

export default function HomeBanner() {
  const {
    firstSliderItems,
    secondSliderItems,
    firstLoading,
    secondLoading,
    firstError,
    secondError
  } = useSliderItems();

  return (
    <div className={styles.homeBanner}>
      <HomeCarousel />
      <HomeCollecCards1 />

      {firstLoading ? (
        <p className="text-center text-gray-500">Loading Clothing...</p>
      ) : firstError ? (
        <p className="text-center text-red-500">Failed to load Clothing</p>
      ) : (
        <HomeSlider items={firstSliderItems} title="Clothing" />
      )}

      <HomeCollecCards2 />

      {secondLoading ? (
        <p className="text-center text-gray-500">
          Loading Kitchen Accessories...
        </p>
      ) : secondError ? (
        <p className="text-center text-red-500">
          Failed to load Kitchen Accessories
        </p>
      ) : (
        <HomeSlider items={secondSliderItems} title="Kitchen Accessories" />
      )}
    </div>
  );
}
