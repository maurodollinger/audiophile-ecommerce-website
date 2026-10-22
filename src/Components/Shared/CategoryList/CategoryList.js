import React from 'react';
import styles from './CategoryList.module.scss';
import PropTypes from 'prop-types';

import headphonesImage from '../../../assets/shared/desktop/image-category-thumbnail-headphones.png';
import speakersImage from '../../../assets/shared/desktop/image-category-thumbnail-speakers.png';
import earphonesImage from '../../../assets/shared/desktop/image-category-thumbnail-earphones.png';
import ShopButton from '../../UI/ShopButton/ShopButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Reveal } from '../../Animations/FadeInElement';
import { fadeUp, SPRING } from '../../Animations/motion';

const imageHover = {
  hover: { y: -10, scale: 1.05, transition: SPRING },
};

// eslint-disable-next-line react/prop-types
const CategoryList = ({callbackCloseMenu}) =>{
  let list;
  list = [
    {title:'headphones',img:headphonesImage},
    {title:'speakers',img:speakersImage},
    {title:'earphones',img:earphonesImage}               
  ];
  return (
    <Reveal as='section' stagger={0.12} className={styles.categoryList}> 
      {list.map((l, i)=>(
        <CategoryProduct key={i} img={l.img} path={l.title} callbackCloseMenu={callbackCloseMenu}>{l.title}</CategoryProduct>
      ))}
      
    </Reveal>
  );
};

export const CategoryProduct = ({ img, children, path, callbackCloseMenu}) =>{
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
    if (callbackCloseMenu) callbackCloseMenu();
  };
  return (
    <motion.div className={`${styles.categoryProduct} btnCatProduct`} variants={fadeUp} whileHover='hover'>
      <div onClick={() => handleClick(path)}>
        <motion.img 
          variants={imageHover}
          src={img} alt={`${children} category`}></motion.img>
        <span>{children}</span>
        <span><ShopButton  /></span>
      </div>     
    </motion.div>
  );
};


CategoryProduct.propTypes ={
  children:PropTypes.node.isRequired,
  img:PropTypes.string.isRequired,
  path:PropTypes.string.isRequired,
  showShopButton:PropTypes.bool,
  callbackCloseMenu:PropTypes.func
};

export default CategoryList;