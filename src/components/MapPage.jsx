import React, { useEffect, useState } from "react";
import { fetchTableData } from "../api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;


const cityData = {
  mumbai: { coords: [19.076, 72.8777], name: "Mumbai" },
  delhi: { coords: [28.7041, 77.1025], name: "Delhi" },
  bengaluru: { coords: [12.9716, 77.5946], name: "Bengaluru" },
  kolkata: { coords: [22.5726, 88.3639], name: "Kolkata" },
  chennai: { coords: [13.0827, 80.2707], name: "Chennai" },
  hyderabad: { coords: [17.385, 78.4867], name: "Hyderabad" },
  pune: { coords: [18.5204, 73.8567], name: "Pune" },
  jaipur: { coords: [26.9124, 75.7873], name: "Jaipur" },
  ahmedabad: { coords: [23.0225, 72.5714], name: "Ahmedabad" },
};

const COLORS = ["#6366f1", "#0ea5e9", "#22c55e", "#facc15", "#f43f5e", "#8b5cf6"];

export default function MapPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTableData().then((res) => {
      const arr = res.Data || res;
      setData(arr || []);
    });
  }, []);

  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  const markers = data.map((it, idx) => {
    const cityKey = (it.city || it.location || "").toLowerCase().trim();
    const cityInfo = cityData[cityKey] || {
      coords: [20.5937, 78.9629],
      name: "Unknown City",
    };
    return { ...it, coords: cityInfo.coords, cityEnglish: cityInfo.name, color: COLORS[idx % COLORS.length] };
  });

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "38px auto",
        background: "#fff",
        borderRadius: 14,
        border: "1.5px solid #ebeff4",
        boxShadow: "0 8px 38px rgba(30,56,100,0.10)",
        padding: "32px 32px 26px 32px",
      }}
    >
      <h2 style={{
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 6,
        color: "#1976d2",
        letterSpacing: 0.13
      }}>
        Employee Map 
      </h2>
      <div style={{
        marginBottom: 18,
        color: "#426384",
        fontSize: 15.5,
        fontWeight: 400
      }}>
        Explore employee distribution across cities.
        <br />
        <span style={{ color: "#697e93" }}>
          <span style={{ background: "#faf1bc", padding: "1px 7px", borderRadius: 5 }}>
            Circle size = Salary
          </span>
        </span>
      </div>

      <div style={{
        height: 502,
        borderRadius: 13,
        overflow: "hidden",
        border: "1.2px solid #ecf2fa",
        background: "#f8fafc"
      }}>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="Light Mode">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </BaseLayer>
            <BaseLayer name="Dark Mode">
              <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            </BaseLayer>
          </LayersControl>

          {markers.map((m, i) => (
            <React.Fragment key={i}>
              <Marker position={m.coords}>
                <Popup>
                  <div style={{ minWidth: 160, fontSize: 15, color: "#174976" }}>
                    <div style={{ fontWeight: 600, fontSize: 15.5 }}>
                      {m.employee_name || m.name || "Person"}
                    </div>
                    <div>City: {m.cityEnglish}</div>
                    <div>Salary: ₹{m.salary || "—"}</div>
                    <div>Age: {m.age || "—"}</div>
                  </div>
                </Popup>
              </Marker>
              <CircleMarker
                center={m.coords}
                radius={Math.max(5, (Number(m.salary) || 0) / 10000)}
                fillColor={m.color}
                color={m.color}
                weight={2}
                fillOpacity={0.32}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
