import React, { useState, useEffect } from 'react';

const Filters = ({ onFilterChange, categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({
      category: category === 'all' ? '' : category,
      priceRange,
      sortBy,
    });
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({
      category: selectedCategory,
      priceRange: newPriceRange,
      sortBy,
    });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    onFilterChange({
      category: selectedCategory,
      priceRange,
      sortBy: sort,
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    onFilterChange({
      category: '',
      priceRange: { min: '', max: '' },
      sortBy: '',
    });
  };

  return (
    <div className="card shadow-sm border-0 bg-white">
      <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center py-3">
        <div>
          <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
            <span className="me-2">🔍</span>
            Filters
          </h5>
          <small className="text-muted">Refine your search</small>
        </div>
        <button
          onClick={clearFilters}
          className="btn btn-outline-danger btn-sm"
          title="Clear all filters"
        >
          🗑️ Clear
        </button>
      </div>

      <div className="card-body p-4">

        {/* Category Filter */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-muted">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => {
              // Handle both string categories and category objects
              const categoryValue = typeof category === 'string' ? category : category.slug || category.name || category;
              const categoryLabel = typeof category === 'string'
                ? (category.length > 0 ? category.charAt(0).toUpperCase() + category.slice(1) : 'Unknown Category')
                : category.name || category.slug || 'Unknown Category';

              return (
                <option key={categoryValue} value={categoryValue}>
                  {categoryLabel}
                </option>
              );
            })}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-muted">
            Price Range
          </label>
          <div className="row g-3">
            <div className="col-6">
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="form-control"
                  min="0"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="form-control"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-muted">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="form-select"
          >
            <option value="">Default Order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* Active Filters Summary */}
        {(selectedCategory || priceRange.min || priceRange.max || sortBy) && (
          <div className="border-top pt-3 mt-3">
            <h5 className="fw-semibold text-muted mb-3">Active Filters:</h5>
            <div className="d-flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="badge bg-primary d-flex align-items-center gap-1">
                  Category: {typeof selectedCategory === 'string' ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : selectedCategory}
                  <button
                    onClick={() => handleCategoryChange('')}
                    className="btn-close btn-close-white ms-1"
                    aria-label="Remove filter"
                    style={{width: '0.5rem', height: '0.5rem'}}
                  >
                  </button>
                </span>
              )}
              {priceRange.min && (
                <span className="badge bg-success d-flex align-items-center gap-1">
                  Min: ${priceRange.min}
                  <button
                    onClick={() => handlePriceChange('min', '')}
                    className="btn-close btn-close-white ms-1"
                    aria-label="Remove filter"
                    style={{width: '0.5rem', height: '0.5rem'}}
                  >
                  </button>
                </span>
              )}
              {priceRange.max && (
                <span className="badge bg-success d-flex align-items-center gap-1">
                  Max: ${priceRange.max}
                  <button
                    onClick={() => handlePriceChange('max', '')}
                    className="btn-close btn-close-white ms-1"
                    aria-label="Remove filter"
                    style={{width: '0.5rem', height: '0.5rem'}}
                  >
                  </button>
                </span>
              )}
              {sortBy && (
                <span className="badge bg-info d-flex align-items-center gap-1">
                  Sort: {sortBy === 'price-low' ? 'Price Low' : sortBy === 'price-high' ? 'Price High' : sortBy === 'rating' ? 'Rating' : 'Name'}
                  <button
                    onClick={() => handleSortChange('')}
                    className="btn-close btn-close-white ms-1"
                    aria-label="Remove filter"
                    style={{width: '0.5rem', height: '0.5rem'}}
                  >
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
