import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [isFormValid, setFormValid] = useState(false);
  const [onSubmitForm, setOnSubmitForm] = useState(false);

  return (
    <FormContext.Provider value={{
      isFormValid,
      setFormValid: (isValid) => setFormValid(isValid),
      onSubmitForm,
      setOnSubmitHandler: () => setOnSubmitForm(true),
      setOffSubmitHandler: () => setOnSubmitForm(false),
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

FormProvider.propTypes ={
  children: PropTypes.node.isRequired,
};
