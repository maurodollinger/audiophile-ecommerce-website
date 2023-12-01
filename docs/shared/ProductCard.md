## ProductCard Component Documentation
# Description
- The ProductCard component is a reusable React component designed to display product information in a card format. It includes features such as displaying the product image, name, description, and actions like viewing the product or adding it to the cart.

# Props
- product (PropTypes.object.isRequired): An object representing the product information, including properties like id, name, image, slug, and price.

- index (PropTypes.string): An optional string representing the index of the product card. Used for styling purposes to alternate the appearance of cards.

- type (PropTypes.string.isRequired): A string indicating the type of card. It can be either 'category' or 'product'. The type determines the specific actions and information displayed on the card.

## Functionality
- Dynamic Image Styling: The product card dynamically adjusts its background image based on the device's screen size using media queries.

- View Product Action (Category Type): When the card type is 'category', it displays a "See product" button, allowing users to navigate to the detailed product page.

- Price and Add to Cart Actions (Product Type): When the card type is 'product', it displays the product's price and provides a counter for users to select the quantity. Users can add the product to the cart using the "Add to cart" button.

- Counter Component: The Counter component is used to control the quantity of the product when adding it to the cart.

## Styling
- The component uses CSS modules for styling. Styles are defined in the ProductCard.module.scss file.

## Context Usage
- The component uses the CartContext to manage the cart state. It dispatches the addItem action to add products to the cart.

## Note
- Ensure that the necessary context providers (such as CartContextProvider) are available higher up in the component tree.

## Dependencies
- React
- PropTypes
- Button component (assumed to be available in the project)
- Counter component (assumed to be available in the project)
- CartContext (assumed to be available in the project)
- currencyFormatter utility function (assumed to be available in the project)