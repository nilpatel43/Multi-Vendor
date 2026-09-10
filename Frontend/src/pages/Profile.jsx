import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Vendor specific
  const [shopName, setShopName] = useState("");
  const [shopNumber, setShopNumber] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      navigate("/login");
    } else {
      setUserInfo(user);
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");

      if (user.role === "vendor") {
        setShopName(user.shopName || "");
        setShopNumber(user.shopNumber || "");
      }
    }
  }, [navigate]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const payload = {
        name,
        phone,
        address,
        ...(userInfo.role === "vendor" && { shopName, shopNumber }),
      };

      const { data } = await api.put(
        "/api/users/profile",
        payload,
        config,
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUserInfo(data);

      setMessage("Profile successfully updated in Database!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 20px",
        minHeight: "80vh",
        backgroundColor: "rgb(243, 244, 246)",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          width: "100%",
          maxWidth: "600px",
          border: "1px solid rgb(229, 231, 235)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: "rgb(17, 24, 39)",
            }}
          >
            My Profile
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "rgb(107, 114, 128)",
              marginTop: "5px",
            }}
          >
            Update your personal and address details
          </p>
        </div>

        {message && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              textAlign: "center",
              borderRadius: "8px",
              backgroundColor: "rgb(212, 237, 218)",
              color: "rgb(21, 87, 36)",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={updateProfileHandler}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                fontSize: "14px",
                color: "rgb(55, 65, 81)",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid rgb(209, 213, 219)",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                fontSize: "14px",
                color: "rgb(55, 65, 81)",
              }}
            >
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Your 10-digit phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid rgb(209, 213, 219)",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                fontSize: "14px",
                color: "rgb(55, 65, 81)",
              }}
            >
              Full Address
            </label>
            <textarea
              rows="3"
              placeholder="Enter your complete address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid rgb(209, 213, 219)",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Fkt Vendor mate j dekhase */}
          {userInfo.role === "vendor" && (
            <div
              style={{
                padding: "15px",
                backgroundColor: "rgb(249, 250, 251)",
                borderRadius: "8px",
                marginBottom: "25px",
                border: "1px dashed rgb(209, 213, 219)",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "15px",
                  color: "rgb(17, 24, 39)",
                }}
              >
                Shop Details
              </h3>

              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "rgb(55, 65, 81)",
                  }}
                >
                  Shop Name (Displays as 'Sold By')
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kishan Electronics"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
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
                    marginBottom: "6px",
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "rgb(55, 65, 81)",
                  }}
                >
                  Shop Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shop No. 14"
                  value={shopNumber}
                  onChange={(e) => setShopNumber(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid rgb(209, 213, 219)",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background:
                "linear-gradient(135deg, rgb(79, 70, 229), rgb(99, 102, 241))",
              color: "rgb(255, 255, 255)",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
            }}
          >
            Update Details to MongoDB
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
