import {
  createOgImage,
  OG_IMAGE_ALT,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@/lib/og-image";

export default function Image() {
  return createOgImage({
    background: "#ffffff",
    logoBackground: "#f8fafc",
    logoBorder: "#e2e8f0",
    barColor: "#475569",
    accentColor: "#14b8a6",
    titleColor: "#0f172a",
    subtitleColor: "#64748b",
    chipBackground: "#f1f5f9",
    chipTextColor: "#0f172a",
  });
}

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
