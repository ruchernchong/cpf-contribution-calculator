import { formatCurrency, formatPercentage } from "@/lib/format";
import { type PropsWithChildren, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Legend, Tooltip } from "recharts";

interface DistributionPieChartProps extends PropsWithChildren {
  data: any;
  className: string;
}

// Custom colors for the pie chart segments
const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

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
      fill,
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

  const customizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {formatPercentage(percent)}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary">{formatCurrency(payload[0].value)}</p>
          <p className="text-gray-500">{formatPercentage(payload[0].payload.percent)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      className={props.className}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          nameKey="name"
          dataKey="value"
          label={customizedLabel}
          labelLine={false}
          className="cursor-pointer"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DistributionPieChart;
