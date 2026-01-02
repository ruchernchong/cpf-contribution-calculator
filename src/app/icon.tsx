import { createIconImage } from "@/lib/icon-image";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return createIconImage({
    size: 32,
    background: "#1e293b",
    borderRadius: 8,
    svgSize: 32,
    barColor: "#f8fafc",
    accentColor: "#14b8a6",
    svgStyle: { position: "absolute" },
  });
}
