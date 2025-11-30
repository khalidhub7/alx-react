import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

// ---------------------------
// SIMPLE PAGE COMPONENTS
// (You can keep them simple; this is routing practice)
// ---------------------------
function HomePage() {
  return <h1>Home</h1>;
}

function ProductsPage() {
  return <h1>All Products</h1>;
}

function ProductDetails() {
  return <h1>Product Details</h1>;
}

function CartPage() {
  return <h1>Your Cart</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

// ---------------------------
// TASK NAVIGATION BAR
// ---------------------------
function Navbar() {
  return (
    <nav>
      {/* TODO: Replace these <a> with <NavLink> and highlight active page */}

      {/* home */}
      <a href="/">Home</a>

      {/* products */}
      <a href="/products">Products</a>

      {/* cart */}
      <a href="/cart">Cart</a>
    </nav>
  );
}

// ---------------------------
// ACTION BUTTON EXAMPLE
// ---------------------------
function CheckoutButton() {
  const navigate = useNavigate();

  function handleCheckout() {
    // TODO: Navigate programmatically to /cart OR /products using useNavigate
  }

  return <button onClick={handleCheckout}>Go To Cart</button>;
}

// ---------------------------
// MAIN APP
// ---------------------------
export default function App() {
  return (
    // TODO: Wrap everything with BrowserRouter
    <div>
      {/* TODO: Add Navbar here */}

      {/* TODO: Define all routes using Routes/Route:
          "/" → HomePage
          "/products" → ProductsPage
          "/products/:id" → ProductDetails
          "/cart" → CartPage
          "*" → NotFound
       */}

      {/* TODO: Show <CheckoutButton /> only on the HomePage (optional, but recommended) */}
    </div>
  );
}
