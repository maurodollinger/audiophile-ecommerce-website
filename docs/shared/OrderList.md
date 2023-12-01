# OrderList Component Documentation

The `OrderList` component is responsible for rendering a list of items in a shopping cart, along with their details such as quantity, price, and total amount. It also provides functionality for modifying item quantities and navigating to the checkout page.

## Props

### `items` (required)

An array of objects representing the items in the shopping cart. Each object should contain properties such as `id`, `name`, `price`, `quantity`, and `image`.

### `isModal`

A boolean indicating whether the component is being used in a modal context. Default is `true`.

### `onCountChange`

A function to handle changes in item quantities. It receives two parameters: `n` (the new quantity) and `item` (the item object).

### `onEmptyList`

A function to handle an empty shopping cart scenario.

### `goToCheckout`

A function to navigate to the checkout page.

### `disabledSubmit`

A boolean indicating whether the submit button should be disabled. Default is `true`.

### `onSubmit`

A function to handle the submit action, typically used to proceed with the checkout process.

## Component Structure

The `OrderList` component is structured as follows:

- A `<ul>` element containing a list of items, each represented by an `<li>` element.
  - Each `<li>` element includes:
    - An image of the item.
    - Item information such as name and price.
    - A counter component for adjusting item quantity (in modal context).
    - Item quantity display (outside modal context).

- A `<div>` element containing the order summary, including:
  - Total amount of the items.
  - Shipping and VAT information (if not in modal context).
  - Grand total (if not in modal context).
  - Checkout button (in modal context).

## Usage Example

```jsx
import OrderList from './OrderList';

const ShoppingCart = () => {
  // Sample items data
  const items = [
    { id: 1, name: 'Product A', price: 19.99, quantity: 2, image: { mobile: 'product-a.jpg' } },
    // ... other items
  ];

  return <OrderList items={items} />;
};
