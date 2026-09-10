import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // યુઝર લોગિન હોય ત્યારે ડેટાબેઝમાંથી તેનું કાર્ટ ફેચ કરવું
  const fetchCartFromDB = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          "http://localhost:5000/api/cart",
          config,
        );

        // જો ગેસ્ટ મોડમાં કંઈક કાર્ટમાં ઉમેર્યું હોય અને હવે લોગિન કર્યું હોય તો બંને મર્જ કરો
        if (cartItems.length > 0) {
          const mergedCart = [...data];
          cartItems.forEach((guestItem) => {
            const existIndex = mergedCart.findIndex(
              (item) => item.product === guestItem.product,
            );
            if (existIndex >= 0) {
              mergedCart[existIndex].qty += guestItem.qty;
            } else {
              mergedCart.push(guestItem);
            }
          });
          setCartItems(mergedCart);
          syncCartWithDB(mergedCart); // ડેટાબેઝમાં મર્જ થયેલું કાર્ટ મોકલી દો
        } else {
          setCartItems(data || []);
        }
      } catch (error) {
        console.error("Error fetching cart from DB:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartFromDB();
  }, []);

  const syncCartWithDB = async (updatedItems) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.post(
          "http://localhost:5000/api/cart",
          { cartItems: updatedItems },
          config,
        );
      } catch (error) {
        console.error(
          "Cart sync error:",
          error.response?.data || error.message,
        );
      }
    }
  };

  const addToCart = (product, qty) => {
    const existItem = cartItems.find((x) => x.product === product._id);
    const newQty = Number(qty);
    let updatedCart;
    if (existItem) {
      updatedCart = cartItems.map((x) =>
        x.product === existItem.product ? { ...existItem, qty: newQty } : x,
      );
    } else {
      updatedCart = [
        ...cartItems,
        { ...product, product: product._id, qty: newQty },
      ];
    }
    setCartItems(updatedCart);
    syncCartWithDB(updatedCart);
  };

  const increaseQty = (id) => {
    const updatedCart = cartItems.map((x) =>
      x.product === id ? { ...x, qty: x.qty + 1 } : x,
    );
    setCartItems(updatedCart);
    syncCartWithDB(updatedCart);
  };

  const decreaseQty = (id) => {
    const item = cartItems.find((x) => x.product === id);
    let updatedCart;
    if (item.qty === 1) {
      updatedCart = cartItems.filter((x) => x.product !== id);
    } else {
      updatedCart = cartItems.map((x) =>
        x.product === id ? { ...x, qty: x.qty - 1 } : x,
      );
    }
    setCartItems(updatedCart);
    syncCartWithDB(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((x) => x.product !== id);
    setCartItems(updatedCart);
    syncCartWithDB(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    syncCartWithDB([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        setCartItems,
        fetchCartFromDB,
        syncCartWithDB,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
