import React from 'react';
import styles from './CategoryList.module.scss';
import PropTypes from 'prop-types';

import headphonesImage from '../../../assets/shared/desktop/image-category-thumbnail-headphones.png';
import speakersImage from '../../../assets/shared/desktop/image-category-thumbnail-speakers.png';
import earphonesImage from '../../../assets/shared/desktop/image-category-thumbnail-earphones.png';
import ShopButton from '../ShopButton/ShopButton';

const CategoryList = ({type}) =>{
  let list;
  switch(type){
  case 'default':
    list = [
      {title:'headphones',img:headphonesImage},
      {title:'speakers',img:speakersImage},
      {title:'earphones',img:earphonesImage}               
    ];
    break;
  }
  return (
    <section className={styles.categoryList}>
      {list.map((l, i)=>(
        <CategoryProduct key={i} img={l.img}>{l.title}</CategoryProduct>
      ))}
      
    </section>
  );
};

export const CategoryProduct = (props) =>{
  return (
    <div className={`${styles.categoryProduct} btnCatProduct`}>
      <div>
        <img src={props.img}></img>
        <span>{props.children}</span>
        <span><ShopButton/></span>
      </div>
     
    </div>
  );
};

CategoryList.propTypes ={
  type:PropTypes.string
};

CategoryProduct.propTypes ={
  children:PropTypes.node.isRequired,
  img:PropTypes.string.isRequired
};

export default CategoryList;