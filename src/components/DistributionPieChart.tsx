import { type PropsWithChildren, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { formatCurrency, formatPercentage } from "@/lib/format";

interface Props extends PropsWithChildren {
  data: any[];
  className: string;
}

// Custom colors for the pie chart segments
const COLORS = ["#3b82f6", "#10b981", "#ef4444"];

export const DistributionPieChart = ({ data, ...props }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderActiveShape = (props: any) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={-20}
          textAnchor="middle"
          fill="currentColor"
          className="text-lg font-medium"
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy}
          dy={10}
          textAnchor="middle"
          fill="currentColor"
          className="text-xl font-bold"
        >
          {formatCurrency(value)}
        </text>
        <text
          x={cx}
          y={cy}
          dy={30}
          textAnchor="middle"
          fill="currentColor"
          className="text-sm"
        >
          {formatPercentage(percent)}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-800 p-2 border border-zinc-200 dark:border-zinc-700 rounded shadow text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary">{formatCurrency(payload[0].value)}</p>
          <p className="text-zinc-500">
            {formatPercentage(payload[0].payload.percent)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400} className={props.className}>
      <PieChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={110}
          paddingAngle={3}
          nameKey="name"
          dataKey="value"
          labelLine={false}
          className="cursor-pointer"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DistributionPieChart;
