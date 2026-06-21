import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, tenure) => {
    const item = {
      id: product._id,
      name: product.name,
      monthlyPrice: product.monthlyPrice,
      securityDeposit: product.securityDeposit,
      tenure,
      totalCost: product.monthlyPrice * tenure,
    };
    setCart([...cart, item]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalCost, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};