# CategoryList Component Documentation

The `CategoryList` component is a React component that displays a list of product categories with images and buttons. It is designed to be flexible and easy to use.

## Usage

```jsx
import CategoryList from 'path/to/CategoryList';

// ...

function MyCategoryPage() {
  return (
    <CategoryList type="default" />
  );
}
```

## Props
- CategoryList
- type (string, required): The type of category list to display. Currently, only supports 'default', which shows predefined categories.

## Dependencies
- Ensure that the following dependencies are installed and configured in your project:
- React
- PropTypes
- Styles from CategoryList.module.scss
- Images for each category (headphones, speakers, earphones)

## Components
# CategoryProduct
- The CategoryProduct component represents an individual category item within the CategoryList. It includes an image, category name, and a shop button.

```jsx
import { CategoryProduct } from 'path/to/CategoryList';

// Usage
<CategoryProduct img={categoryImage} path="category-path">Category Name</CategoryProduct>
```
- Props
img (string, required): The URL or path to the category image.
children (node, required): The category name or content to display.
path (string, required): The URL path associated with the category.

##  Functionality
- The component dynamically renders category items based on the specified type.
- Each category item includes an image, category name, and a shop button.
- The shop button triggers a navigation action.

## Styling
- The component uses styles defined in the CategoryList.module.scss stylesheet. Customize the styles as needed to match your application's design.