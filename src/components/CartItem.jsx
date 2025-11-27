import React from 'react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  if (!item) return null;

  const itemTotal = (item.price * (item.quantity || 1));

  return (
    <div className="col-12">
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Product Image */}
            <div className="col-auto">
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{maxWidth: '100%', maxHeight: '100%'}}
                  />
                ) : (
                  <span className="text-muted fs-1">🛍️</span>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="col">
              <h6 className="card-title fw-semibold mb-1">
                {item.title || 'Product Title'}
              </h6>
              <p className="card-text text-muted small mb-1">
                ${item.price?.toFixed(2) || '0.00'} each
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="col-auto">
              <div className="input-group input-group-sm" style={{width: '120px'}}>
                <button
                  onClick={() => onDecrease(item.id)}
                  className="btn btn-outline-secondary"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  value={item.quantity || 1}
                  readOnly
                />
                <button
                  onClick={() => onIncrease(item.id)}
                  className="btn btn-outline-secondary"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="col-auto">
              <span className="fw-bold fs-5 text-primary">
                ${itemTotal.toFixed(2)}
              </span>
            </div>

            {/* Remove Button */}
            <div className="col-auto">
              <button
                onClick={() => onRemove(item.id)}
                className="btn btn-outline-danger btn-sm"
                aria-label="Remove item"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
