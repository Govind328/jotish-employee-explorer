
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  function submit(e) {
    e.preventDefault();
    if (user === "testuser" && pass === "Test123") {
      onLogin && onLogin();
      nav("/list");
    } else {
      setErr("Invalid credentials — use testuser / Test123");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6f8" }}>
      <form
        onSubmit={submit}
        style={{
          width: 340,
          padding: 28,
          borderRadius: 14,
          background: "#fff",
          border: "none",
          boxShadow: "0 6px 24px rgba(80,105,130,0.10)"
        }}
      >
        <h2 style={{
          marginBottom: 24,
          textAlign: "center",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: 0.15,
        }}>
          Jotish — Employee Explorer Login
        </h2>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Username</label>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          placeholder="Username"
          style={{
            width: "100%",
            marginBottom: 16,
            padding: "10px 12px",
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
        <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Password</label>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <input
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Password"
            type={showPass ? "text" : "password"}
            style={{
              flex: 1,
              padding: "10px 12px",
              fontSize: 16,
              borderRadius: 6,
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{ marginLeft: 6, fontSize: 15, background: "none", border: "none", cursor: "pointer" }}
            tabIndex={-1}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button type="submit" style={{
            flex: 1,
            background: "#156eff",
            color: "#fff",
            padding: "10px 0",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Sign in
          </button>
          <button
            type="button"
            onClick={() => { setUser("testuser"); setPass("Test123"); }}
            style={{
              flex: 1,
              background: "#eee",
              color: "#222",
              padding: "10px 0",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Fill Demo
          </button>
        </div>
        {err && <div style={{ color: "crimson", fontSize: 13, textAlign: "center" }}>{err}</div>}
      </form>
    </div>
  );
}
