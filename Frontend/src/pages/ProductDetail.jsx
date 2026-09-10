import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQty = () => {
    if (qty < (product.stock || 10)) setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  // Navu logic: Cart ma add karya pachi login check karo
  const addToCartHandler = () => {
    addToCart(product, qty);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login?redirect=cart");
    } else {
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px",
          color: "rgb(107, 114, 128)",
          fontSize: "18px",
        }}
      >
        Loading product details...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "rgb(243, 244, 246)",
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
          maxWidth: "1200px",
          margin: "0 auto 20px auto",
          fontSize: "14px",
          color: "rgb(107, 114, 128)",
        }}
      >
        <Link
          to="/"
          style={{ color: "rgb(79, 70, 229)", textDecoration: "none" }}
        >
          Home
        </Link>{" "}
        &rsaquo;
        <Link
          to="/products"
          style={{
            color: "rgb(79, 70, 229)",
            textDecoration: "none",
            marginLeft: "5px",
          }}
        >
          Products
        </Link>{" "}
        &rsaquo;
        <span style={{ marginLeft: "5px", color: "rgb(17, 24, 39)" }}>
          {product.name}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          padding: "40px",
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgb(229, 231, 235)",
          maxWidth: "1200px",
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(243, 244, 246)",
            borderRadius: "12px",
            overflow: "hidden",
            height: "400px",
          }}
        >
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <div
          style={{
            flex: "1.2",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              color: "rgb(17, 24, 39)",
              marginBottom: "10px",
              fontWeight: "700",
            }}
          >
            {product.name}
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "rgb(107, 114, 128)",
              marginBottom: "20px",
            }}
          >
            Category:{" "}
            <span style={{ color: "rgb(79, 70, 229)", fontWeight: "600" }}>
              {product.category}
            </span>{" "}
            | Sold by:{" "}
            <span style={{ color: "rgb(17, 24, 39)", fontWeight: "600" }}>
              {product.vendor?.name || "MegaStore"}
            </span>
          </p>
          <div
            style={{
              fontSize: "30px",
              fontWeight: "800",
              color: "rgb(225, 29, 72)",
              marginBottom: "20px",
            }}
          >
            ₹{product.price}
          </div>
          <p
            style={{
              fontSize: "15px",
              color: "rgb(75, 85, 99)",
              lineHeight: "1.6",
              marginBottom: "25px",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              borderTop: "1px solid rgb(229, 231, 235)",
              paddingTop: "20px",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color:
                  product.stock > 0 ? "rgb(16, 185, 129)" : "rgb(239, 68, 68)",
                marginBottom: "15px",
              }}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "rgb(55, 65, 81)",
                }}
              >
                Quantity:
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgb(209, 213, 219)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "rgb(255, 255, 255)",
                }}
              >
                <button
                  onClick={decreaseQty}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "rgb(243, 244, 246)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    padding: "8px 20px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={increaseQty}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "rgb(243, 244, 246)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={addToCartHandler}
              style={{
                width: "100%",
                padding: "14px",
                background:
                  "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Add to Cart & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
