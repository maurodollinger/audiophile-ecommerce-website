import React, {useState, useEffect} from 'react';
import styles from './RelatedProducts.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { motion } from 'framer-motion';
import { Reveal } from '../../Animations/FadeInElement';
import { fadeUp, SPRING } from '../../Animations/motion';

const cardVariants = {
  ...fadeUp,
  hover: { y: -8, transition: SPRING },
};

const imageHover = {
  hover: { scale: 1.06, transition: SPRING },
};

const RelatedProducts = ({products}) =>{
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const navigate = useNavigate();
  
  const path = '';
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getImage = (image) => {
    if (windowSize < 750) {
      return path+image.mobile;
    } else if (windowSize < 1024) {
      return path+image.tablet;
    } else {
      return path+image.desktop;
    }
  };

  const handleClick = (slug) =>{
    navigate('../../product/'+slug, { relative: 'path' });
  };

  return(
    <section className={styles.relatedProducts}>
      <Reveal as='h3'>You may also like</Reveal>
      <Reveal stagger={0.12}>
        {products.map((p,index)=>(
          <motion.div
            className={styles.relProductCard}
            key={index}
            variants={cardVariants}
            whileHover='hover'
          >
            <div className={styles.relImage}>
              <motion.img variants={imageHover} src={`audiophile-ecommerce-website/${getImage(p.image)}`} alt={p.name}/>
            </div>
            <div>
              <h5>{p.name}</h5>
              <Button onClick={()=>handleClick(p.slug)}>See product</Button>
            </div>              
          </motion.div>
        ))}
      </Reveal>
    </section>
  );
};

RelatedProducts.propTypes ={
  products: PropTypes.array.isRequired
};

export default RelatedProducts;