import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // Increase quantity if item already exists
        const updatedItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Add new item to cart
        const newItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        };
        return {
          ...state,
          items: [...state.items, newItem],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.id !== id),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
      };

    case 'INCREASE_QUANTITY': {
      const id = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return {
        ...state,
        items: updatedItems,
      };
    }

    case 'DECREASE_QUANTITY': {
      const id = action.payload;
      const updatedItems = state.items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity

      return {
        ...state,
        items: updatedItems,
      };
    }

    case 'LOAD_CART':
      // Load cart from localStorage
      return action.payload;

    default:
      return state;
  }
};

// Initial cart state
const initialCartState = {
  items: [],
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  // Calculate cart totals
  const totalPrice = cartState.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const totalItems = cartState.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const value = {
    cart: cartState,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
