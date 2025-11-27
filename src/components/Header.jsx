import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      e.target.reset();
    }
  };

  return (
    <header className="sticky-header border-bottom">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
            🛍️ ShopHub
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
            </ul>

            {/* Search Form */}
            <form className="d-flex me-3 mb-3 mb-lg-0" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="search"
                  name="search"
                  className="form-control"
                  placeholder="Search products..."
                  aria-label="Search products"
                />
                <button className="btn btn-outline-primary" type="submit">
                  🔍
                </button>
              </div>
            </form>

            {/* Theme Toggle & Cart */}
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              <Link to="/cart" className="btn btn-primary position-relative">
                🛒 Cart
                {totalItems > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
