import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<SearchResults />} />
                <Route
                  path="*"
                  element={
                    <div className="container py-5">
                      <div className="text-center">
                        <h1 className="display-1">404</h1>
                        <h2 className="h3 mb-4">Page Not Found</h2>
                        <p className="lead text-muted mb-4">
                          The page you're looking for doesn't exist.
                        </p>
                        <a href="/" className="btn btn-primary btn-lg">
                          Go Back Home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;