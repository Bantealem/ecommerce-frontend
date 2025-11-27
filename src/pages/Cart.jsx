import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components';
import { useCart } from '../context';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice, totalItems } = useCart();

  const handleIncrease = (id) => {
    increaseQuantity(id);
  };

  const handleDecrease = (id) => {
    decreaseQuantity(id);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (cart.items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="mb-4">
            <span className="display-1 text-muted">🛒</span>
          </div>
          <h2 className="h3 fw-bold text-dark mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted mb-4">
            Add some products to your cart to get started
          </p>
          <Link
            to="/products"
            className="btn btn-primary btn-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light py-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" className="text-decoration-none">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="h2 fw-bold text-dark mb-2">Shopping Cart</h1>
            <p className="text-muted mb-0">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="row g-3">
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {/* Cart Actions */}
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
              <button
                onClick={handleClearCart}
                className="btn btn-outline-danger"
              >
                <i className="bi bi-trash me-2"></i>
                Clear Cart
              </button>
              <Link
                to="/products"
                className="btn btn-outline-primary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{top: '1rem'}}>
              <div className="card-body">
                <h5 className="card-title fw-bold mb-4">Order Summary</h5>

                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal ({totalItems} items)</span>
                    <span className="fw-semibold">${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success">Free</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Tax</span>
                    <span className="fw-semibold">${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Total</span>
                    <span className="text-primary">${(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary w-100 mb-3"
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Proceed to Checkout
                </Link>

                <div className="text-center">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Secure checkout with SSL encryption
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
