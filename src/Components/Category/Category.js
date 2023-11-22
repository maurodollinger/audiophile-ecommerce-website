import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Category.module.scss';
import products from '../../mockup/products.json';
import ProductCard from '../Shared/ProductCard/ProductCard';
import CategoryList from '../UI/CategoryList/CategoryList';
import PromoSection from '../Shared/Promo/Promo';

const Category =() =>{
  const { categoryName } = useParams();
  const filteredProducts = products.filter(product => product.category === categoryName);

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
            <ProductCard key={product.id} product={product} index={index} type='category'/>
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