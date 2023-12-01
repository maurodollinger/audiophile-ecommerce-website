# Category Component Documentation

The `Category` component is a React component designed to display a category page with a list of products belonging to that category. It utilizes the React Router's `useParams` hook to retrieve the category name from the URL and filters the products accordingly.

## Usage

The `Category` component is used to render category pages in your application. To use this component, import it into the desired file and include it in your JSX.

```jsx
import Category from 'path/to/Category';

// ...

function MyCategoryPage() {
  return (
    <Category />
  );
}

```

## Props
- The Category component does not accept any props directly. It relies on the React Router's useParams hook to extract the categoryName from the URL.

## Error Handling
- If the categoryName is not valid or missing, the component renders an error message. You may customize this behavior based on your application's requirements.

## Dynamic Page Title
- The document title is set dynamically based on the current category. This ensures a more informative title for each category page.

## Styling
- The component uses the Category.module.scss stylesheet for styling. Adjust styles as needed to match your application's design.

## External Data
- Products data is currently sourced from a local mockup (products.json). Consider fetching product data from an external source or managing it centrally, depending on your application's needs.

## Dependencies
- Ensure that the following dependencies are installed and configured in your project:
- React
- React Router
- Styles from Category.module.scss
- Products data (dependency not provided in the code snippet)
- ProductCard, CategoryList, and PromoSection components (dependencies not provided in the code snippet)