import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styles from './Product.module.scss';
import products from '../../mockup/products.json';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../Shared/ProductCard/ProductCard';
import PropTypes from 'prop-types';
import RelatedProducts from '../Shared/RelatedProducts/RelatedProducts';
import FadeInElement from '../Animations/FadeInElement';
import ZoomInElement from '../Animations/ZoomInElement';

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

const IncludesItemsList = ({ includes }) => {
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

  const getImage = useMemo(() => {
    if (windowSize < 750) {
      return path + images.first.mobile;
    } else if (windowSize < 1024) {
      return path + images.second.tablet;
    } else {
      return path + images.third.desktop;
    }
  }, [windowSize, images, path]);

  return (
    <div className={styles.productGallery}>
      <div className={styles.productGalleryLeft}>
        <ZoomInElement style={{ backgroundImage: `url(${getImage})` }}></ZoomInElement>
        <ZoomInElement style={{ backgroundImage: `url(${getImage})` }}></ZoomInElement>
      </div>
      <ZoomInElement className={styles.productGalleryRight} style={{ backgroundImage: `url(${getImage})` }}>
      </ZoomInElement>
    </div>
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
    window.scrollTo(0, 0);
  }, [productName, navigate]);

  const handleClick = () =>{
    navigate('../category/'+product.category);
  };

  return(
    <section className={styles.product}>
      <div className='container'>
        <span onClick={handleClick}>Go Back</span>
        
        {!product ? <div>Loading...</div> :
          (
            <div className={styles.productContainer}>
              <FadeInElement>
                <ProductCard product={product} index='0' type='product'/>
              </FadeInElement>
              <FadeInElement>
                <div className={styles.productFeatures}>
                  <div>
                    <h3>Features</h3>
                    <ProductFeatures features={product.features}/>
                  </div>
                  <div>
                    <h3>In the box</h3>
                    <IncludesItemsList includes={product.includes}/>
                  </div>
                </div>
              </FadeInElement>
              <FadeInElement>
                <Gallery images={product.gallery}/>
              </FadeInElement>
              <FadeInElement>
                <RelatedProducts products={product.others}/>
              </FadeInElement>
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

Gallery.propTypes = {
  images:PropTypes.object.isRequired
};