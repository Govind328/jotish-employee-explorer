
import React, { useEffect, useState } from "react";
import { fetchTableData } from "../api";
import { Link } from "react-router-dom";

export default function List() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    let mounted = true;
    fetchTableData().then((res) => {
      if (!mounted) return;
      if (res && res.Data) setData(res.Data);
      else if (Array.isArray(res)) setData(res);
      else setError("Unexpected response format");
      setLoading(false);
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let temp = [...data];
    if (search.trim()) {
      temp = temp.filter(
        (it) =>
          (it.employee_name || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (it.city || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }
    if (sortBy === "salary") {
      temp.sort((a, b) => (Number(b.salary) || 0) - (Number(a.salary) || 0));
    } else if (sortBy === "age") {
      temp.sort((a, b) => (Number(b.age) || 0) - (Number(a.age) || 0));
    } else {
      temp.sort((a, b) =>
        (a.employee_name || "").localeCompare(b.employee_name || "")
      );
    }
    setFiltered(temp);
  }, [data, search, sortBy]);

  if (loading)
    return (
      <div
        style={{
          maxWidth: 420,
          margin: "48px auto",
          borderRadius: 12,
          background: "#fff",
          padding: "32px 22px",
          boxShadow: "0 8px 32px rgba(30,56,100,0.10)",
          textAlign: "center",
          fontSize: 17,
          color: "#223",
          border: "1px solid #ebeaf0",
        }}
      >
        Loading...
      </div>
    );
  if (error)
    return (
      <div
        style={{
          maxWidth: 420,
          margin: "48px auto",
          borderRadius: 12,
          background: "#fff",
          padding: "32px 22px",
          boxShadow: "0 8px 32px rgba(30,56,100,0.10)",
          textAlign: "center",
          fontSize: 17,
          color: "#c92a2a",
          border: "1px solid #ecbbbd",
        }}
      >
        Error: {error}
      </div>
    );

  return (
    <div style={{ maxWidth: 1160, margin: "30px auto 0 auto", padding: "0 6px" }}>
      {/* Controls Card */}
      <div
        style={{
          background: "#fff",
          border: "1.5px solid #ebeff4",
          borderRadius: 12,
          marginBottom: 24,
          boxShadow: "0 4px 24px rgba(44,84,136,0.07)",
          padding: "22px 24px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <h2 style={{ fontWeight: 800, fontSize: 22, color: "#1877bd" }}>Employees</h2>

          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or city..."
            style={{
              padding: "10px 16px",
              border: "1px solid #d7e4ef",
              borderRadius: 7,
              fontSize: 16,
              minWidth: 220,
              background: "#f8fbfd",
              color: "#19223f",
              outline: "none"
            }}
          />

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: "10px 12px",
              border: "1px solid #d7e4ef",
              borderRadius: 7,
              fontSize: 15,
              color: "#1877bd",
              minWidth: 135,
              background: "#f8fbfd"
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="salary">Sort by Salary</option>
            <option value="age">Sort by Age</option>
          </select>

          <div>
            <Link to="/chart">
              <button
                style={{
                  padding: "9px 17px",
                  borderRadius: 6,
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1.03rem",
                  cursor: "pointer",
                  marginRight: 8
                }}>
                Charts
              </button>
            </Link>
            <Link to="/map">
              <button
                style={{
                  padding: "9px 17px",
                  borderRadius: 6,
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1.03rem",
                  cursor: "pointer"
                }}>
                Map
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Employees grid */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "18px"
        }}
      >
        {filtered.map(item => (
          <div
            key={item.id}
            style={{
              borderLeft: "5px solid #1976d2",
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 4px 18px #b9e9ff10",
              padding: "22px 18px 16px 18px",
              fontSize: 15.6,
              transition: "transform 0.18s, box-shadow 0.18s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.033)";
              e.currentTarget.style.boxShadow = "0 8px 38px #b9e9ff27";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 18px #b9e9ff10";
            }}
          >
            <h3 style={{
              margin: "0 0 7px 0",
              fontWeight: 700,
              fontSize: 18,
              color: "#174976"
            }}>
              {item.employee_name || item.name || "—"}
            </h3>
            <div style={{ marginBottom: 3, color: "#4366a0" }}>
              City: <b>{item.city || "City N/A"}</b>
            </div>
            <div style={{ color: "#808da6", marginBottom: 2 }}>
              Salary: <b style={{ color: "#18a658" }}>₹{item.salary || "—"}</b>
            </div>
            <div style={{ color: "#818181" }}>
              Age: <b>{item.age || "—"}</b>
            </div>
            {Number(item.salary) > 60000 && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: 7,
                  padding: "5px 10px",
                  fontSize: "12px",
                  background: "#feefbe",
                  color: "#ad8500",
                  borderRadius: 7,
                  fontWeight: "bold",
                  letterSpacing: 0.15
                }}
              >
                Top Earner
              </span>
            )}
            <div style={{ marginTop: 14 }}>
              <Link to={`/details/${item.id}`} state={{ item }}>
                <button
                  style={{
                    padding: "8px 21px",
                    borderRadius: 6,
                    border: "none",
                    background: "#1976d2",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15.2,
                    cursor: "pointer"
                  }}>
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
