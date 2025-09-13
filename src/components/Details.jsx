import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PhotoCapture from './PhotoCapture'

export default function Details() {
  const loc = useLocation();
  const nav = useNavigate();
  const { id } = useParams();
  const item = loc.state?.item || { id };

  return (
    <div style={{
      maxWidth: 500,
      margin: "32px auto",
      display: "flex",
      flexDirection: "column",
      gap: 28
    }}>
      {/* Employee Details Card */}
      <div style={{
        background: "#fff",
        border: "1.5px solid #ebeff4",
        borderRadius: 12,
        padding: "30px 24px",
        boxShadow: "0 4px 24px rgba(44,84,136,0.09)"
      }}>
        <h2 style={{
          marginBottom: 12,
          fontWeight: 700,
          fontSize: 22,
          color: "#174976"
        }}>
          Details — {item.employee_name || item.name || `#${id}`}
        </h2>
        <div style={{ marginBottom: 8, color: "#3d5677", fontSize: 16 }}>
          City: <b>{item.city || 'N/A'}</b>
        </div>
        <div style={{ marginBottom: 8, color: "#2a905e", fontSize: 16 }}>
          Salary: <b>₹{item.salary || '—'}</b>
        </div>
        <div style={{ color: "#585858", fontSize: 16 }}>
          Age: <b>{item.age || '—'}</b>
        </div>
      </div>

      {/* Photo Capture Card */}
      <div style={{
        background: "#fff",
        border: "1.5px solid #ebeff4",
        borderRadius: 12,
        padding: "26px 24px",
        boxShadow: "0 4px 24px rgba(44,84,136,0.09)"
      }}>
        <h3 style={{
          marginBottom: 14,
          fontWeight: 600,
          fontSize: 18,
          color: "#2056ab"
        }}>Capture Photo</h3>
        <PhotoCapture onPhoto={dataUrl => nav('/photo-result', { state: { image: dataUrl } })} />
      </div>
    </div>
  );
}
