import React from 'react';
import { currencyFormatter } from '../../../utils/formatting';
import Counter from '../../UI/Counter/Counter';
import styles from './OrderList.module.scss';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import { useLocation } from 'react-router-dom';

function fixURL(path,string) {
  const url = path+string;
  const regex = /\/build\/(.*?)\/assets/;
  const match = url.match(regex);

  if (match && match[1]) {
    const rutaExtraida = match[1];
    const regexRutaCompleta = new RegExp(`/build/${rutaExtraida}/assets`);
    const urlAjustada = url.replace(regexRutaCompleta, '/build/assets').replace('./assets', '/assets');
    return urlAjustada;
  }

  return 'build/'+string;
}
const OrderList = ({ items, isModal = true, onCountChange,  goToCheckout, disabledSubmit = true, onSubmit }) => {
  const totalAmount = items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
  const location = useLocation();
  const path = location.pathname;

  const payloadInfo = isModal
    ? null
    : {
      shipping: 50,
      vat: 1079,
    };

  const grandTotal = isModal ? null : totalAmount + payloadInfo.shipping + payloadInfo.vat;

  const handleCounter = (n, item) => {
    onCountChange(n, item);
  };

  const renderCounter = (item) => (
    <div>
      <Counter onCountChange={(n) => handleCounter(n, item)} initialCount={item.quantity} small></Counter>
    </div>
  );

  const renderQuantity = (item) => (
    <div>
      <p>{`x${item.quantity}`}</p>
    </div>
  );

  return (
    <>
      <ul className={`${styles.orderList} ${isModal ? styles.fixed : ''}`}>
        {items.map((item) => (
          <li key={item.id}>
            <div className={styles.image}>
              <img src={fixURL(path, item.image.mobile)} alt={item.name} />
            </div>
            <div className={styles.info}>
              <p>
                <b>{item.name}</b>
              </p>
              <p>{currencyFormatter.format(item.price)}</p>
            </div>
            {isModal ? renderCounter(item) : renderQuantity(item)}
          </li>
        ))}
      </ul>

      <div className={`${styles.payload} ${isModal ? styles.fixed : ''}`}>
        <div>
          <p>TOTAL</p>
          <p>{currencyFormatter.format(totalAmount)}</p>
        </div>
        {isModal && <Button type="one" onClick={goToCheckout}>checkout</Button>}
        {!isModal && (
          <>
            <div>
              <p>shipping</p>
              <p>{currencyFormatter.format(payloadInfo.shipping)}</p>
            </div>
            <div>
              <p>vat (included)</p>
              <p>{currencyFormatter.format(payloadInfo.vat)}</p>
            </div>
            <div className={styles.grandTotal}>
              <p>grand total</p>
              <p>{currencyFormatter.format(grandTotal)}</p>
            </div>
            <Button type="one" disabled={disabledSubmit} onClick={onSubmit}>
              continue & pay
            </Button>
          </>
        )}
      </div>
    </>
  );
};

OrderList.propTypes = {
  items: PropTypes.array.isRequired,
  isModal: PropTypes.bool,
  onCountChange: PropTypes.func,
  onEmptyList: PropTypes.func,
  goToCheckout: PropTypes.func,
  disabledSubmit: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default OrderList;
