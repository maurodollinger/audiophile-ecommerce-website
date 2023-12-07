import React, {Fragment, useContext, useEffect, useRef} from 'react';
import styles from './Home.module.scss';
import Button from '../UI/Button/Button';
import CategoryList from '../Shared/CategoryList/CategoryList';
import speakerZX9 from '../../assets/home/desktop/image-speaker-zx9.png';
import PromoSection from '../Shared/Promo/Promo';
import { useNavigate } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';
import CartContext from '../../store/CartContext';
import { useInView, animate, stagger, motion } from 'framer-motion';
import FadeInElement from '../Animations/FadeInElement';
import ZoomInElement from '../Animations/ZoomInElement';

const Home = () =>{
  const {progress,cleanUserProgress} = useContext(UserProgressContext);
  const {cleanCart}= useContext(CartContext);
  const navigate = useNavigate();

  const productOne = useRef(null);
  const triggerSpanAnimation = useInView(productOne,{ threshold: 1.0});
  
  const handleClick = (path)=>{
    navigate('product/'+path);
  };

  useEffect(()=>{
    if(progress==='finished'){
      cleanCart();
      cleanUserProgress();
    }
  },[progress]);


  useEffect(()=>{
    if(triggerSpanAnimation){
      animate('.spanAnimation span', {scale:1}, {type:'spring', duration:0.5, delay:stagger(0.1)});
      animate('.bigMonitor',{scale:1,y:0});
    }
    else {
      animate('.spanAnimation span', {scale:0.3}, {type:'spring', duration:0.3, delay:stagger(0.1)});
      animate('.bigMonitor',{scale:0.85,y:20});
    }
  },[triggerSpanAnimation]);
  

  return(
    <Fragment>
      <section className={styles.main}>
        <div className={styles.hero}>
          <div className='container'>
            <div className={styles.heroImgMobile}></div>
            <motion.div 
              initial={{opacity:0, y: 5}}
              animate={{opacity:1, y: 0, transition:{delay:0.1}}}
              className={styles.heroTitle}>
              <span className='overline'>new product</span>
              <h1>xx99 mark II headphones</h1>
              <p>{'Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'}</p>
              <Button type='one' onClick={()=>handleClick('xx99-mark-one-headphones')}>See product</Button>
            </motion.div>           
            <div className={styles.heroImg}></div>
          </div>
        </div>
      </section>
      <section className={styles.products}>
        
        <div className='container'>
          <FadeInElement>
            <CategoryList type='default'></CategoryList>
          </FadeInElement>
          <div className={styles.productsContainer}>
            <FadeInElement>
              <div ref={productOne} className={styles.productOne}>
                <span className={`spanAnimation ${styles.circleAnimation}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div className={`bigMonitor ${styles.producOneImage}`}>
                  <img src={speakerZX9}></img>
                </div>
                <div className={styles.productTitle}>
                  <h1>ZX9 SPEAKER</h1>
                  <p>{'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.'}</p>
                  <Button type='three' onClick={()=>handleClick('zx9-speaker')}>See product</Button>
                </div>
              </div>
            </FadeInElement>
            <FadeInElement>
              <ZoomInElement className={styles.productTwo}>
                <div className={styles.productTitle}>
                  <h4>ZX7 SPEAKER</h4>
                  <Button type='two' onClick={()=>handleClick('zx7-speaker')}>See product</Button>
                </div>
              </ZoomInElement>
            </FadeInElement>
            <FadeInElement>
              <div className={styles.productThree}>
                <ZoomInElement></ZoomInElement>
                <div>
                  <h4>YX1 EARPHONES</h4>
                  <Button type='two' onClick={()=>handleClick('yx1-earphones')}>See product</Button>
                </div>
              </div>
            </FadeInElement>
          </div>
        </div>
        
      </section>
      <PromoSection/>
    </Fragment>
  );
};

export default Home;