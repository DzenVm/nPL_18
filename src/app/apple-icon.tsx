import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#171310",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 26,
            width: 6,
            height: 26,
            background: "#968971",
            borderRadius: 3,
            transform: "rotate(-40deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 10,
            width: 6,
            height: 30,
            background: "#968971",
            borderRadius: 3,
            transform: "rotate(-14deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 44,
            top: 8,
            width: 10,
            height: 34,
            background: "#a1c368",
            borderRadius: 5,
            transform: "rotate(24deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 82,
            top: 26,
            width: 12,
            height: 78,
            background: "#d9713c",
            borderRadius: 6,
            transform: "rotate(30deg)",
            transformOrigin: "bottom center",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 30,
            width: 36,
            height: 36,
            borderRadius: 18,
            background: "#171310",
            border: "8px solid #d9713c",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
