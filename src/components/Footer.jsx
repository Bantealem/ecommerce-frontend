import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleNewsletterSubscription = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      setSubscriptionStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // Store email in localStorage (for demo purposes)
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (subscribers.includes(email)) {
      setSubscriptionStatus({ type: 'warning', message: 'You are already subscribed!' });
      return;
    }

    subscribers.push(email);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

    // Show success message
    setSubscriptionStatus({ type: 'success', message: 'Thank you for subscribing! 🎉' });

    // Clear form
    e.target.reset();

    // Clear message after 5 seconds
    setTimeout(() => setSubscriptionStatus(null), 5000);
  };

  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">🛍️ ShopHub</h5>
            <p className="mb-3">
              Your one-stop destination for amazing products. We offer quality items
              at competitive prices with fast shipping worldwide.
            </p>
            <div className="d-flex">
              <a href="#" className="text-light me-3 fs-5" aria-label="Facebook">
                📘
              </a>
              <a href="#" className="text-light me-3 fs-5" aria-label="Twitter">
                🐦
              </a>
              <a href="#" className="text-light me-3 fs-5" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="text-light fs-5" aria-label="LinkedIn">
                💼
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-light text-decoration-none">Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="text-light text-decoration-none">Categories</Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-light text-decoration-none">Cart</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6">
            <h6 className="mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Shipping Info</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">Returns</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 className="mb-3">Newsletter</h6>
            <p className="mb-3">
              Subscribe to get special offers and updates about new products.
            </p>
            <form onSubmit={handleNewsletterSubscription}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>

            {/* Status Messages */}
            {subscriptionStatus && (
              <div className={`mt-2 small ${
                subscriptionStatus.type === 'success' ? 'text-success' :
                subscriptionStatus.type === 'error' ? 'text-danger' :
                'text-warning'
              }`}>
                <i className={`bi ${
                  subscriptionStatus.type === 'success' ? 'bi-check-circle' :
                  subscriptionStatus.type === 'error' ? 'bi-exclamation-circle' :
                  'bi-info-circle'
                } me-1`}></i>
                {subscriptionStatus.message}
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              © {currentYear} ShopHub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end justify-content-center">
              <a href="#" className="text-light text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-light text-decoration-none me-3">Terms of Service</a>
              <a href="#" className="text-light text-decoration-none">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
