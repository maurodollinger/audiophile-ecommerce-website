import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.scss';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import Counter from '../../UI/Counter/Counter';

const ProductCard = ({product, index, type}) => {
  const { mobile, tablet, desktop } = product.image;
  const navigate = useNavigate();
  const path = '../';

  // eslint-disable-next-line no-unused-vars
  const [totalItems, setTotalItems] = useState(0);

  const handleCountChange = (newCount) => {
    setTotalItems(newCount);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2, 
  }).format(product.price);


  const handleClick = () =>{
    navigate('../../product/'+product.slug, { relative: 'path' });
  };

  return (
    <section className={`${styles.productCard} ${(index % 2===0) ? '' : styles.odd}`}>
      <div className={styles.imageCard} 
        style={{
          backgroundImage: `url(${path+mobile})`,
          '@media (minWidth: 769px)': {
            backgroundImage: `url(${path+tablet})`,
          },
          '@media (minWidth: 1025px)': {
            backgroundImage: `url(${path+desktop})`,
          },
        }}>
      </div>
      <div className={styles.infoCard}>
        <div>
          <span className='overline orange'>new product</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          {(type === 'category') && (
            <Button type='one' onClick={handleClick}>See product</Button>
          )}
          {(type === 'product') && (
            <Fragment>
              <div className='price'>
                {formattedPrice}
              </div>
              <div className={styles.shopActions}>
                <Counter onCountChange={handleCountChange}/>
                <Button type='one' >Add to cart</Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

ProductCard.propTypes ={
  product:PropTypes.object.isRequired,
  index:PropTypes.string,
  type:PropTypes.string.isRequired
};

export default ProductCard;