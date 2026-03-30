import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Coyotl Can - Clínica Veterinaria Integral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 8, display: "flex" }}>🐾</div>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#ff006b", marginBottom: 16 }}>
          Coyotl Can
        </div>
        <div style={{ fontSize: 28, color: "#555", marginBottom: 8 }}>
          Clínica Veterinaria Integral
        </div>
        <div style={{ fontSize: 22, color: "#888" }}>
          Lindavista, CDMX · Medicina con alma
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#ff006b",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
