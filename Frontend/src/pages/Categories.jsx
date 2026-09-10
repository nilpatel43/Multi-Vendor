import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { API_URL } from "../api";
import { useCart } from "../context/CartContext";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
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

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <div
      style={{
        minHeight: "60vh",
        paddingBottom: "50px",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-card-hover {
          transition: all 0.3s ease;
        }
        .cat-card-hover:hover {
          transform: translateY(-8px);
          background-color: rgb(79, 70, 229) !important;
          color: #fff !important;
          box-shadow: 0 15px 25px -5px rgba(79, 70, 229, 0.3);
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
          Shop By Categories
        </h2>
        <p
          style={{
            color: "rgb(100, 100, 100)",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          Explore our wide range of collections and find exactly what you're
          looking for.
        </p>
      </div>

      {loading ? (
        <h3 style={{ padding: "20px 40px" }}>Loading categories...</h3>
      ) : (
        <>
          <div
            className="categories-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "25px",
              padding: "0 40px",
            }}
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className="cat-card-hover"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedCategory === cat ? "rgb(79, 70, 229)" : "#fff",
                  color: selectedCategory === cat ? "#fff" : "rgb(35, 47, 62)",
                  padding: "35px 20px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  border: "1px solid rgb(229, 231, 235)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                }}
              >
                {cat}
              </div>
            ))}
          </div>

          {selectedCategory && (
            <div style={{ marginTop: "50px" }}>
              <div
                style={{
                  borderTop: "1px solid rgb(230, 230, 230)",
                  paddingTop: "30px",
                  paddingLeft: "40px",
                }}
              >
                <h2 style={{ fontSize: "22px" }}>
                  Products in "{selectedCategory}"
                </h2>
              </div>

              {filteredProducts.length === 0 ? (
                <p style={{ padding: "20px 40px" }}>
                  No products found in this category.
                </p>
              ) : (
                <div
                  className="product-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "25px",
                    padding: "0 40px",
                    marginTop: "20px",
                  }}
                >
                  {filteredProducts.map((item) => (
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
                            {item.vendor?.shopName ||
                              item.vendor?.name ||
                              "MegaStore"}
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
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
