import React, { useEffect, useState } from "react";
import { fetchTableData } from "../api";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";

export default function ChartPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTableData().then((res) => {
      const arr = res.Data || res;
      const firstTen = (arr || []).slice(0, 10).map((it, idx) => ({
        name: it.employee_name || it.name || `#${it.id || idx + 1}`,
        salary: Number(it.salary) || 0,
        age: Number(it.age) || 0,
      }));
      setData(firstTen);
    });
  }, []);

  const COLORS = ["#6366f1", "#0ea5e9", "#22c55e", "#facc15", "#f43f5e", "#8b5cf6"];

  return (
    <div style={{
      maxWidth: 1100,
      margin: "36px auto 0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 36,
    }}>
      <div style={{
        textAlign: "center",
        marginBottom: 4
      }}>
        <h2 style={{
          margin: "0 0 3px 0",
          fontWeight: 800,
          fontSize: 26,
          color: "#174976",
          letterSpacing: 0.2
        }}>Data Visualizations Dashboard</h2>
        <div style={{
          color: "#6b7792",
          fontWeight: 400,
          fontSize: 16.5
        }}>
          Salary and age distributions for the first 10 employees
        </div>
      </div>

      {/* Bar Chart */}
      <div style={chartCardStyle}>
        <h3 style={chartTitle}>Salaries Overview (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="salary"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div style={chartCardStyle}>
        <h3 style={chartTitle}>Salary vs Age (Line Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="salary" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="age" stroke="#f43f5e" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div style={chartCardStyle}>
        <h3 style={chartTitle}>Salary Distribution (Pie Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="salary"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ name, value }) => `${name}: ${value}`}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div style={chartCardStyle}>
        <h3 style={chartTitle}>Salary Growth (Area Chart)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="salary"
              stroke="#22c55e"
              fill="url(#areaGradient)"
              strokeWidth={3}
            />
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#bbf7d0" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Radial Bar Chart */}
      <div style={chartCardStyle}>
        <h3 style={chartTitle}>Salary Comparison (Radial Bar)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            barSize={15}
            data={data}
          >
            <RadialBar
              minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background
              clockWise
              dataKey="salary"
            />
            <Legend
              iconSize={12}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const chartCardStyle = {
  background: "#fff",
  border: "1.5px solid #ebeff4",
  borderRadius: 14,
  padding: "22px 24px 18px 24px",
  boxShadow: "0 4px 20px rgba(44,84,136,0.11)",
};

const chartTitle = {
  margin: "0 0 12px 0",
  fontWeight: 700,
  fontSize: 18,
  color: "#2056ab",
  letterSpacing: 0.08,
};
