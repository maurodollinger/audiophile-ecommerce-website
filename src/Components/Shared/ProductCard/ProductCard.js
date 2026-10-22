import React, { Fragment, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.scss';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import Counter from '../../UI/Counter/Counter';
import CartContext from '../../../store/CartContext';
import { currencyFormatter } from '../../../utils/formatting';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, RevealItem } from '../../Animations/FadeInElement';
import { baseTransition, clipReveal, viewportOnce } from '../../Animations/motion';
import { useImageSize } from '../../Animations/useMediaQuery';

const newProductVariant = {
  hidden: { opacity: 0, letterSpacing: '1.2rem' },
  visible: { opacity: 1, letterSpacing: '0.625rem', transition: { ...baseTransition, duration: 1 } },
};

const ProductCard = ({product, index, type}) => {
  const imageSize = useImageSize();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const navigate = useNavigate();
  const path = '';
  const cartCtx = useContext(CartContext);
  const CATEGORY_TYPE = 'category';
  const PRODUCT_TYPE = 'product';

  const [totalItems, setTotalItems] = useState(1);

  const handleCountChange = (newCount) => {
    setTotalItems(newCount);
  };

  const handleClick = () =>{
    navigate('../../product/'+product.slug, { relative: 'path' });
  };

  const handleAddToCart = ()=>{
    const item = {
      id:product.id,
      name:product.name,
      image:product.image,
      slug:product.slug,
      price:product.price,
      quantity:totalItems
    };
    cartCtx.addItem(item);
  };
  

  const isOdd = index % 2 !== 0;

  return (
    <motion.section
      ref={ref}
      className={`${styles.productCard} ${isOdd ? styles.odd : ''} ${(type === PRODUCT_TYPE) ? styles.productType : styles.categoryType}`}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
    >
      <motion.div variants={clipReveal}>
        <motion.div
          className={styles.imageLayer}
          style={{ backgroundImage: `url(${path + product.image[imageSize]})`, y: imageY }}
        />
      </motion.div>
      <div className={styles.infoCard}>
        <Reveal stagger={0.1} delay={0.2}>
          {(product.new) && (
            <motion.span className={`${styles.newProduct} overline orange`} variants={newProductVariant}>new product</motion.span>
          )}
          <RevealItem as='h3' variant={isOdd ? 'slideRight' : 'slideLeft'}>{product.name}</RevealItem>
          <RevealItem as='p' variant={isOdd ? 'slideRight' : 'slideLeft'}>{product.description}</RevealItem>
          {(type === CATEGORY_TYPE) && (
            <RevealItem>
              <Button type='one' onClick={handleClick}>See product</Button>
            </RevealItem>
          )}
          {(type === PRODUCT_TYPE) && (
            <Fragment>
              <RevealItem className='price'>
                {currencyFormatter.format(product.price)}
              </RevealItem>
              <RevealItem className={styles.shopActions}>
                <Counter onCountChange={handleCountChange}/>
                <Button type='one' onClick={handleAddToCart}>Add to cart</Button>
              </RevealItem>
            </Fragment>
          )}
        </Reveal>
      </div>
    </motion.section>
  );
};

ProductCard.propTypes ={
  product:PropTypes.object.isRequired,
  index:PropTypes.string,
  type:PropTypes.string.isRequired
};

export default ProductCard;