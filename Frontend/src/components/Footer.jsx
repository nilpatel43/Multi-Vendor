import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "rgb(15, 23, 42)",
        color: "rgb(255, 255, 255)",
        marginTop: "auto",
        animation: "fadeInFooter 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes fadeInFooter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .footer-link-hover:hover {
          color: rgb(255, 255, 255) !important;
        }
      `}</style>
      <div
        className="footer-content"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
          padding: "50px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "18px",
              marginBottom: "18px",
              color: "rgb(129, 140, 248)",
            }}
          >
            MegaStore
          </h3>
          <p
            style={{
              color: "rgb(156, 163, 175)",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your ultimate multi-vendor marketplace. Get the best quality
            products at the best prices, directly from top sellers.
          </p>
        </div>
        <div>
          <h3
            style={{
              fontSize: "18px",
              marginBottom: "18px",
              color: "rgb(129, 140, 248)",
            }}
          >
            Quick Links
          </h3>
          <ul style={{ listStyle: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/"
                className="footer-link-hover"
                style={{
                  color: "rgb(156, 163, 175)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
              >
                Home
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/products"
                className="footer-link-hover"
                style={{
                  color: "rgb(156, 163, 175)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
              >
                Shop Now
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/vendor"
                className="footer-link-hover"
                style={{
                  color: "rgb(156, 163, 175)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
              >
                Vendor Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3
            style={{
              fontSize: "18px",
              marginBottom: "18px",
              color: "rgb(129, 140, 248)",
            }}
          >
            Customer Support
          </h3>
          <ul style={{ listStyle: "none" }}>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/contact"
                className="footer-link-hover"
                style={{
                  color: "rgb(156, 163, 175)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
              >
                Contact Us
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/faq"
                className="footer-link-hover"
                style={{
                  color: "rgb(156, 163, 175)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
              >
                FAQ & Help
              </Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link
                to="/returns"
                className="footer-link-hover"
                style={{
                  color: "rgb(156, 163, 175)",
                  textDecoration: "none",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
              >
                Return Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "rgb(2, 6, 23)",
          color: "rgb(100, 116, 139)",
          fontSize: "13px",
        }}
      >
        <p>© 2026 MegaStore Multi-Vendor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
