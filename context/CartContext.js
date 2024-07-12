import React, { createContext, useState, useEffect, useContext } from "react";
import Notification from "../components/Notification";
import { saveCartToDatabase, getCartFromDatabase } from "../lib/appwrite";
import { useGlobalContext } from "./GlobalProvider";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        const cartItems = await getCartFromDatabase(user.accountId);
        setCart(cartItems);
      }
    };
    fetchCartData();
  }, [user]);

  const saveCart = async (updatedCart) => {
    if (user) {
      await saveCartToDatabase(user.accountId, updatedCart);
    }
  };

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      setNotification("Product is already added to the cart.");
      return;
    }
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.current_price[0].NGN[0],
      0
    );
  };

  const getItemCount = () => {
    return cart.length;
  };

  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
    </CartContext.Provider>
  );
};
