import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import { LogoMark } from "@/lib/logo-mark";

interface IconImageOptions {
  size: number;
  background: string;
  borderRadius: number;
  svgSize: number;
  barColor: string;
  accentColor: string;
  svgStyle?: CSSProperties;
}

export const createIconImage = (options: IconImageOptions): ImageResponse => {
  const {
    size,
    background,
    borderRadius,
    svgSize,
    barColor,
    accentColor,
    svgStyle,
  } = options;

  return new ImageResponse(
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
        borderRadius,
      }}
    >
      <LogoMark
        size={svgSize}
        barColor={barColor}
        accentColor={accentColor}
        style={svgStyle}
      />
    </div>,
    {
      width: size,
      height: size,
    },
  );
};
