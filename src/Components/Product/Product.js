import React, { Fragment, useEffect, useState } from 'react';
import styles from './Product.module.scss';
import products from '../../mockup/products.json';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Shared/ProductCard/ProductCard';
import PropTypes from 'prop-types';

const getPath = () => {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split('/');
  const lastSegment = urlParts[urlParts.length - 1];
  return lastSegment;
};

export const ProductFeatures = ({ features }) => {
  const featureLines = features.split('\n');
  return (
    <Fragment>
      {featureLines.map((line, index) => (
        line.trim() !== '' && <p key={index}>{line}</p>
      ))}
    </Fragment>
  );
};

const IncludesList = ({ includes }) => {
  return (
    <ul>
      {includes.map((item, index) => (
        <li key={index}>
          <span className={styles.quantity}>{item.quantity}x</span> <span className={styles.listItem}>{item.item}</span>
        </li>
      ))}
    </ul>
  );
};

const Gallery = ({images}) =>{
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const path = '../';
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
    if (windowSize < 768) {
      return path+image.mobile;
    } else if (windowSize < 1024) {
      return path+image.tablet;
    } else {
      return path+image.desktop;
    }
  };

  return (
    <div className={styles.productGallery}>
      <div className={styles.productGalleryLeft}>
        <div style={{ backgroundImage: `url(${getImage(images.first)})` }}></div>
        <div style={{ backgroundImage: `url(${getImage(images.second)})` }}></div>
      </div>
      <div className={styles.productGalleryRight} style={{ backgroundImage: `url(${getImage(images.third)})` }}>
      </div>
    </div>
  );
};


const Product = () =>{
  const [product, setProduct] = useState(null);
  const locationPath = getPath();
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find(product => product.slug === locationPath);
    setProduct(foundProduct);
  }, []);

  const handleClick = () =>{
    navigate('../../category/');
  };

  return(
    <section className={styles.product}>
      <div className='container'>
        <span onClick={handleClick}>Go Back</span>
        
        {!product && <div>Loading...</div>}
        {product && (
          <div className={styles.productContainer}>
            <ProductCard product={product} index='0' type='product'/>
            <div className={styles.productFeatures}>
              <div>
                <h3>Features</h3>
                <ProductFeatures features={product.features}/>
              </div>
              <div>
                <h3>In the box</h3>
                <IncludesList includes={product.includes}/>
              </div>
            </div>
            
            <Gallery images={product.gallery}/>
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

IncludesList.propTypes = {
  includes:PropTypes.array.isRequired
};

Gallery.propTypes = {
  images:PropTypes.object.isRequired
};