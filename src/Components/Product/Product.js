import React, { Fragment, useEffect, useState } from 'react';
import styles from './Product.module.scss';
import products from '../../mockup/products.json';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../Shared/ProductCard/ProductCard';
import PropTypes from 'prop-types';
import RelatedProducts from '../Shared/RelatedProducts/RelatedProducts';
import { motion } from 'framer-motion';
import { Reveal, RevealItem } from '../Animations/FadeInElement';
import { clipReveal, EASE_OUT, SPRING, staggerContainer, viewportOnce } from '../Animations/motion';
import { useImageSize } from '../Animations/useMediaQuery';

export const ProductFeatures = ({ features }) => {
  const featureLines = features.split('\n');
  return (
    <Fragment>
      {featureLines.map((line, index) => (
        line.trim() !== '' && <RevealItem as='p' key={index}>{line}</RevealItem>
      ))}
    </Fragment>
  );
};

const IncludesItemsList = ({ includes }) => {
  return (
    <Reveal as='ul' stagger={0.07}>
      {includes.map((item, index) => (
        <RevealItem as='li' variant='slideRight' key={index}>
          <span className={styles.quantity}>{item.quantity}x</span> <span className={styles.listItem}>{item.item}</span>
        </RevealItem>
      ))}
    </Reveal>
  );
};

const tileZoom = {
  hidden: { scale: 1.15 },
  visible: { scale: 1, transition: { duration: 1.4, ease: EASE_OUT } },
};

const GalleryTile = ({ image, className }) => (
  <motion.div variants={clipReveal} className={`${styles.tile} ${className || ''}`}>
    <motion.div className={styles.tileLayer} variants={tileZoom}>
      <motion.div
        className={styles.tileLayer}
        style={{ backgroundImage: `url(${image})` }}
        whileHover={{ scale: 1.06, transition: SPRING }}
      />
    </motion.div>
  </motion.div>
);

const Gallery = ({images}) =>{
  const size = useImageSize();

  return (
    <motion.div
      className={styles.productGallery}
      initial='hidden'
      whileInView='visible'
      viewport={viewportOnce}
      variants={staggerContainer(0.15)}
    >
      <div className={styles.productGalleryLeft}>
        <GalleryTile image={images.first[size]} />
        <GalleryTile image={images.second[size]} />
      </div>
      <GalleryTile className={styles.productGalleryRight} image={images.third[size]} />
    </motion.div>
  );
};


const Product = () =>{
  const [product, setProduct] = useState(null);
  const { productName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const prod = products.find(product => product.slug === productName);
    if (!prod) {
      navigate('/404');
      return;
    }
    setProduct(prod);
  }, [productName, navigate]);

  const handleClick = () =>{
    navigate('../category/'+product.category);
  };

  return(
    <section className={styles.product}>
      <div className='container'>
        <span className={styles.goBack} onClick={handleClick}>
          <span className={styles.arrow}>&larr;</span>Go Back
        </span>
        
        {!product ? <div>Loading...</div> :
          (
            <div className={styles.productContainer}>
              <ProductCard product={product} index='0' type='product'/>
              <div className={styles.productFeatures}>
                <Reveal stagger={0.1}>
                  <RevealItem as='h3'>Features</RevealItem>
                  <ProductFeatures features={product.features}/>
                </Reveal>
                <Reveal stagger={0.1}>
                  <RevealItem as='h3'>In the box</RevealItem>
                  <IncludesItemsList includes={product.includes}/>
                </Reveal>
              </div>
              <Gallery images={product.gallery}/>
              <RelatedProducts products={product.others}/>
            </div>
          )
        }
       
       
      </div>
      
    </section>
  );
};

export default Product;

ProductFeatures.propTypes = {
  features:PropTypes.string.isRequired
};

IncludesItemsList.propTypes = {
  includes:PropTypes.array.isRequired
};

GalleryTile.propTypes = {
  image:PropTypes.string.isRequired,
  className:PropTypes.string,
};

Gallery.propTypes = {
  images:PropTypes.object.isRequired
};
