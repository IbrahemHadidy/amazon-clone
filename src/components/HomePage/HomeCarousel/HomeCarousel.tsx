import styles from '@styles/Home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

// Types
import type { Settings as SliderSettings } from 'react-slick';

const images = [
  'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg',
  'https://m.media-amazon.com/images/I/71ucbRqYhnL._SX3000_.jpg',
  'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg'
];

export default function HomeCarousel() {
  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <img
          key={index}
          className={styles.homeCarouselImg}
          src={img}
          loading="lazy"
          alt={`Slide ${index + 1}`}
        />
      ))}
    </Slider>
  );
}
