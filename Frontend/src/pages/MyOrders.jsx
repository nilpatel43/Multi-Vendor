import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchOrders = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await api.get(
        "/api/orders/myorders",
        config,
      );
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      fetchOrders();
    }
  }, [navigate, userInfo, fetchOrders]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to Cancel this order?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await api.delete(`/api/orders/${id}`, config);
        alert("Order Cancelled Successfully!");
        fetchOrders();
      } catch (error) {
        alert("Error cancelling order");
      }
    }
  };

  const editHandler = () => {
    alert(
      "To change items in your order, please Cancel this order and place a new one.",
    );
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "60vh",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
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
        My Orders History
      </h2>
      {loading ? (
        <h3>Loading your orders...</h3>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h3>You have no orders yet.</h3>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              maxWidth: "200px",
              margin: "20px auto",
              background:
                "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div
          className="admin-recent-orders"
          style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid rgb(229, 231, 235)",
            marginTop: "20px",
            overflowX: "auto",
            paddingBottom: "35px", // Scrollbar ne niche muki didhu che jethi order id clear dekhay
            marginBottom: "30px",
          }}
        >
          <table className="admin-table" style={{ minWidth: "600px" }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ fontWeight: "bold" }}>
                    #{order._id.substring(0, 8)}
                  </td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td style={{ color: "rgb(177, 39, 4)", fontWeight: "bold" }}>
                    ₹ {order.totalPrice.toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${order.isDelivered ? "delivered" : "pending"}`}
                    >
                      {order.isDelivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td>
                    {!order.isDelivered ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={editHandler}
                          className="action-btn"
                          style={{
                            backgroundColor: "rgb(255, 153, 0)",
                            color: "rgb(35, 47, 62)",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandler(order._id)}
                          className="action-btn"
                          style={{
                            backgroundColor: "rgb(255, 77, 77)",
                            color: "#fff",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{ color: "rgb(21, 87, 36)", fontWeight: "bold" }}
                      >
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
