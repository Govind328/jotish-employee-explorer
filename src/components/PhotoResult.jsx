import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function PhotoResult() {
  const loc = useLocation();
  const nav = useNavigate();
  const img = loc.state?.image;

  if (!img)
    return (
      <div
        style={{
          maxWidth: 400,
          margin: "48px auto",
          borderRadius: 10,
          background: "#fff",
          padding: "36px 30px",
          boxShadow: "0 6px 28px rgba(30,56,100,0.07)",
          textAlign: "center",
          fontSize: 17,
          color: "#223",
          border: "1px solid #ebeaf0",
        }}
      >
        No image captured.
      </div>
    );

  const timestamp = new Date().toLocaleString();
  const sizeKB = Math.round((img.length * (3 / 4)) / 1024);

  function copyToClipboard() {
    fetch(img)
      .then((res) => res.blob())
      .then((blob) => {
        navigator.clipboard.write([
          new window.ClipboardItem({ [blob.type]: blob }),
        ]);
        alert("Image copied to clipboard!");
      })
      .catch(() => alert("Failed to copy image."));
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: 28,
        borderRadius: 12,
        border: "1.5px solid #ececec",
        maxWidth: 400,
        margin: "36px auto",
        background: "#fff",
        boxShadow: "0 8px 30px rgba(2,6,23,0.09)",
      }}
    >
      <h2
        style={{
          marginBottom: 18,
          fontWeight: 700,
          fontSize: 21,
          color: "#1976d2",
          letterSpacing: 0.3,
        }}
      >Your Captured Photo</h2>
      <img
        src={img}
        alt="captured"
        style={{
          maxWidth: "100%",
          borderRadius: 7,
          boxShadow: "0 3px 22px #a3bee914",
        }}
      />
      <p style={{ marginTop: 14, color: "#5b6474", fontSize: "0.97em" }}>
        Captured on: <b>{timestamp}</b> | Size: <b>{sizeKB} KB</b>
      </p>
      <div style={{
        marginTop: 22,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10
      }}>
        <a
          href={img}
          download="capture.png"
          style={{
            padding: "8px 20px",
            borderRadius: 6,
            background: "#eff3f8",
            border: "1px solid #deeaf6",
            cursor: "pointer",
            textDecoration: "none",
            color: "#183359",
            fontWeight: 500,
            fontSize: 15.4
          }}
        >Download</a>
        <button
          onClick={copyToClipboard}
          style={{
            padding: "8px 20px",
            borderRadius: 6,
            background: "#e0f9ea",
            border: "1px solid #aee9ce",
            cursor: "pointer",
            color: "#174022",
            fontWeight: 500,
            fontSize: 15.4
          }}
        >Copy</button>
        <button
          onClick={() => nav(-1)}
          style={{
            padding: "8px 20px",
            borderRadius: 6,
            background: "#fff8e1",
            border: "1px solid #faedcd",
            cursor: "pointer",
            color: "#594500",
            fontWeight: 500,
            fontSize: 15.4
          }}
        >Retake</button>
        <Link to="/list">
          <button
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              background: "#f1f0fd",
              border: "1px solid #e4e6fc",
              cursor: "pointer",
              color: "#30276b",
              fontWeight: 500,
              fontSize: 15.4
            }}
          >Back to List</button>
        </Link>
      </div>
    </div>
  );
}
