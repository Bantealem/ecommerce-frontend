import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategories();

        // Ensure we have an array
        const categoriesArray = Array.isArray(response) ? response : [];
        setCategories(categoriesArray);
        setLoading(false);
      } catch (err) {
        // Fallback to some default categories
        const fallbackCategories = [
          'smartphones', 'laptops', 'fragrances', 'skincare',
          'groceries', 'home-decoration', 'furniture', 'tops',
          'womens-dresses', 'womens-shoes', 'mens-shirts', 'mens-shoes'
        ];
        setCategories(fallbackCategories);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Category icons mapping
  const getCategoryIcon = (category) => {
    const icons = {
      'smartphones': '📱',
      'laptops': '💻',
      'fragrances': '🌸',
      'skincare': '🧴',
      'groceries': '🛒',
      'home-decoration': '🏠',
      'furniture': '🪑',
      'tops': '👕',
      'womens-dresses': '👗',
      'womens-shoes': '👠',
      'mens-shirts': '👔',
      'mens-shoes': '👞',
      'mens-watches': '⌚',
      'womens-watches': '⌚',
      'womens-bags': '👜',
      'womens-jewellery': '💍',
      'sunglasses': '🕶️',
      'automotive': '🚗',
      'motorcycle': '🏍️',
      'lighting': '💡'
    };

    return icons[category] || '📦';
  };

  // Category descriptions
  const getCategoryDescription = (category) => {
    const descriptions = {
      'smartphones': 'Latest smartphones and mobile devices',
      'laptops': 'Powerful laptops and computing devices',
      'fragrances': 'Premium perfumes and fragrances',
      'skincare': 'Beauty and skincare products',
      'groceries': 'Fresh groceries and essentials',
      'home-decoration': 'Home decor and accessories',
      'furniture': 'Quality furniture for your home',
      'tops': 'Fashionable tops and t-shirts',
      'womens-dresses': 'Elegant dresses and outfits',
      'womens-shoes': 'Stylish footwear for women',
      'mens-shirts': 'Smart shirts for men',
      'mens-shoes': 'Comfortable shoes for men',
      'mens-watches': 'Premium watches for men',
      'womens-watches': 'Elegant watches for women',
      'womens-bags': 'Designer bags and purses',
      'womens-jewellery': 'Beautiful jewelry pieces',
      'sunglasses': 'Stylish sunglasses and eyewear',
      'automotive': 'Car parts and accessories',
      'motorcycle': 'Motorcycle gear and parts',
      'lighting': 'Home and office lighting'
    };

    return descriptions[category] || 'Explore our product collection';
  };

  return (
    <div className="container-fluid bg-body py-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Categories
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark mb-3">
            Product Categories
          </h1>
          <p className="lead text-muted">
            Browse our wide range of product categories and find exactly what you're looking for
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading categories...</span>
            </div>
            <p className="text-muted">Loading product categories...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            <div className="mb-3">
              <i className="bi bi-exclamation-triangle fs-1 text-danger"></i>
            </div>
            <h4 className="alert-heading">Error Loading Categories</h4>
            <p className="mb-3">{error}</p>
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <div>
            <div className="mb-3">
              <p className="text-muted">Found {categories.length} categories</p>
            </div>
            <div className="row g-4">
              {categories.length > 0 ? categories.map((category, index) => {
                // Handle different category formats (string or object)
                const categorySlug = typeof category === 'string' ? category : category?.slug || category?.name || `category-${index}`;
                const categoryName = typeof category === 'string'
                  ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
                  : category?.name || category?.slug || `Category ${index + 1}`;

                return (
                  <div key={categorySlug || index} className="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={`/products?category=${categorySlug}`}
                      className="text-decoration-none"
                    >
                      <div className="card h-100 border-0 shadow-sm hover-card">
                        <div className="card-body text-center p-4">
                          {/* Category Icon */}
                          <div className="mb-3">
                            <span className="display-4">{getCategoryIcon(categorySlug)}</span>
                          </div>

                          {/* Category Name */}
                          <h5 className="card-title fw-bold text-dark mb-3">
                            {categoryName}
                          </h5>

                          {/* Category Description */}
                          <p className="card-text text-muted small mb-3">
                            {getCategoryDescription(categorySlug)}
                          </p>

                          {/* View Products Button */}
                          <div className="mt-auto">
                            <span className="btn btn-primary btn-sm">
                              <i className="bi bi-eye me-1"></i>
                              View Products
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }) : (
                <div className="col-12">
                  <div className="alert alert-info text-center">
                    <i className="bi bi-info-circle fs-1 mb-3"></i>
                    <h5>No categories found</h5>
                    <p className="mb-0">Please check your internet connection and try again.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Statistics */}
        {!loading && !error && categories.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="h2 mb-2">{categories.length}</div>
                      <div className="h6 mb-0">Product Categories</div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="h2 mb-2">🔍</div>
                      <div className="h6 mb-0">Easy to Browse</div>
                    </div>
                    <div className="col-md-4">
                      <div className="h2 mb-2">✨</div>
                      <div className="h6 mb-0">Quality Products</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card border-0 bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <div className="card-body text-white text-center p-4">
                  <h4 className="card-title mb-3">Can't Find What You're Looking For?</h4>
                  <p className="card-text mb-4">
                    Browse all our products or use our search feature to find exactly what you need.
                  </p>
                  <div className="d-flex justify-content-center gap-3">
                    <Link to="/products" className="btn btn-light">
                      <i className="bi bi-grid me-2"></i>
                      All Products
                    </Link>
                    <Link to="/#search" className="btn btn-outline-light">
                      <i className="bi bi-search me-2"></i>
                      Search
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
