import React, {Fragment, useContext, useEffect} from 'react';
import styles from './Home.module.scss';
import Button from '../UI/Button/Button';
import CategoryList from '../Shared/CategoryList/CategoryList';
import PromoSection from '../Shared/Promo/Promo';
import { useNavigate } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';
import CartContext from '../../store/CartContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import MaskText from '../Animations/MaskText';
import FeaturedShowcase from './FeaturedShowcase';
import { DURATION, EASE_OUT, fadeIn, fadeUp, staggerContainer } from '../Animations/motion';

const Home = () =>{
  const {progress,cleanUserProgress} = useContext(UserProgressContext);
  const {cleanCart}= useContext(CartContext);
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 800], [0, 180]);
  const heroTitleY = useTransform(scrollY, [0, 800], [0, -80]);
  const heroTitleOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const handleClick = (path)=>{
    navigate('product/'+path);
  };

  useEffect(()=>{
    if(progress==='finished'){
      cleanCart();
      cleanUserProgress();
    }
  },[progress]);

  return(
    <Fragment>
      <section className={styles.main}>
        <div className={styles.hero}>
          <div className='container'>
            <motion.div
              className={styles.heroImgMobile}
              style={{ y: heroImageY }}
            ></motion.div>
            <motion.div 
              initial='hidden'
              animate='visible'
              variants={staggerContainer(0.15, 0.3)}
              style={{ y: heroTitleY, opacity: heroTitleOpacity }}
              className={styles.heroTitle}>
              <motion.span className='overline' variants={fadeIn}>new product</motion.span>
              <MaskText as='h1' text='xx99 mark II headphones' inView={false} delay={0.45} />
              <motion.p variants={fadeUp}>{'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'}</motion.p>
              <motion.div variants={fadeUp}>
                <Button type='one' onClick={()=>handleClick('xx99-mark-one-headphones')}>See product</Button>
              </motion.div>
            </motion.div>           
            <motion.div className={styles.heroImgWrap} style={{ y: heroImageY }}>
              <motion.div
                className={styles.heroImg}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: DURATION.slow * 1.6, ease: EASE_OUT }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className={styles.products}>
        <div className='container'>
          <CategoryList type='default'></CategoryList>
        </div>
        <FeaturedShowcase onSelect={handleClick} />
      </section>
      <PromoSection/>
    </Fragment>
  );
};

export default Home;
