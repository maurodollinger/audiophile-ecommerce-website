import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Category.module.scss';
import products from '../../mockup/products.json';
import ProductCard from '../Shared/ProductCard/ProductCard';
import CategoryList from '../Shared/CategoryList/CategoryList';
import PromoSection from '../Shared/Promo/Promo';
import FadeInElement from '../Animations/FadeInElement';

const Category =() =>{
  const { categoryName } = useParams();

  // Check if categoryName is not valid
  if (!categoryName) {
    // Handle error, e.g., render an error message or redirect
    return <p>Invalid category</p>;
  }

  const filteredProducts = products.filter(product => product.category === categoryName);

  const location = useLocation();
  useEffect(()=>{
    document.title = `Category ${categoryName} - AudioPhile E-commerce`;
    window.scrollTo(0, 0);
  },[location]);

  return(
    <section className={styles.category}>
      <div>
        <div className='container'>
          <h2>{categoryName}</h2>
        </div>
      </div>      
      <div className={styles.productsContainer}>
        <div className='container'>
          {filteredProducts.map((product,index) => (
            <FadeInElement key={product.id}>
              <ProductCard product={product} index={index.toString()} type='category'/>
            </FadeInElement>
          ))}
        </div>
      </div>
      <div className='container'>
        <CategoryList type='default'/>
      </div>
      <PromoSection/>
    </section>
  );
};

export default Category;