import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  if (!product) return null;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">⭐</span>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-muted">☆</span>);
    }

    return stars;
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      {/* Product Image */}
      <div className="position-relative">
        <img
          src={product.thumbnail || '/placeholder-image.jpg'}
          alt={product.title}
          className="card-img-top"
          style={{height: '200px', objectFit: 'cover'}}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Product Title */}
        <h6 className="card-title fw-semibold text-dark mb-2">
          {product.title}
        </h6>

        {/* Product Description */}
        <p className="card-text text-muted small mb-2">
          {product.description?.length > 60
            ? `${product.description.substring(0, 60)}...`
            : product.description
          }
        </p>

        {/* Rating */}
        <div className="mb-2">
          <div className="d-flex align-items-center mb-1">
            {renderStars(product.rating || 0)}
            <small className="text-muted ms-2">
              ({product.rating?.toFixed(1) || '0.0'})
            </small>
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2">
            <span className="h5 text-primary fw-bold mb-0">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <small className="text-muted text-decoration-line-through ms-2">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </small>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-2">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-primary"
            >
              👁️ View Details
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsAdding(true);
                addToCart(product);
                setTimeout(() => setIsAdding(false), 800);
              }}
              disabled={isAdding}
            >
              {isAdding ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Adding...
                </>
              ) : (
                <>🛒 Add to Cart</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;