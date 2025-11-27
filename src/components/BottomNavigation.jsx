import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context';

const BottomNavigation = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: '🏠',
    },
    {
      path: '/products',
      label: 'Products',
      icon: '🛍️',
    },
    {
      path: '/cart',
      label: 'Cart',
      icon: '🛒',
      badge: totalItems > 0 ? (totalItems > 99 ? '99+' : totalItems.toString()) : null,
    },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="d-lg-none fixed-bottom bg-white border-top shadow-lg">
      <div className="d-flex align-items-center justify-content-around py-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`d-flex flex-column align-items-center justify-content-center flex-fill py-2 px-1 text-decoration-none rounded mx-1 ${
              isActive(item.path)
                ? 'text-primary bg-primary bg-opacity-10'
                : 'text-muted link-secondary'
            }`}
          >
            <div className="position-relative mb-1">
              <span className="fs-4">
                {item.icon}
              </span>
              {item.badge && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`small ${isActive(item.path) ? 'fw-bold' : 'fw-medium'}`}>
              {item.label}
            </span>
            {/* Active indicator */}
            {isActive(item.path) && (
              <div className="position-absolute bottom-0 start-50 translate-middle-x bg-primary rounded" style={{width: '2rem', height: '0.25rem'}}></div>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
