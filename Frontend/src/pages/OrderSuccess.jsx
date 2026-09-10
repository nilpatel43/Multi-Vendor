import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const OrderSuccess = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const taxPrice = itemsPrice * 0.18;
  const totalPrice = itemsPrice + taxPrice;

  const upiId = "nilsanghani43@okicici";
  const payeeName = "MegaStore";
  const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${totalPrice.toFixed(2)}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiLink)}`;

  useEffect(() => {
    if (!userInfo) {
      alert("Please login first to proceed with payment!");
      navigate("/login");
    } else if (cartItems.length === 0 && !orderPlaced) {
      navigate("/cart");
    }
  }, [navigate, userInfo, cartItems.length, orderPlaced]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(
        "https://multi-vendor-1.onrender.com/api/orders",
        {
          orderItems: cartItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          totalPrice,
        },
        config,
      );
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      alert("Error placing order");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        minHeight: "80vh",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          width: "100%",
          maxWidth: "550px",
          border: "1px solid rgb(229, 231, 235)",
          textAlign: "center",
        }}
      >
        {!orderPlaced ? (
          <div>
            <h2
              style={{
                color: "rgb(17, 24, 39)",
                marginBottom: "25px",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              Select Payment Method
            </h2>
            <form onSubmit={handlePlaceOrder}>
              <div
                style={{
                  textAlign: "left",
                  margin: "20px 0",
                  background: "rgb(248, 249, 250)",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgb(229, 231, 235)",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "15px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    defaultChecked
                    onChange={() => setPaymentMethod("COD")}
                  />{" "}
                  Cash on Delivery (COD)
                </label>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="Online QR"
                    onChange={() => setPaymentMethod("Online QR")}
                  />{" "}
                  Online QR Code Payment
                </label>

                {paymentMethod === "Online QR" && (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "15px",
                      padding: "15px",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      border: "1px dashed rgb(200, 200, 200)",
                    }}
                  >
                    <p
                      style={{
                        marginBottom: "10px",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      Scan to Pay:{" "}
                      <span style={{ color: "rgb(177, 39, 4)" }}>
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </p>
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        margin: "0 auto",
                      }}
                    >
                      <img
                        src={qrImageUrl}
                        alt="Pay with UPI"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "13px",
                        color: "gray",
                      }}
                    >
                      Google Pay, PhonePe, Paytm accepted
                    </p>
                  </div>
                )}
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  background:
                    "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                Confirm & Place Order
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 style={{ color: "rgb(0, 128, 0)" }}>
              🎉 Order Placed Successfully!
            </h2>
            <p style={{ margin: "20px 0" }}>
              Thank you for shopping. Your order has been securely placed.
            </p>
            <Link
              to="/my-orders"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background:
                  "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "600",
                borderRadius: "8px",
              }}
            >
              View My Orders
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
