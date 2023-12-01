# Cart Component Documentation

The `Cart` component is a React component responsible for rendering a modal that displays the user's shopping cart. It is designed to interact with the `UserProgressContext` and `CartContext` to manage the cart's visibility and contents.

# Props
The Cart component does not accept any props directly. Instead, it relies on context values from UserProgressContext and CartContext for managing state and actions.

# Functions
- handleClose
Closes the cart modal by calling the hideCart function from the UserProgressContext.

- handleRemoveAll
Removes all items from the cart by calling the removeAll function from the CartContext.

- handleCountChange(count, item)
Handles the change in item quantity in the cart. If the count is 0, it removes the item. If the count is greater than the current quantity, it adds a new item with a quantity of 1. Otherwise, it removes the item.

- handleOnEmptyList
Handles the event when the cart becomes empty. Currently, it hides the cart modal using the hideCart function from UserProgressContext.

- handleGoToCheckout
Shows the checkout view by calling the showCheckout function from the UserProgressContext.

# Dependencies
- Modal component (dependency not provided in the code snippet)