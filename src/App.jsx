
import React, { useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import List from './components/List'
import Details from './components/Details'
import PhotoResult from './components/PhotoResult'
import ChartPage from './components/ChartPage'
import MapPage from './components/MapPage'

function Navigation({ isLoggedIn, onLogout }) {
  const location = useLocation();
  return (
    <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {isLoggedIn ? (
        <>
          <Link
            to="/list"
            style={{
              display: "inline-block",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 16.3,
              borderRadius: 7,
              padding: "9px 20px",
              background: location.pathname.startsWith("/list") ? "linear-gradient(92deg,#1976d2 0%,#42a1ec 110%)" : "rgba(255,255,255,0.06)",
              color: location.pathname.startsWith("/list") ? "#fff" : "#d5e8ef",
              boxShadow: location.pathname.startsWith("/list") ? "0 3px 16px 0 #4fb1fe33" : undefined,
              transition: "all 0.15s"
            }}
          >
            Employees
          </Link>
          <Link
            to="/chart"
            style={{
              display: "inline-block",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 16.3,
              borderRadius: 7,
              padding: "9px 20px",
              background: location.pathname === "/chart" ? "linear-gradient(92deg,#1976d2 0%,#42a1ec 110%)" : "rgba(255,255,255,0.06)",
              color: location.pathname === "/chart" ? "#fff" : "#d5e8ef",
              boxShadow: location.pathname === "/chart" ? "0 3px 16px 0 #4fb1fe33" : undefined,
              transition: "all 0.15s"
            }}
          >
            Charts
          </Link>
          <Link
            to="/map"
            style={{
              display: "inline-block",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 16.3,
              borderRadius: 7,
              padding: "9px 20px",
              background: location.pathname === "/map" ? "linear-gradient(92deg,#1976d2 0%,#42a1ec 110%)" : "rgba(255,255,255,0.06)",
              color: location.pathname === "/map" ? "#fff" : "#d5e8ef",
              boxShadow: location.pathname === "/map" ? "0 3px 16px 0 #4fb1fe33" : undefined,
              transition: "all 0.15s"
            }}
          >
            Map
          </Link>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 20px",
              background: "#ef4444",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 7,
              marginLeft: 6,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px #fd8f8f33",
              transition: "background 0.16s"
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/"
          style={{
            display: "inline-block",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 16.3,
            borderRadius: 7,
            padding: "9px 20px",
            color: "#fff",
            background: "linear-gradient(92deg,#1976d2 0%,#42a1ec 110%)"
          }}
        >
          Login
        </Link>
      )}
    </nav>
  );
}

function PrivateRoute({ isLoggedIn, children }) {
  const location = useLocation();
  if (!isLoggedIn) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f3f7fa" }}>
      {/* Header */}
      <header style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "linear-gradient(90deg,#106792 0%,#379dde 100%)",
        boxShadow: "0 4px 24px 0 rgba(40,57,90,0.11)"
      }}>
        <div style={{
          margin: "0 auto",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 68
        }}>
          <span style={{
            fontWeight: 800,
            fontSize: 25,
            letterSpacing: 0.04,
            color: "#fff",
            userSelect: "none"
          }}>
            <span role="img" aria-label="logo" style={{ fontSize: 20, marginRight: 6 }}>✨</span>
            Jotish — Employee Explorer
          </span>
          <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </div>
      </header>

      
      <main style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "98px 24px 40px 24px", 
        minHeight: "81vh",
        boxSizing: "border-box",
        width: "100%",
      }}>
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/list"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <List />
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Details />
              </PrivateRoute>
            }
          />
          <Route
            path="/photo-result"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <PhotoResult />
              </PrivateRoute>
            }
          />
          <Route
            path="/chart"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <ChartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <MapPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      
    </div>
  );
}
