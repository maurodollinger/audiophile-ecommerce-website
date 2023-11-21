import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.scss';
import Button from '../../UI/Button/Button';

const ProductCard = ({product, index}) => {
  const { mobile, tablet, desktop } = product.image;
  const path = '../';

  return (
    <section className={`${styles.productCard} ${(index % 2===0) ? '' : styles.odd}`}>
      <div className={styles.imageCard} 
        style={{
          backgroundImage: `url(${path+mobile})`,
          '@media (min-width: 769px)': {
            backgroundImage: `url(${path+tablet})`,
          },
          '@media (min-width: 1025px)': {
            backgroundImage: `url(${path+desktop})`,
          },
        }}>
      </div>
      <div className={styles.infoCard}>
        <div>
          <span className='overline orange'>new product</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <Button type='one'>See product</Button>
        </div>
      </div>
    </section>
  );
};

ProductCard.propTypes ={
  product:PropTypes.node.isRequired,
  index:PropTypes.number.isRequired
};

export default ProductCard;