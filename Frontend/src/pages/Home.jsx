import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { API_URL } from "../api";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        const trendingList = data.slice(-8).reverse();
        setProducts(trendingList);
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
      style={{ paddingBottom: "50px", animation: "pageFadeIn 0.4s ease-out" }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .home-card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .home-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 25px -5px rgba(0,0,0,0.1);
        }
        .home-card-hover:hover .prod-img {
          transform: scale(1.08);
        }
        .prod-img {
          transition: transform 0.5s ease;
        }
        .brand-card-hover {
          transition: all 0.3s ease;
        }
        .brand-card-hover:hover {
          transform: translateY(-5px);
          border-color: rgb(79, 70, 229) !important;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.15);
        }
        .popular-collections-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .popular-collections-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .popular-collections-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      {/* Hero Section (Custom Video Background) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          borderBottom: "1px solid rgb(229, 231, 235)",
          boxSizing: "border-box",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            zIndex: "-2",
            objectFit: "cover",
          }}
        >
          {/* Tame tamari video file public folder ma "hero-video.mp4" naame muki saksho */}
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(rgba(15, 23, 42, 0.78), rgba(30, 41, 59, 0.78))",
            zIndex: "-1",
          }}
        />

        <div style={{ maxWidth: "850px", margin: "0 auto", width: "100%", padding: "140px 20px", boxSizing: "border-box", zIndex: 1 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(79, 70, 229, 0.95)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "25px",
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "35px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            🔥 Discover Your World: Electronics, Furniture & Style 🔥
          </span>
          <h1
            style={{
              fontSize: "52px",
              color: "#ffffff",
              marginBottom: "25px",
              fontWeight: "800",
              lineHeight: "1.2",
              textShadow: "0 4px 12px rgba(0,0,0,0.6)",
            }}
          >
            MegaStore Exclusive Sale
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#cbd5e1",
              marginBottom: "45px",
              lineHeight: "1.6",
              textShadow: "0 2px 6px rgba(0,0,0,0.6)",
              maxWidth: "700px",
              margin: "0 auto 45px auto",
            }}
          >
            Connecting buyers and sellers. Explore top electronics, premium furniture, trendy apparel, and books delivered to your doorstep.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                padding: "16px 42px",
                fontSize: "17px",
                background:
                  "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                color: "rgb(255, 255, 255)",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 18px rgba(79, 70, 229, 0.6)",
              }}
              onClick={() => navigate("/products")}
            >
              🛍️ Start Shopping Now
            </button>
          </div>
        </div>
      </div>

      {/* Top Features Section */}
      <div
        className="features-section"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
          padding: "0 40px",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        <div
          className="home-card-hover"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            padding: "30px 20px",
            textAlign: "center",
            borderRadius: "12px",
            border: "1px solid rgb(229, 231, 235)",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>🚚</h3>
          <h3
            style={{
              color: "rgb(17, 24, 39)",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            Free Delivery
          </h3>
          <p style={{ color: "rgb(107, 114, 128)", fontSize: "14px" }}>
            On all orders above ₹500
          </p>
        </div>
        <div
          className="home-card-hover"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            padding: "30px 20px",
            textAlign: "center",
            borderRadius: "12px",
            border: "1px solid rgb(229, 231, 235)",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>🔒</h3>
          <h3
            style={{
              color: "rgb(17, 24, 39)",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            Secure Payment
          </h3>
          <p style={{ color: "rgb(107, 114, 128)", fontSize: "14px" }}>
            100% secure payment gateways
          </p>
        </div>
        <div
          className="home-card-hover"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            padding: "30px 20px",
            textAlign: "center",
            borderRadius: "12px",
            border: "1px solid rgb(229, 231, 235)",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>📞</h3>
          <h3
            style={{
              color: "rgb(17, 24, 39)",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            24/7 Support
          </h3>
          <p style={{ color: "rgb(107, 114, 128)", fontSize: "14px" }}>
            Dedicated support anytime
          </p>
        </div>
      </div>

      {/* Trending Products Section */}
      <div style={{ padding: "40px 40px 20px 40px" }}>
        <h2
          style={{
            fontSize: "26px",
            color: "rgb(17, 24, 39)",
            fontWeight: "700",
          }}
        >
          Trending Products
        </h2>
        <p
          style={{
            color: "rgb(100, 100, 100)",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          Handpicked latest items just for you. New additions automatically
          appear here!
        </p>
      </div>

      {loading ? (
        <h2 style={{ textAlign: "center", padding: "40px 0" }}>
          Loading trending products...
        </h2>
      ) : products.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>
          No products available.
        </p>
      ) : (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "25px",
            padding: "0 40px",
          }}
        >
          {products.map((item) => (
            <div
              className="home-card-hover"
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

      {/* --- Why Shop With Us બેનર --- */}
      <div style={{ width: "100%", margin: "70px 0 0 0", padding: "0 40px" }}>
        <div
          style={{
            backgroundColor: "rgb(15, 23, 42)",
            borderRadius: "16px",
            padding: "50px 40px",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ flex: "1", minWidth: "280px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                marginBottom: "12px",
                color: "rgb(129, 140, 248)",
              }}
            >
              Experience Smart Shopping with MegaStore
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "rgb(156, 163, 175)",
                lineHeight: "1.6",
              }}
            >
              We connect you directly with verified multi-vendors offering
              authentic products, lightning-fast delivery, and guaranteed
              customer satisfaction.
            </p>
          </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                minWidth: "130px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h4
                style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}
              >
                100%
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgb(156, 163, 175)",
                  marginTop: "4px",
                }}
              >
                Genuine Products
              </p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                minWidth: "130px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h4
                style={{ fontSize: "24px", fontWeight: "800", color: "#fff" }}
              >
                24/7
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgb(156, 163, 175)",
                  marginTop: "4px",
                }}
              >
                Active Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Popular Collections --- */}
      <div style={{ width: "100%", margin: "60px 0 0 0", padding: "0 20px", boxSizing: "border-box" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2
            style={{
              fontSize: "26px",
              color: "rgb(17, 24, 39)",
              fontWeight: "800",
            }}
          >
            Explore Popular Collections
          </h2>
          <p
            style={{
              color: "rgb(100, 100, 100)",
              marginTop: "8px",
              fontSize: "15px",
            }}
          >
            Shop from our top-rated categories handpicked for you.
          </p>
        </div>

        <div className="popular-collections-grid">
          <div
            onClick={() => navigate("/categories")}
            className="brand-card-hover"
            style={{
              backgroundColor: "#fff",
              padding: "25px 15px",
              borderRadius: "16px",
              border: "1px solid rgb(229, 231, 235)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📱</div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "rgb(17, 24, 39)",
                marginBottom: "4px",
              }}
            >
              Electronics
            </h3>
            <p style={{ fontSize: "12px", color: "rgb(107, 114, 128)" }}>
              Latest gadgets
            </p>
          </div>

          <div
            onClick={() => navigate("/categories")}
            className="brand-card-hover"
            style={{
              backgroundColor: "#fff",
              padding: "25px 15px",
              borderRadius: "16px",
              border: "1px solid rgb(229, 231, 235)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>👕</div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "rgb(17, 24, 39)",
                marginBottom: "4px",
              }}
            >
              Fashion
            </h3>
            <p style={{ fontSize: "12px", color: "rgb(107, 114, 128)" }}>
              Trendy styles
            </p>
          </div>

          <div
            onClick={() => navigate("/categories")}
            className="brand-card-hover"
            style={{
              backgroundColor: "#fff",
              padding: "25px 15px",
              borderRadius: "16px",
              border: "1px solid rgb(229, 231, 235)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🏡</div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "rgb(17, 24, 39)",
                marginBottom: "4px",
              }}
            >
              Home & Living
            </h3>
            <p style={{ fontSize: "12px", color: "rgb(107, 114, 128)" }}>
              Decor & essentials
            </p>
          </div>

          <div
            onClick={() => navigate("/categories")}
            className="brand-card-hover"
            style={{
              backgroundColor: "#fff",
              padding: "25px 15px",
              borderRadius: "16px",
              border: "1px solid rgb(229, 231, 235)",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚡</div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "rgb(17, 24, 39)",
                marginBottom: "4px",
              }}
            >
              Mega Deals
            </h3>
            <p style={{ fontSize: "12px", color: "rgb(107, 114, 128)" }}>
              Up to 50% off
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;