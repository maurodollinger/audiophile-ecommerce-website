import React, {useState, useEffect} from 'react';
import styles from './RelatedProducts.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../UI/Button/Button';

const RelatedProducts = ({products}) =>{
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const navigate = useNavigate();
  
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
    if (windowSize < 750) {
      return path+image.mobile;
    } else if (windowSize < 1024) {
      return path+image.tablet;
    } else {
      return path+image.desktop;
    }
  };

  const handleClick = (slug) =>{
    navigate('../../product/'+slug, { relative: 'path' });
  };

  return(
    <section className={styles.relatedProducts}>
      <h3>You may also like</h3>
      <div>
        {products.map((p,index)=>(
          
          <div className={styles.relProductCard}  key={index}>
            <img src={getImage(p.image)}/>
            <div>
              <h5>{p.name}</h5>
              <Button onClick={()=>handleClick(p.slug)}>See product</Button>
            </div>              
          </div>
         
        ))}
      </div>
    </section>
  );
};

RelatedProducts.propTypes ={
  products: PropTypes.array.isRequired
};

export default RelatedProducts;