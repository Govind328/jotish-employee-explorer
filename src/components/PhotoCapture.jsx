import React, { useRef, useState, useEffect } from 'react';

export default function PhotoCapture({ onPhoto }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [stream, setStream] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function start() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (e) {
        setErr('Camera access denied or unavailable.');
      }
    }
    start();
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [stream]);

  function take() {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0, c.width, c.height);
    const dataUrl = c.toDataURL('image/png');
    onPhoto(dataUrl);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: "center",
      padding: 14
    }}>
      {err && (
        <div style={{
          color: '#ca2c2c',
          background: "#f8d7da",
          padding: "8px 16px",
          borderRadius: 8,
          fontSize: 15,
          marginBottom: 4
        }}>{err}</div>
      )}
      <div style={{
        display: 'flex',
        gap: 18,
        alignItems: 'center'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: 320,
            height: 220,
            borderRadius: 10,
            background: '#222',
            boxShadow: "0 2px 16px #22404418"
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <button
            type="button"
            onClick={take}
            style={{
              padding: "10px 28px",
              borderRadius: 7,
              border: "none",
              background: "#1976d2",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              transition: "background 0.12s"
            }}
          >
            Capture
          </button>
        </div>
      </div>
    </div>
  );
}
