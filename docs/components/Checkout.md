# Code Documentation

## Checkout Component

The Checkout component is responsible for managing the payment process and displays a payment form along with a summary of the purchase.

### File
- **Name:** `Checkout.js`

### Dependencies
- React
- `Card` component (located at '../UI/Card/Card')
- `OrderList` component (located at '../Shared/OrderList/OrderList')
- `CheckoutGuard` component (located at './CheckoutGuard')
- Cash-on-delivery payment icon (located at '../../assets/checkout/icon-cash-on-delivery.svg')
- Prop-Types
- Formik
- Yup
- `useForm` hook (located at '../../store/FormContext')

### Usage
```jsx
import Checkout from './path/to/Checkout';

<Checkout />
```

### Component Structure
- CheckoutFormContainer: Component responsible for managing the payment form.
- Props: None.
- Local State:
- - selectedOption: Selected payment option.
- Functions:
- - handleOptionChange: Handles the change in the payment option.
- Side Effects:
- - useEffect to handle form validation.

### CustomInput: 
- Component for a custom input field.
- Props:
- - field: Object containing Formik field properties.
- - meta: Object containing information about the field's state.
- - placeholder: Field placeholder text.

### CheckoutFormContainer Component
- Local State
- - selectedOption: Selected payment option.
- Functions
- - handleOptionChange(event): Handles the change in the payment option.
- Side Effects
- - useEffect: Manages form validation and submits the form if valid.
- Form
The form uses Formik to handle form state and validation. It utilizes the CustomInput component for custom input fields.

- Payment
- - Choose between "e-Money" and "Cash on Delivery".
- - Display additional fields based on the selected option.
- - Show an informative message for "Cash on Delivery".

### useForm Hook

#### Usage
```jsx
import { useForm } from './path/to/FormContext';

// ...

const { isFormValid, setFormValid, onSubmitForm, setOnSubmitHandler, setOffSubmitHandler } = useForm();
```