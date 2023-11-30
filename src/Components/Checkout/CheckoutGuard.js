import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import UserProgressContext from '../../store/UserProgress';

export const CheckoutGuard = () => {
  const { progress } = useContext(UserProgressContext);

  if (progress !== 'checkout') {
    return <Navigate to="../" />;
  }

  return;
};