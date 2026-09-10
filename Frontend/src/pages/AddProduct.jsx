import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
        setIsError(true);
        setMessage("Please login first as a Vendor!");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.post("/api/products", formData, config);

      setIsError(false);
      setMessage("Product Added Successfully! Redirecting...");
      setTimeout(() => {
        navigate("/vendor");
      }, 1500);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(243, 244, 246)",
        minHeight: "100vh",
        padding: "50px 20px",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ maxWidth: "850px", margin: "0 auto" }}>
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
              fontSize: "28px",
              color: "rgb(17, 24, 39)",
              fontWeight: "800",
            }}
          >
            Add New Product
          </h2>
          <Link
            to="/vendor"
            style={{
              padding: "10px 20px",
              backgroundColor: "rgb(79, 70, 229)",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            }}
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgb(229, 231, 235)",
          }}
        >
          {message && (
            <div
              style={{
                padding: "14px",
                marginBottom: "25px",
                textAlign: "center",
                fontWeight: "600",
                borderRadius: "8px",
                backgroundColor: isError
                  ? "rgb(254, 226, 226)"
                  : "rgb(209, 250, 229)",
                color: isError ? "rgb(185, 28, 28)" : "rgb(6, 95, 70)",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "25px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
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
                    padding: "12px 16px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "15px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
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
                    background: "rgb(249, 250, 251)",
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
                  color: "rgb(55, 65, 81)",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Write a few lines about the product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "8px",
                  fontSize: "15px",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "15px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Electronics"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "15px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="Available qty"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "15px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
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
                color: "rgb(255, 255, 255)",
                marginTop: "10px",
              }}
            >
              Publish Product to Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
