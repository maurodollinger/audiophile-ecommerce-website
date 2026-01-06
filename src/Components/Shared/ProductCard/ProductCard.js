import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.scss';
import Button from '../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import Counter from '../../UI/Counter/Counter';
import CartContext from '../../../store/CartContext';
import { currencyFormatter } from '../../../utils/formatting';

const ProductCard = ({product, index, type}) => {
  const { mobile, tablet, desktop } = product.image;
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
  

  return (
    <section className={`${styles.productCard} ${(index % 2===0) ? '' : styles.odd} ${(type === PRODUCT_TYPE) ? styles.productType : styles.categoryType}`}>
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
          {(product.new) && (<span className={`${styles.newProduct} overline orange`}>new product</span>)}
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          {(type === CATEGORY_TYPE) && (
            <Button type='one' onClick={handleClick}>See product</Button>
          )}
          {(type === PRODUCT_TYPE) && (
            <Fragment>
              <div className='price'>
                {currencyFormatter.format(product.price)}
              </div>
              <div className={styles.shopActions}>
                <Counter onCountChange={handleCountChange}/>
                <Button type='one' onClick={handleAddToCart}>Add to cart</Button>
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