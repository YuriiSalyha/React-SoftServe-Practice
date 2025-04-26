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

        <div 
          className={`${styles.imageContainer} ${styles.fadeIn}`} 
          style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
        >
          <h2>{images[currentImageIndex].title}</h2>
        </div>

        <div className={styles.arrowButtons}>
          <button onClick={handlePrev}>←</button>
          <button onClick={handleNext}>→</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
