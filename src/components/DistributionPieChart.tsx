import { PropsWithChildren, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { formatCurrency, formatPercentage } from "../lib/format";

interface DistributionPieChartProps extends PropsWithChildren {
  data: any;
  className: string;
}

export const DistributionPieChart = ({
  data,
  ...props
}: DistributionPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      className,
      payload,
      percent,
      value,
    } = props;
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" className={className}>
          {payload.name.toUpperCase()}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          className={className}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          className={className}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          className="stroke-teal-600"
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={"fill-teal-600"} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          className={className}
        >
          {formatCurrency(value)}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          className={className}
        >
          {formatPercentage(percent)}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer
      width="50%"
      aspect={16 / 9}
      style={{ margin: "0 auto" }}
      className={props.className}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          nameKey="name"
          dataKey="value"
          className="cursor-pointer fill-teal-600"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
