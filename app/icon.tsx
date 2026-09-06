import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Brauzer yorligʻi uchun oltin uzuk belgisi */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050403",
          borderRadius: 14,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle
            cx="20"
            cy="30"
            r="13"
            fill="none"
            stroke="#d4af37"
            strokeWidth="4.5"
          />
          <circle
            cx="32"
            cy="30"
            r="13"
            fill="none"
            stroke="#f2e2c0"
            strokeWidth="4.5"
          />
          <polygon points="20,4 26,12 20,19 14,12" fill="#f2e2c0" />
        </svg>
      </div>
    ),
    size,
  );
}
