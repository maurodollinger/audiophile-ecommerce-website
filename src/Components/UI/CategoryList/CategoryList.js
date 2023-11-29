import React from 'react';
import styles from './CategoryList.module.scss';
import PropTypes from 'prop-types';

import headphonesImage from '../../../assets/shared/desktop/image-category-thumbnail-headphones.png';
import speakersImage from '../../../assets/shared/desktop/image-category-thumbnail-speakers.png';
import earphonesImage from '../../../assets/shared/desktop/image-category-thumbnail-earphones.png';
import ShopButton from '../ShopButton/ShopButton';
import { useNavigate, useLocation } from 'react-router-dom';

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
        <CategoryProduct key={i} img={l.img} path={l.title}>{l.title}</CategoryProduct>
      ))}
      
    </section>
  );
};

export const CategoryProduct = (props) =>{
  const navigate = useNavigate();
  const location = useLocation();

  function cleanString(inputString) {
    var regex = /\/category.*$/;
    if (inputString.includes('/category')) {
      var newString = inputString.replace(regex, '/category/');
      return newString;
    } else{
      return 'category/';
    }
  }

  const handleClick = (path) =>{
    const url = cleanString(location.pathname);
    navigate(url+path);
  };
  return (
    <div className={`${styles.categoryProduct} btnCatProduct`}>
      <div >
        <img src={props.img}></img>
        <span>{props.children}</span>
        <span><ShopButton onClick={()=>handleClick(props.path)}/></span>
      </div>
     
    </div>
  );
};

CategoryList.propTypes ={
  type:PropTypes.string
};

CategoryProduct.propTypes ={
  children:PropTypes.node.isRequired,
  img:PropTypes.string.isRequired,
  path:PropTypes.string.isRequired
};

export default CategoryList;