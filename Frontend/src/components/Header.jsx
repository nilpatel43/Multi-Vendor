import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api, { API_URL } from "../api";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems } = useCart();
  const [keyword, setKeyword] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products for search");
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim()) {
      const searchLower = value.toLowerCase();
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          (p.description && p.description.toLowerCase().includes(searchLower)),
      );
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    setMobileMenuOpen(false);
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  const totalCartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header
      style={{
        background: "linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59))",
        color: "rgb(255, 255, 255)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        animation: "fadeInHeader 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeInHeader {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .header-link-hover:hover {
          color: rgb(129, 140, 248) !important;
          transform: translateY(-1px);
        }
        .nav-links a.active {
          color: rgb(129, 140, 248) !important; 
        }

        .mobile-only-controls { display: none !important; }
        .desktop-actions { display: flex !important; }
        .mobile-dropdown-menu { display: none; }

        @media (max-width: 768px) {
          .desktop-actions { display: none !important; }
          .mobile-only-controls { display: flex !important; align-items: center; gap: 10px; }
          .header-top {
            padding: 12px 15px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .header-main-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .search-bar {
            width: 100% !important;
            flex: unset !important;
          }
          .mobile-dropdown-menu.open {
            display: flex !important;
            flex-direction: column;
            gap: 10px;
            background-color: rgb(30, 41, 59);
            padding: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>

      <div
        className="header-top"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 40px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          className="header-main-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link
              to="/"
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "rgb(255, 255, 255)",
                textDecoration: "none",
              }}
            >
              MegaStore
            </Link>
          </div>

          <div className="mobile-only-controls">
            <Link
              to="/cart"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "6px 10px",
                borderRadius: "8px",
                color: "rgb(255, 255, 255)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              🛒
              {totalCartQty > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    backgroundColor: "rgb(225, 29, 72)",
                    color: "rgb(255, 255, 255)",
                    fontSize: "9px",
                    fontWeight: "bold",
                    padding: "1px 4px",
                    borderRadius: "50%",
                    border: "2px solid rgb(15, 23, 42)",
                  }}
                >
                  {totalCartQty}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        <div
          className="search-bar"
          style={{
            display: "flex",
            flex: "0.55",
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          <form
            onSubmit={submitHandler}
            style={{ display: "flex", width: "100%" }}
          >
            <input
              type="text"
              placeholder="Search products, categories..."
              value={keyword}
              onChange={handleSearchChange}
              onFocus={() => keyword.trim() && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 250)}
              style={{
                width: "100%",
                padding: "12px 18px",
                fontSize: "15px",
                border: "none",
                outline: "none",
                color: "rgb(17, 24, 39)",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 24px",
                background:
                  "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
                border: "none",
                color: "rgb(255, 255, 255)",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(229, 231, 235)",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                zIndex: 1000,
                maxHeight: "350px",
                overflowY: "auto",
              }}
            >
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    to={`/product/${item._id}`}
                    key={item._id}
                    onClick={() => setShowDropdown(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "10px 15px",
                      borderBottom: "1px solid rgb(243, 244, 246)",
                      textDecoration: "none",
                      color: "rgb(17, 24, 39)",
                    }}
                  >
                    <img
                      src={`${API_URL}${item.image}`}
                      alt={item.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px" }}>
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "rgb(107, 114, 128)",
                        }}
                      >
                        In {item.category} •{" "}
                        <span
                          style={{
                            color: "rgb(225, 29, 72)",
                            fontWeight: "bold",
                          }}
                        >
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div
                  style={{
                    padding: "15px",
                    textAlign: "center",
                    color: "rgb(107, 114, 128)",
                    fontSize: "14px",
                  }}
                >
                  No products found matching "{keyword}"
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="desktop-actions"
          style={{ display: "flex", gap: "15px", alignItems: "center" }}
        >
          {userInfo ? (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {userInfo.role === "vendor" ? (
                <Link
                  to="/profile"
                  className="header-link-hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(30, 58, 138, 0.6)",
                    border: "1px solid rgb(59, 130, 246)",
                    padding: "8px 16px",
                    borderRadius: "30px",
                    color: "rgb(255, 255, 255)",
                    fontWeight: "600",
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>👤</span>
                  <span>{userInfo.shopName || userInfo.name}</span>
                </Link>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(30, 58, 138, 0.6)",
                    border: "1px solid rgb(59, 130, 246)",
                    padding: "8px 16px",
                    borderRadius: "30px",
                    color: "rgb(255, 255, 255)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  <span>👤</span>
                  <span>{userInfo.name}</span>
                </div>
              )}

              {userInfo.role === "vendor" && (
                <Link
                  to="/vendor"
                  className="header-link-hover"
                  style={{
                    color: "rgb(245, 158, 11)",
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "14px",
                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                    padding: "8px 14px",
                    borderRadius: "30px",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                  }}
                >
                  📊 Dashboard
                </Link>
              )}

              {userInfo.role === "admin" && (
                <Link
                  to="/admin"
                  className="header-link-hover"
                  style={{
                    color: "rgb(245, 158, 11)",
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  Admin
                </Link>
              )}

              {userInfo.role === "customer" && (
                <Link
                  to="/my-orders"
                  className="header-link-hover"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "rgb(255, 255, 255)",
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "14px",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    padding: "8px 14px",
                    borderRadius: "30px",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                  }}
                >
                  <span>📦</span> My Orders
                </Link>
              )}

              <button
                onClick={logoutHandler}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgb(239, 68, 68)",
                  color: "rgb(255, 255, 255)",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "30px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                  transition: "0.2s",
                }}
              >
                <span>🚪</span> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="header-link-hover"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                border: "1px solid rgb(129, 140, 248)",
                color: "rgb(255, 255, 255)",
                padding: "8px 18px",
                borderRadius: "30px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <span>👤</span> Login / Register
            </Link>
          )}

          <Link
            to="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "10px 14px",
              borderRadius: "10px",
              color: "rgb(255, 255, 255)",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            🛒
            {totalCartQty > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  backgroundColor: "rgb(225, 29, 72)",
                  color: "rgb(255, 255, 255)",
                  fontSize: "11px",
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  border: "2px solid rgb(15, 23, 42)",
                }}
              >
                {totalCartQty}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className={`mobile-dropdown-menu ${mobileMenuOpen ? "open" : ""}`}>
        {userInfo ? (
          <>
            {userInfo.role === "vendor" ? (
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                  padding: "6px 0",
                }}
              >
                👤 {userInfo.shopName || userInfo.name}
              </Link>
            ) : (
              <div
                style={{ color: "#fff", fontSize: "14px", padding: "6px 0" }}
              >
                👤 {userInfo.name}
              </div>
            )}
            {userInfo.role === "customer" && (
              <Link
                to="/my-orders"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#10b981",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "6px 0",
                }}
              >
                📦 My Orders
              </Link>
            )}
            {userInfo.role === "vendor" && (
              <Link
                to="/vendor"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#f59e0b",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "6px 0",
                }}
              >
                📊 Dashboard
              </Link>
            )}
            {userInfo.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#f59e0b",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "6px 0",
                }}
              >
                ⚙️ Admin Dashboard
              </Link>
            )}
            <button
              onClick={logoutHandler}
              style={{
                backgroundColor: "rgb(239, 68, 68)",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "5px",
                textAlign: "left",
              }}
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              backgroundColor: "rgb(79, 70, 229)",
              color: "#fff",
              padding: "10px",
              textAlign: "center",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login / Register
          </Link>
        )}
      </div>

      <nav
        className="nav-links"
        style={{
          display: "flex",
          padding: "12px 40px",
          backgroundColor: "rgb(30, 41, 59)",
          gap: "30px",
        }}
      >
        <NavLink
          to="/"
          className="header-link-hover"
          style={{
            color: "rgb(209, 213, 219)",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            transition: "0.2s",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className="header-link-hover"
          style={{
            color: "rgb(209, 213, 219)",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            transition: "0.2s",
          }}
        >
          All Products
        </NavLink>
        <NavLink
          to="/categories"
          className="header-link-hover"
          style={{
            color: "rgb(209, 213, 219)",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            transition: "0.2s",
          }}
        >
          Categories
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
