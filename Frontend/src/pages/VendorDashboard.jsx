import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo || userInfo.role !== "vendor") {
      navigate("/login");
      return;
    }
    fetchVendorData();
  }, [navigate, userInfo]);

  const fetchVendorData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      const productRes = await axios.get(
        "http://localhost:5000/api/products",
        config,
      );
      const myProducts = productRes.data.filter((p) => {
        const vendorId = p.vendor?._id || p.vendor;
        return vendorId?.toString() === userInfo._id?.toString();
      });
      setProducts(myProducts);

      try {
        const orderRes = await axios.get(
          "http://localhost:5000/api/orders",
          config,
        );
        const myProductIds = myProducts.map((p) => p._id.toString());

        const vendorOrders = orderRes.data.filter((order) => {
          if (!order.orderItems) return false;
          return order.orderItems.some((item) => {
            const prodId = item.product?._id || item.product;
            return myProductIds.includes(prodId?.toString());
          });
        });

        setOrders(vendorOrders);
      } catch (err) {
        console.error("Error fetching orders");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        alert("Product deleted successfully");
        fetchVendorData();
      } catch (error) {
        alert("Error deleting product");
      }
    }
  };

  const addProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("image", image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post("http://localhost:5000/api/products", formData, config);
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImage(null);
      setActiveTab("products");
      fetchVendorData();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding product");
    }
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center", padding: "50px" }}>
        Loading Vendor Dashboard...
      </h2>
    );

  const totalOrdersCount = orders.length;

  const totalEarnings = orders.reduce((acc, order) => {
    const myProductIds = products.map((p) => p._id.toString());
    const myItems = order.orderItems.filter((i) => {
      const pId = i.product?._id || i.product;
      return myProductIds.includes(pId?.toString());
    });
    const orderTotal = myItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    return acc + orderTotal;
  }, 0);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "rgb(243, 244, 246)",
      }}
    >
      <style>{`
        .sidebar-btn {
          width: 100%;
          text-align: left;
          padding: 14px 20px;
          background: transparent;
          border: none;
          color: rgb(156, 163, 175);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar-btn:hover, .sidebar-btn.active {
          background-color: rgb(79, 70, 229);
          color: #fff;
        }
      `}</style>

      <div
        style={{
          width: "260px",
          minHeight: "100vh",
          backgroundColor: "rgb(15, 23, 42)",
          color: "#fff",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "800",
              marginBottom: "8px",
              color: "#fff",
              paddingLeft: "10px",
            }}
          >
            Vendor Panel
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: "rgb(156, 163, 175)",
              marginBottom: "35px",
              paddingLeft: "10px",
            }}
          >
            Welcome, {userInfo.name}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              className={`sidebar-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              📊 Dashboard
            </button>
            <button
              className={`sidebar-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              📦 My Products ({products.length})
            </button>
            <button
              className={`sidebar-btn ${activeTab === "add-product" ? "active" : ""}`}
              onClick={() => setActiveTab("add-product")}
            >
              ➕ Add Product
            </button>
            <button
              className={`sidebar-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              🛒 Customer Orders ({orders.length})
            </button>
          </div>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "rgb(79, 70, 229)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            }}
          >
            ⬅️ Back to Website
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "40px",
          overflowY: "auto",
          width: "calc(100% - 260px)",
        }}
      >
        {activeTab === "overview" && (
          <div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "rgb(17, 24, 39)",
                marginBottom: "25px",
              }}
            >
              Dashboard Overview
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "25px",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
                  border: "1px solid rgb(229, 231, 235)",
                }}
              >
                <h3
                  style={{
                    color: "rgb(107, 114, 128)",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  Total Products Added
                </h3>
                <p
                  style={{
                    color: "rgb(79, 70, 229)",
                    fontSize: "36px",
                    fontWeight: "800",
                  }}
                >
                  {products.length}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
                  border: "1px solid rgb(229, 231, 235)",
                }}
              >
                <h3
                  style={{
                    color: "rgb(107, 114, 128)",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  Total Orders Received
                </h3>
                <p
                  style={{
                    color: "rgb(245, 158, 11)",
                    fontSize: "36px",
                    fontWeight: "800",
                  }}
                >
                  {totalOrdersCount}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "30px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
                  border: "1px solid rgb(229, 231, 235)",
                }}
              >
                <h3
                  style={{
                    color: "rgb(107, 114, 128)",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  My Earnings
                </h3>
                <p
                  style={{
                    color: "rgb(16, 185, 129)",
                    fontSize: "36px",
                    fontWeight: "800",
                  }}
                >
                  ₹{totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "800",
                  color: "rgb(17, 24, 39)",
                }}
              >
                My Uploaded Products
              </h2>
              <button
                onClick={() => setActiveTab("add-product")}
                style={{
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                + Add New Product
              </button>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
                border: "1px solid rgb(229, 231, 235)",
              }}
            >
              {products.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "rgb(107, 114, 128)",
                    padding: "30px",
                  }}
                >
                  You haven't added any products yet.
                </p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={`http://localhost:5000${item.image}`}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              fontWeight: "600",
                              color: "rgb(17, 24, 39)",
                            }}
                          >
                            {item.name}
                          </td>
                          <td style={{ color: "rgb(75, 85, 99)" }}>
                            {item.category}
                          </td>
                          <td
                            style={{
                              fontWeight: "bold",
                              color: "rgb(225, 29, 72)",
                            }}
                          >
                            ₹{item.price}
                          </td>
                          <td style={{ color: "rgb(75, 85, 99)" }}>
                            {item.stock}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              title="Delete"
                              onClick={() => deleteHandler(item._id)}
                              style={{
                                backgroundColor: "rgb(254, 226, 226)",
                                color: "rgb(225, 29, 72)",
                                border: "none",
                                width: "36px",
                                height: "36px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "15px",
                              }}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "add-product" && (
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              margin: "0 auto",
              backgroundColor: "#fff",
              padding: "40px",
              borderRadius: "16px",
              border: "1px solid rgb(229, 231, 235)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "rgb(17, 24, 39)",
                marginBottom: "25px",
              }}
            >
              Add New Product
            </h2>
            <form onSubmit={addProductSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(55, 65, 81)",
                  }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "rgb(55, 65, 81)",
                    }}
                  >
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid rgb(209, 213, 219)",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "rgb(55, 65, 81)",
                    }}
                  >
                    Stock Qty
                  </label>
                  <input
                    type="number"
                    placeholder="Enter stock quantity"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid rgb(209, 213, 219)",
                      borderRadius: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(55, 65, 81)",
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electronics, Fashion"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(55, 65, 81)",
                  }}
                >
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "rgb(55, 65, 81)",
                  }}
                >
                  Product Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  background:
                    "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                Publish Product
              </button>
            </form>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "800",
                color: "rgb(17, 24, 39)",
                marginBottom: "25px",
              }}
            >
              Customer Orders for My Products
            </h2>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
                border: "1px solid rgb(229, 231, 235)",
              }}
            >
              {orders.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "rgb(107, 114, 128)",
                    padding: "30px",
                  }}
                >
                  No customer orders found yet.
                </p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Items (My Products)</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord._id}>
                          <td
                            style={{
                              fontSize: "13px",
                              color: "rgb(107, 114, 128)",
                            }}
                          >
                            {ord.createdAt?.substring(0, 10)}
                          </td>
                          <td
                            style={{
                              fontWeight: "600",
                              color: "rgb(17, 24, 39)",
                            }}
                          >
                            {ord.user?.name || "Customer"}
                            <br />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "rgb(107, 114, 128)",
                                fontWeight: "normal",
                              }}
                            >
                              {ord.user?.email}
                            </span>
                          </td>
                          <td>
                            {ord.orderItems
                              ?.filter((i) => {
                                const pId = i.product?._id || i.product;
                                return products
                                  .map((p) => p._id.toString())
                                  .includes(pId?.toString());
                              })
                              .map((i, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    fontSize: "13px",
                                    color: "rgb(55, 65, 81)",
                                    marginBottom: "4px",
                                  }}
                                >
                                  • {i.name} - Qty: {i.qty} (₹{i.price})
                                </div>
                              ))}
                          </td>
                          <td>
                            <span
                              style={{
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                backgroundColor: ord.isPaid
                                  ? "rgb(212, 237, 218)"
                                  : "rgb(255, 243, 205)",
                                color: ord.isPaid
                                  ? "rgb(21, 87, 36)"
                                  : "rgb(133, 100, 4)",
                              }}
                            >
                              {ord.isPaid ? "Paid" : "Pending COD"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
