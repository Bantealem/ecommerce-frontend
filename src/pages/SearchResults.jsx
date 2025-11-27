import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../services/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await searchProducts(query, 50); // Search with limit of 50
        setProducts(response.products || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to search products');
        setLoading(false);
        console.error('Error searching products:', err);
      }
    };

    performSearch();
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="container-fluid bg-light py-4">
        <div className="container">
          <div className="text-center py-5">
            <div className="mb-4">
              <span className="display-1 text-muted">🔍</span>
            </div>
            <h2 className="h3 text-muted mb-3">No Search Query</h2>
            <p className="text-muted mb-4">
              Please enter a search term to find products.
            </p>
            <Link to="/" className="btn btn-primary">
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              Search Results
            </li>
          </ol>
        </nav>

        {/* Search Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="mb-3 mb-md-0">
                <h1 className="h2 fw-bold text-dark mb-1">
                  Search Results
                </h1>
                <p className="text-muted mb-0">
                  {products.length > 0
                    ? `Found ${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`
                    : `No results found for "${query}"`
                  }
                </p>
              </div>

              <div className="d-flex align-items-center">
                <span className="badge bg-primary fs-6 me-3">
                  🔍 "{query}"
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Searching...</span>
            </div>
            <p className="text-muted">Searching for products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            <div className="mb-3">
              <i className="bi bi-exclamation-triangle fs-1 text-danger"></i>
            </div>
            <h4 className="alert-heading">Search Error</h4>
            <p className="mb-3">{error}</p>
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className="row g-4">
                {products.map((product) => (
                  <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-4">
                  <i className="bi bi-search fs-1 text-muted"></i>
                </div>
                <h3 className="h4 text-muted mb-3">No products found</h3>
                <p className="text-muted mb-4">
                  We couldn't find any products matching "{query}". Try different keywords or browse our categories.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/" className="btn btn-primary">
                    Browse All Products
                  </Link>
                  <Link to="/categories" className="btn btn-outline-primary">
                    View Categories
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Search Tips */}
        {!loading && products.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-lightbulb me-2"></i>
                    Search Tips
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Try using specific keywords (e.g., "wireless headphones")
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Search by brand names or product types
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Use fewer words for broader results
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-check-circle text-success me-2"></i>
                          Check spelling and try synonyms
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;