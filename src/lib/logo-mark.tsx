import type { CSSProperties, ReactElement } from "react";

interface LogoMarkProps {
  size: number;
  barColor: string;
  accentColor: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export const LogoMark = ({
  size,
  barColor,
  accentColor,
  strokeWidth = 1.5,
  style,
}: LogoMarkProps): ReactElement => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="SimplyCPF logo"
      style={style}
    >
      <rect x="7" y="18" width="5" height="8" rx="1.5" fill={barColor} />
      <rect x="13.5" y="13" width="5" height="13" rx="1.5" fill={accentColor} />
      <rect x="20" y="8" width="5" height="18" rx="1.5" fill={barColor} />
      <path
        d="M6 22 Q16 4, 26 10"
        stroke={accentColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
};
