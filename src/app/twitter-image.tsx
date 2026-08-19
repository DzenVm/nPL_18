import { ImageResponse } from "next/og";

export const alt = "Przeglądarkowa gra wyścigowa o podwórkowych torach";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background:
            "radial-gradient(circle at 14% 18%, #3a2b1e 0%, #171310 55%), linear-gradient(150deg, #171310 0%, #1e1811 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d9713c",
            marginBottom: 28,
          }}
        >
          Demo dostępne teraz
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            lineHeight: 1.18,
            color: "#f5efe2",
            maxWidth: 940,
            fontWeight: 700,
          }}
        >
          Wyścigi rysowane kredą po własnym podjeździe, z ręczną skrzynią biegów
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#cdc0aa", marginTop: 36 }}>
          nometuwe.best — bez instalacji, prosto w przeglądarce
        </div>
      </div>
    ),
    { ...size }
  );
}
