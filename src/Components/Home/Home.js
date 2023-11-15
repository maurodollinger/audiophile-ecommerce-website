import React, {Fragment} from 'react';
import styles from './Home.module.scss';

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
            </div>           
            <div className={styles.heroImg}></div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;