import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API_URL } from "../api";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        animation: "pageFadeIn 0.4s ease-out",
        boxSizing: "border-box",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .cart-content {
            flex-direction: column !important;
          }
          .cart-item-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .cart-item-actions {
            width: 100%;
            justify-content: space-between;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
      <h2
        style={{
          fontSize: "28px",
          color: "rgb(17, 24, 39)",
          marginBottom: "25px",
          fontWeight: "700",
        }}
      >
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h3>Your cart is empty</h3>
          <Link
            to="/"
            style={{
              display: "inline-block",
              maxWidth: "200px",
              margin: "20px auto",
              padding: "14px",
              background:
                "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
              color: "#fff",
              textDecoration: "none",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-content" style={{ display: "flex", gap: "30px" }}>
          <div style={{ flex: "2", width: "100%" }}>
            {cartItems.map((item) => (
              <div
                className="cart-item-card"
                key={item.product}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgb(255, 255, 255)",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  border: "1px solid rgb(229, 231, 235)",
                  gap: "20px",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "rgb(243, 244, 246)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={`${API_URL}${item.image}`}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ flex: "1", width: "100%" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      color: "rgb(17, 24, 39)",
                      marginBottom: "5px",
                    }}
                  >
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <p
                    style={{
                      fontWeight: "700",
                      color: "rgb(225, 29, 72)",
                      fontSize: "18px",
                    }}
                  >
                    ₹{item.price}
                  </p>
                </div>
                <div
                  className="cart-item-actions"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => decreaseQty(item.product)}
                      style={{
                        padding: "4px 10px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: "bold" }}>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.product)}
                      style={{
                        padding: "4px 10px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ fontWeight: "bold", color: "rgb(17, 24, 39)" }}>
                    ₹{item.price * item.qty}
                  </div>
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.product)}
                    style={{
                      backgroundColor: "rgb(239, 68, 68)",
                      color: "#fff",
                      border: "none",
                      padding: "9px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className="cart-summary"
            style={{
              flex: "1",
              backgroundColor: "rgb(255, 255, 255)",
              padding: "25px",
              borderRadius: "12px",
              border: "1px solid rgb(229, 231, 235)",
              height: "fit-content",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "22px",
                color: "rgb(17, 24, 39)",
                marginBottom: "20px",
              }}
            >
              Order Summary
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "16px",
                color: "rgb(100, 100, 100)",
              }}
            >
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "16px",
                color: "rgb(100, 100, 100)",
              }}
            >
              <span>Shipping:</span>
              <span style={{ color: "rgb(0, 128, 0)", fontWeight: "bold" }}>
                FREE
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontSize: "16px",
                color: "rgb(100, 100, 100)",
              }}
            >
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <hr
              style={{
                border: "0",
                borderTop: "1px solid rgb(229, 231, 235)",
                margin: "15px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
                fontWeight: "700",
                fontSize: "20px",
                color: "rgb(17, 24, 39)",
              }}
            >
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/success")}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px",
                background:
                  "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                borderRadius: "8px",
                width: "100%",
                border: "none",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
