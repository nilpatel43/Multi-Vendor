import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "https://multi-vendor-wmbb.onrender.com/api/auth/register",
        { name, email, password, phone, address, role },
        config,
      );
      localStorage.setItem("userInfo", JSON.stringify(data));

      if (redirect) {
        navigate(`/${redirect}`);
      } else if (data.role === "admin") {
        navigate("/admin");
      } else {
        // Customer ane Vendor banne register thai ne website (Home) par j aavse
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        minHeight: "85vh",
        backgroundColor: "rgb(243, 244, 246)",
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
          padding: "35px 40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          width: "100%",
          maxWidth: "750px",
          border: "1px solid rgb(229, 231, 235)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "rgb(17, 24, 39)",
            marginBottom: "25px",
            fontSize: "26px",
            fontWeight: "800",
          }}
        >
          Create an Account
        </h2>
        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "600",
              borderRadius: "8px",
              backgroundColor: "rgb(254, 226, 226)",
              color: "rgb(185, 28, 28)",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={submitHandler}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
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
                    padding: "11px 14px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Phone Number (10 digits)
                </label>
                <input
                  type="text"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength="10"
                  required
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
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
                    padding: "11px 14px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Register As
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                >
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Super Admin</option>
                </select>
              </div>
              <div style={{ marginBottom: "18px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    color: "rgb(55, 65, 81)",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Address
                </label>
                <textarea
                  rows="2"
                  placeholder="Enter your complete address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                />
              </div>
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
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              marginTop: "10px",
            }}
          >
            Register Account
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
          Already have an account?{" "}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            style={{
              color: "rgb(79, 70, 229)",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
