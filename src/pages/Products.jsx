import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid, Filters } from '../components';
import { getProducts, getCategories, getProductsByCategory, searchProducts } from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: { min: '', max: '' },
    sortBy: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        // Fallback to some default categories
        setCategories(['electronics', 'clothing', 'home', 'sports', 'books']);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;

        // Check if there's a search query
        const searchQuery = searchParams.get('q');
        if (searchQuery) {
          response = await searchProducts(searchQuery, 100);
        } else if (filters.category && filters.category !== 'all') {
          response = await getProductsByCategory(filters.category, 100);
        } else {
          response = await getProducts(100, 0);
        }

        let filteredProducts = response.products || [];

        // Apply price filter
        if (filters.priceRange.min) {
          filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(filters.priceRange.min));
        }
        if (filters.priceRange.max) {
          filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(filters.priceRange.max));
        }

        // Apply sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price-low':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              break;
            case 'name':
              filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
              break;
            default:
              break;
          }
        }

        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
              Products
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="mb-3 mb-md-0">
                <h1 className="h2 fw-bold text-dark mb-1">
                  {filters.category ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products` : 'All Products'}
                </h1>
                <p className="text-muted mb-0">Discover our amazing collection</p>
              </div>

              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-primary fs-6">
                  {products.length} products
                </span>

                {/* Sort Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    id="sortDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-sort-down me-2"></i>
                    Sort
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="sortDropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleFilterChange({...filters, sortBy: ''})}
                      >
                        Default Order
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleFilterChange({...filters, sortBy: 'price-low'})}
                      >
                        Price: Low to High
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleFilterChange({...filters, sortBy: 'price-high'})}
                      >
                        Price: High to Low
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleFilterChange({...filters, sortBy: 'rating'})}
                      >
                        Highest Rated
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleFilterChange({...filters, sortBy: 'name'})}
                      >
                        Name A-Z
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Filters Sidebar - Desktop */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="sticky-top" style={{top: '1rem'}}>
              <Filters
                onFilterChange={handleFilterChange}
                categories={categories}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {/* Mobile Filters Toggle */}
            <div className="d-lg-none mb-3">
              <button
                className="btn btn-outline-primary w-100"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileFilters"
                aria-expanded="false"
                aria-controls="mobileFilters"
              >
                <i className="bi bi-funnel me-2"></i>
                Filters
              </button>
              <div className="collapse mt-3" id="mobileFilters">
                <Filters
                  onFilterChange={handleFilterChange}
                  categories={categories}
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted">Loading products...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="alert alert-danger text-center" role="alert">
                <div className="mb-3">
                  <i className="bi bi-exclamation-triangle fs-1 text-danger"></i>
                </div>
                <h5 className="alert-heading">Error Loading Products</h5>
                <p className="mb-3">{error}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                <ProductGrid
                  products={products}
                  loading={loading}
                  error={error}
                />

                {/* Empty State */}
                {products.length === 0 && (
                  <div className="text-center py-5">
                    <div className="mb-4">
                      <i className="bi bi-search fs-1 text-muted"></i>
                    </div>
                    <h4 className="text-muted mb-3">No products found</h4>
                    <p className="text-muted mb-4">
                      Try adjusting your filters or search terms.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleFilterChange({
                        category: '',
                        priceRange: { min: '', max: '' },
                        sortBy: '',
                      })}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
