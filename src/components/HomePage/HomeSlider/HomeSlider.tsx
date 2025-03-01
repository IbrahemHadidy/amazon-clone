import styles from '@styles/Home.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

// Types
import type { Settings as SliderSettings } from 'react-slick';
import type Product from '@interfaces/product';

interface HomeSliderProps {
  title: string;
  items: Product[];
}

export default function HomeSlider({ title, items }: HomeSliderProps) {
  const [isArrowsVisible, setIsArrowsVisible] = useState(false);
  const settings: SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    initialSlide: 0,
    arrows: isArrowsVisible,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div
      className="slider-container mx-[20px] bg-white"
      onMouseEnter={() => setIsArrowsVisible(true)}
      onMouseLeave={() => setIsArrowsVisible(false)}
    >
      <h2 className={styles.homeBannerItemDivCardTitle}>{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="slider-item"
          >
            <img
              src={item.thumbnail}
              alt={`Slide ${item.id}`}
              className="slider-img"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
}
