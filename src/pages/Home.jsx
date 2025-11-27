import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts(8, 0); // Get first 8 products
        setFeaturedProducts(response.products || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-body">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to ShopHub
          </h1>
          <p className="lead mb-4">
            Discover amazing products at great prices. Shop the latest trends
            and find everything you need in one place.
          </p>
          <Link to="/products" className="btn btn-light btn-lg px-4 py-3 fw-semibold">
            🛍️ Start Shopping
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 bg-body-secondary">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-body mb-3">Featured Products</h2>
            <p className="lead text-body-secondary">
              Check out our handpicked selection of the best products
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="spinner-container">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              <h4 className="alert-heading">Oops!</h4>
              <p>{error}</p>
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
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* View All Products Button */}
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-primary btn-lg px-4 py-3">
              View All Products 🛍️
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-body">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-body mb-3">Why Choose ShopHub?</h2>
            <p className="lead text-body-secondary">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <span className="text-primary fs-2">🚚</span>
                </div>
                <h5 className="fw-bold mb-3">Fast Shipping</h5>
                <p className="text-muted">
                  Get your orders delivered quickly with our express shipping options.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <span className="text-success fs-2">🔒</span>
                </div>
                <h5 className="fw-bold mb-3">Secure Payment</h5>
                <p className="text-muted">
                  Your payments are protected with industry-leading security measures.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                  <span className="text-info fs-2">📞</span>
                </div>
                <h5 className="fw-bold mb-3">24/7 Support</h5>
                <p className="text-muted">
                  Our customer service team is always here to help you with any questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">Stay Updated</h2>
          <p className="lead mb-4">
            Subscribe to our newsletter and get exclusive deals and updates
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <form onSubmit={handleNewsletterSubscription}>
                <div className="input-group input-group-lg">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    required
                  />
                  <button className="btn btn-light" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>

              {/* Status Messages */}
              {subscriptionStatus && (
                <div className={`mt-3 alert ${
                  subscriptionStatus.type === 'success' ? 'alert-success' :
                  subscriptionStatus.type === 'error' ? 'alert-danger' :
                  'alert-warning'
                }`}>
                  <i className={`bi me-2 ${
                    subscriptionStatus.type === 'success' ? 'bi-check-circle' :
                    subscriptionStatus.type === 'error' ? 'bi-exclamation-circle' :
                    'bi-info-circle'
                  }`}></i>
                  {subscriptionStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;