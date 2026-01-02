import {
  createOgImage,
  OG_IMAGE_ALT,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@/lib/og-image";

export default function Image() {
  return createOgImage({
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    logoBackground: "#1e293b",
    logoBorder: "#334155",
    barColor: "#f8fafc",
    accentColor: "#14b8a6",
    titleColor: "#f8fafc",
    subtitleColor: "#94a3b8",
    chipBackground: "#334155",
    chipTextColor: "#f8fafc",
  });
}

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
