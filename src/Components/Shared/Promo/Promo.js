import React from 'react';
import styles from './Promo.module.scss';
import { motion } from 'framer-motion';
import { Reveal, RevealItem } from '../../Animations/FadeInElement';
import { clipReveal, EASE_OUT, viewportOnce } from '../../Animations/motion';

const PromoSection = () =>{
  return(
    <section className={styles.promoSection}>     
      <motion.div className='container' initial='hidden' whileInView='visible' viewport={viewportOnce}>
        <Reveal stagger={0.12}>
          <RevealItem as='h2' variant='slideRight'>
            Bringing you the{' '}
            <motion.span
              className={`orange ${styles.underline}`}
              initial={{ backgroundSize: '0% 0.12em' }}
              whileInView={{ backgroundSize: '100% 0.12em' }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.6 }}
            >best</motion.span>{' '}
            audio gear
          </RevealItem>
          <RevealItem as='p' variant='slideRight'>{'Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.'}</RevealItem>
        </Reveal>
        <motion.div variants={clipReveal}></motion.div>
      </motion.div>
    </section>
  );
};

export default PromoSection;
