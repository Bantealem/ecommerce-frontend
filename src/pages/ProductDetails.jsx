import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
        console.error('Error fetching product:', err);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning fs-5">⭐</span>);
    }

    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-muted fs-5">☆</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4 className="alert-heading">Oops!</h4>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center" role="alert">
          <h4 className="alert-heading">Product Not Found</h4>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 bg-body">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Product Images */}
        <div className="col-lg-6">
          <div className="row g-3">
            {/* Main Image */}
            <div className="col-12">
              <div className="ratio ratio-1x1">
                <img
                  src={product.images?.[selectedImage] || product.thumbnail || '/placeholder-image.jpg'}
                  alt={product.title}
                  className="object-fit-cover rounded shadow"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="col-12">
                <div className="d-flex gap-2 overflow-auto pb-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`ratio ratio-1x1 flex-shrink-0 ${selectedImage === index ? 'border border-primary border-3 rounded' : ''}`}
                      style={{width: '80px', cursor: 'pointer'}}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="object-fit-cover rounded"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Product Title */}
              <h1 className="card-title h2 fw-bold mb-3">{product.title}</h1>

              {/* Brand */}
              {product.brand && (
                <p className="text-muted mb-2">
                  <strong>Brand:</strong> {product.brand}
                </p>
              )}

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <div className="me-2">
                  {renderStars(product.rating || 0)}
                </div>
                <span className="text-muted">
                  ({product.rating?.toFixed(1) || '0.0'})
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="d-flex align-items-center">
                  <span className="h3 text-primary fw-bold mb-0">
                    ${product.price}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-muted text-decoration-line-through ms-3">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                      <span className="badge bg-success ms-3">
                        -{Math.round(product.discountPercentage)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="badge bg-success fs-6 px-3 py-2">
                    ✅ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="badge bg-danger fs-6 px-3 py-2">
                    ❌ Out of Stock
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="badge bg-secondary fs-6 px-3 py-2">
                  📁 {product.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-3 mb-4">
                <button
                  className="btn btn-primary btn-lg"
                  disabled={product.stock === 0 || isAddingToCart}
                  onClick={() => {
                    setIsAddingToCart(true);
                    addToCart(product);
                    setTimeout(() => setIsAddingToCart(false), 800);
                  }}
                >
                  {isAddingToCart ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Adding...
                    </>
                  ) : (
                    <>🛒 Add to Cart</>
                  )}
                </button>
                <button className="btn btn-outline-primary btn-lg">
                  ❤️ Add to Wishlist
                </button>
              </div>

              {/* Product Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-3">
                  <h6 className="fw-bold mb-2">Tags:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="card-title h4 fw-bold mb-3">Product Description</h3>
              <p className="card-text lead">{product.description}</p>

              {/* Product Details */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">Product Details</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>SKU:</strong> {product.sku || 'N/A'}
                    </li>
                    <li className="mb-2">
                      <strong>Weight:</strong> {product.weight || 'N/A'} kg
                    </li>
                    <li className="mb-2">
                      <strong>Dimensions:</strong> {product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'N/A'}
                    </li>
                    <li className="mb-2">
                      <strong>Warranty:</strong> {product.warrantyInformation || 'No warranty information'}
                    </li>
                    <li className="mb-2">
                      <strong>Shipping:</strong> {product.shippingInformation || 'Standard shipping'}
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">Additional Information</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>Return Policy:</strong> {product.returnPolicy || '30-day return policy'}
                    </li>
                    <li className="mb-2">
                      <strong>Minimum Order:</strong> {product.minimumOrderQuantity || 1} item(s)
                    </li>
                    {product.meta && (
                      <>
                        <li className="mb-2">
                          <strong>Barcode:</strong> {product.meta.barcode || 'N/A'}
                        </li>
                        <li className="mb-2">
                          <strong>Created:</strong> {new Date(product.meta.createdAt).toLocaleDateString() || 'N/A'}
                        </li>
                        <li className="mb-2">
                          <strong>Last Updated:</strong> {new Date(product.meta.updatedAt).toLocaleDateString() || 'N/A'}
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section (if available) */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="card-title h4 fw-bold mb-4">Customer Reviews</h3>
                <div className="row g-4">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="col-md-6">
                      <div className="border rounded p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <strong>{review.reviewerName}</strong>
                          <small className="text-muted">
                            {new Date(review.date).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="mb-0">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;