import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="row g-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card placeholder-glow">
              <div className="ratio ratio-1x1 bg-light placeholder"></div>
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                </p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="placeholder col-3"></span>
                  <span className="placeholder col-2"></span>
                </div>
                <div className="d-grid gap-2">
                  <span className="placeholder col-12 btn btn-outline-secondary"></span>
                  <span className="placeholder col-12 btn btn-primary"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '5rem', height: '5rem'}}>
          <span className="text-danger fs-1">😞</span>
        </div>
        <h3 className="h4 fw-semibold text-dark mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-muted mb-4">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{width: '5rem', height: '5rem'}}>
          <span className="text-muted fs-1">🔍</span>
        </div>
        <h3 className="h4 fw-semibold text-dark mb-3">
          No products found
        </h3>
        <p className="text-muted mb-4">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
        <button
          onClick={() => window.history.back()}
          className="btn btn-secondary"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
