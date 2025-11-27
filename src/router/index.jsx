import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Navbar, BottomNavigation } from '../components';
import {
  Home,
  Products,
  ProductDetails,
  Cart,
  Checkout,
  SearchResults
} from '../pages';

// Layout component with navbar and bottom navigation
const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <Navbar />
      <main className="pb-5 d-md-none">
        {children}
      </main>
      <main className="d-none d-md-block">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/products',
    element: <Layout><Products /></Layout>,
  },
  {
    path: '/product/:id',
    element: <Layout><ProductDetails /></Layout>,
  },
  {
    path: '/cart',
    element: <Layout><Cart /></Layout>,
  },
  {
    path: '/checkout',
    element: <Layout><Checkout /></Layout>,
  },
  {
    path: '/search',
    element: <Layout><SearchResults /></Layout>,
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="d-flex align-items-center justify-content-center py-5">
          <div className="text-center">
            <div className="display-1 mb-4">😵</div>
            <h1 className="h2 fw-bold text-dark mb-4">
              Page Not Found
            </h1>
            <p className="text-muted mb-4">
              The page you're looking for doesn't exist.
            </p>
            <a
              href="/"
              className="btn btn-primary px-4 py-2 fw-semibold"
            >
              Go Home
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);

export default router;
