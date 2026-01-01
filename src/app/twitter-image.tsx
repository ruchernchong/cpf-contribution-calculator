import { ImageResponse } from "next/og";

export const alt = "SimplyCPF - Your CPF, simplified.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e293b",
          borderRadius: 24,
          padding: 24,
          marginBottom: 32,
          border: "2px solid #334155",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 32 32"
          role="img"
          aria-label="SimplyCPF logo"
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
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f8fafc",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          SimplyCPF
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "#94a3b8",
            margin: 0,
            maxWidth: 700,
            textAlign: "center",
          }}
        >
          Your CPF, simplified.
        </p>
      </div>

      {/* Three account indicators */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 48,
        }}
      >
        {[
          { label: "OA", color: "#f8fafc" },
          { label: "SA", color: "#14b8a6" },
          { label: "MA", color: "#f8fafc" },
        ].map((account) => (
          <div
            key={account.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              background: "#334155",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: account.color,
              }}
            />
            <span style={{ color: "#f8fafc", fontSize: 20 }}>
              {account.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    },
  );
}
