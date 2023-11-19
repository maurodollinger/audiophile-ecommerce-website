import React, {Fragment} from 'react';
import styles from './Home.module.scss';
import Button from '../UI/Button/Button';
import CategoryList from '../UI/CategoryList/CategoryList';

import speakerZX9 from '../../assets/home/desktop/image-speaker-zx9.png';

const Home = () =>{
  return(
    <Fragment>
      <section className={styles.main}>
        <div className={styles.hero}>
          <div className='container'>
            <div className={styles.heroImgMobile}></div>
            <div className={styles.heroTitle}>
              <span className='overline'>new product</span>
              <h1>xx99 mark II headphones</h1>
              <p>{'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'}</p>
              <Button type='one'>See product</Button>
            </div>           
            <div className={styles.heroImg}></div>
          </div>
        </div>
      </section>
      <section className={styles.products}>
        <div className='container'>
          <CategoryList type='default'></CategoryList>
          <div className={styles.productsContainer}>
            <div className={styles.productOne}>
              <span className={styles.circleAnimation}>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div className={styles.producOneImage}>
                <img src={speakerZX9}></img>
              </div>
              <div className={styles.productTitle}>
                <h1>ZX9 SPEAKER</h1>
                <p>{'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.'}</p>
                <Button type='three'>See product</Button>
              </div>
            </div>
            <div className={styles.productTwo}></div>
            <div className={styles.productThree}></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;