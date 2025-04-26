import { useState } from 'react';
import styles from '../styles/Home.module.css';

function Home() {
  const images = [
    { src: '/image1.png', title: 'СТРАЖИ ГАЛАКТИК ЗАРАЗ У КІНО' },
    { src: '/image2.png', title: 'МАЙНКРАФТ ЗАРАЗ У КІНО' },
    { src: '/image3.png', title: 'ОПЕНГЕЙМЕР ЗАРАЗ У КІНО' },
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>ЗАРАЗ У КІНО</h1>
        </header>

        <div className={styles.sliderWrapper}>
          <div 
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className={styles.slide}>
                <img src={image.src} alt={image.title} className={styles.slideImage} />
                <h2 className={styles.slideTitle}>{image.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sliderNavigation}>
          <div className={styles.scrollbarArrows}>
            <div className={styles.scrollbarLeftArrow} onClick={handlePrev}>
              <img className={styles.arrowImage} src="/Arrow-L.svg" alt="Стрілка вліво" />
            </div>
            <div className={styles.scrollbarRightArrow} onClick={handleNext}>
              <img className={styles.arrowImage} src="/Arrow-R.svg" alt="Стрілка вправо" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
