# Product Component Documentation

The `Product` component is a React component designed to display detailed information about a specific product. It includes features, in-the-box items, a product gallery, and related products. The component fetches product data based on the product name from the URL and handles navigation.

## Usage

```jsx
import Product from 'path/to/Product';

// ...

function MyProductPage() {
  return (
    <Product />
  );
}
```
##  Props
- The Product component does not accept any props directly. It relies on React Router's useParams hook to extract the productName from the URL.

## Dependencies
- Ensure that the following dependencies are installed and configured in your project:

- React
- React Router
- PropTypes
- Styles from Product.module.scss
- Products data (dependency not provided in the code snippet)
- ProductCard, ProductFeatures, IncludesItemsList, Gallery, and RelatedProducts components (dependencies not provided in the code snippet)

##  Components
# ProductFeatures
- - The ProductFeatures component renders a list of features for a product.

```jsx
import { ProductFeatures } from 'path/to/Product';

// Usage
<ProductFeatures features={product.features} />
```

- Props
- - features (string, required): The features of the product as a string.

# IncludesItemsList
- -The IncludesItemsList component renders a list of items included with the product.

```jsx
import { IncludesItemsList } from 'path/to/Product';

// Usage
<IncludesItemsList includes={product.includes} />
```

- Props
- - includes (array, required): An array of objects representing items included with the product.

# Gallery
- - The Gallery component displays a responsive product gallery.

```jsx
import Gallery from 'path/to/Product';

// Usage
<Gallery images={product.gallery} />
```

- Props
- - images (object, required): An object containing URLs for mobile, tablet, and desktop versions of product images.

# Product
- - The main Product component renders detailed information about a specific product.

```jsx
import Product from 'path/to/Product';

// Usage
<Product />
```

## Functionality
- The component fetches product data based on the productName from the URL using the useParams hook.
- If the product is not found, the user is redirected to a 404 page.
- The component displays a loading message while fetching product data.
- The product details include a product card, features, in-the-box items, a product gallery, and related products.

## Styling
- The component uses styles defined in the Product.module.scss stylesheet. Customize the styles as needed to match your application's design.
