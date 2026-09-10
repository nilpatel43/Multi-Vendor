import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [navigate, userInfo]);

  const fetchUsers = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(
        "https://multi-vendor-wmbb.onrender.com/api/users",
        config,
      );
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users");
      setLoading(false);
    }
  };

  const deleteHandler = async (id, name, role) => {
    if (window.confirm(`Are you sure you want to remove ${role}: ${name}?`)) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        await axios.delete(`https://multi-vendor-wmbb.onrender.com/api/users/${id}`, config);
        alert("Removed successfully!");
        fetchUsers();
      } catch (error) {
        alert("Error removing user");
      }
    }
  };

  const editHandler = (name, role) => {
    alert(`Edit feature for ${role}: ${name}`);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (loading)
    return (
      <h2 style={{ textAlign: "center", padding: "50px" }}>
        Loading Admin Panel...
      </h2>
    );

  const vendors = users.filter((u) => u.role === "vendor");
  const customers = users.filter((u) => u.role === "customer");

  return (
    <div
      style={{
        backgroundColor: "rgb(243, 244, 246)",
        minHeight: "100vh",
        padding: "40px 20px",
        animation: "pageFadeIn 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            backgroundColor: "#fff",
            padding: "20px 30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
            border: "1px solid rgb(229, 231, 235)",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "26px",
                color: "rgb(17, 24, 39)",
                fontWeight: "700",
              }}
            >
              Super Admin Dashboard
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "rgb(107, 114, 128)",
                marginTop: "4px",
              }}
            >
              Manage all vendors and customers
            </p>
          </div>
          <button
            onClick={logoutHandler}
            style={{
              padding: "10px 20px",
              backgroundColor: "rgb(239, 68, 68)",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
              border: "1px solid rgb(229, 231, 235)",
            }}
          >
            <h3
              style={{
                color: "rgb(107, 114, 128)",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Total Vendors
            </h3>
            <p
              style={{
                color: "rgb(17, 24, 39)",
                fontSize: "32px",
                fontWeight: "800",
              }}
            >
              {vendors.length}
            </p>
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
            <h3
              style={{
                color: "rgb(107, 114, 128)",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Total Customers
            </h3>
            <p
              style={{
                color: "rgb(17, 24, 39)",
                fontSize: "32px",
                fontWeight: "800",
              }}
            >
              {customers.length}
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
            border: "1px solid rgb(229, 231, 235)",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              color: "rgb(17, 24, 39)",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Manage Vendors
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td style={{ fontWeight: "500" }}>{vendor.name}</td>
                    <td style={{ color: "rgb(107, 114, 128)" }}>
                      {vendor.email}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        title="Edit"
                        onClick={() => editHandler(vendor.name, "Vendor")}
                        style={{
                          backgroundColor: "rgb(238, 242, 255)",
                          color: "rgb(79, 70, 229)",
                          border: "none",
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "15px",
                          marginRight: "8px",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        title="Delete"
                        onClick={() =>
                          deleteHandler(vendor._id, vendor.name, "Vendor")
                        }
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
              color: "rgb(17, 24, 39)",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Manage Customers
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td style={{ fontWeight: "500" }}>{customer.name}</td>
                    <td style={{ color: "rgb(107, 114, 128)" }}>
                      {customer.email}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        title="Edit"
                        onClick={() => editHandler(customer.name, "Customer")}
                        style={{
                          backgroundColor: "rgb(238, 242, 255)",
                          color: "rgb(79, 70, 229)",
                          border: "none",
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "15px",
                          marginRight: "8px",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        title="Delete"
                        onClick={() =>
                          deleteHandler(customer._id, customer.name, "Customer")
                        }
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
