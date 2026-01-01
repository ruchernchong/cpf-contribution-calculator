import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1e293b",
        borderRadius: 8,
      }}
    >
      {/* Three ascending bars - OA, SA, MA */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{ position: "absolute" }}
        role="img"
        aria-label="CPF Calculator logo"
      >
        <rect x="7" y="18" width="5" height="8" rx="1.5" fill="#f8fafc" />
        <rect x="13.5" y="13" width="5" height="13" rx="1.5" fill="#14b8a6" />
        <rect x="20" y="8" width="5" height="18" rx="1.5" fill="#f8fafc" />
        <path
          d="M6 22 Q16 4, 26 10"
          stroke="#14b8a6"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
