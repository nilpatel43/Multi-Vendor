import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { API_URL } from "../api";
import { useCart } from "../context/CartContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login?redirect=cart");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div
      style={{
        paddingTop: "40px",
        minHeight: "70vh",
        paddingBottom: "50px",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .prod-card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .prod-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 25px -5px rgba(0,0,0,0.1);
        }
        .prod-card-hover:hover .prod-img {
          transform: scale(1.08);
        }
        .prod-img {
          transition: transform 0.5s ease;
        }
      `}</style>
      <div style={{ padding: "40px 40px 20px 40px" }}>
        <h2
          style={{
            fontSize: "26px",
            color: "rgb(17, 24, 39)",
            fontWeight: "700",
          }}
        >
          All Products Collection
        </h2>
        <p
          style={{
            color: "rgb(100, 100, 100)",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          Browse our complete catalog of high-quality products from top vendors.
        </p>
      </div>

      {loading ? (
        <h3 style={{ textAlign: "center", padding: "40px 0" }}>
          Loading products...
        </h3>
      ) : (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
            padding: "0 40px",
            marginTop: "30px",
          }}
        >
          {products.map((item) => (
            <div
              className="prod-card-hover"
              key={item._id}
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgb(229, 231, 235)",
              }}
            >
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "rgb(243, 244, 246)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`${API_URL}${item.image}`}
                    alt={item.name}
                    className="prod-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      color: "rgb(17, 24, 39)",
                      marginBottom: "6px",
                      fontWeight: "600",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgb(107, 114, 128)",
                      marginBottom: "12px",
                    }}
                  >
                    Sold by:{" "}
                    {item.vendor?.shopName || item.vendor?.name || "MegaStore"}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "rgb(225, 29, 72)",
                      marginBottom: "15px",
                    }}
                  >
                    ₹{item.price}
                  </p>
                </div>
              </Link>
              <div style={{ padding: "0 20px 20px 20px" }}>
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background:
                      "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
