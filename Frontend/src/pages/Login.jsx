import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // ૧. CartContext ઈમ્પોર્ટ કર્યું

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { fetchCartFromDB } = useCart(); // ૨. fetchCartFromDB મેળવ્યું

  const redirect = new URLSearchParams(location.search).get("redirect");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "https://multi-vendor-1.onrender.com/api/auth/login",
        { email, password },
        config,
      );
      localStorage.setItem("userInfo", JSON.stringify(data));

      // ૩. લોગિન સફળ થયા પછી તરત જ ડેટાબેઝમાંથી કાર્ટ ફેચ કરો
      await fetchCartFromDB();

      if (redirect) {
        navigate(`/${redirect}`);
      } else if (data.role === "admin") {
        navigate("/admin");
      } else {
        // Customer ane Vendor banne login thai ne website (Home) par j aavse
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
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
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          width: "100%",
          maxWidth: "420px",
          border: "1px solid rgb(229, 231, 235)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "rgb(17, 24, 39)",
            marginBottom: "25px",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Login to Your Account
        </h2>
        {error && (
          <div
            style={{
              color: "rgb(255, 0, 0)",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={submitHandler}>
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
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "rgb(107, 114, 128)",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            style={{
              color: "rgb(79, 70, 229)",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
