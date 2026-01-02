import { createIconImage } from "@/lib/icon-image";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return createIconImage({
    size: 180,
    background: "#1e293b",
    borderRadius: 40,
    svgSize: 140,
    barColor: "#f8fafc",
    accentColor: "#14b8a6",
  });
}
