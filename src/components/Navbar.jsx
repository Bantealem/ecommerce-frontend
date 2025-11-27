import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context';
import { useDarkMode } from '../hooks';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-4 text-primary"
        >
          E-Shop
        </Link>

        {/* Mobile Toggle Button */}
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

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="d-flex flex-grow-1 mx-lg-4 mb-3 mb-lg-0">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-outline-secondary"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Right side buttons */}
          <div className="d-flex align-items-center">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="btn btn-outline-secondary me-2"
              aria-label="Toggle dark mode"
            >
              <span className="fs-5">{isDarkMode ? '☀️' : '🌙'}</span>
            </button>

            {/* Cart Indicator */}
            <Link
              to="/cart"
              className="btn btn-primary position-relative"
              aria-label="Shopping cart"
            >
              <span className="fs-5">🛒</span>
              {totalItems > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="d-lg-none w-100 mt-2">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-outline-secondary"
              >
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
