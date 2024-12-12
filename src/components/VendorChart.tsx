"use client";
import Image from "next/image";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 500,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
];
const colors = [
  "#E60049",
  "#0BB4FF",
  "#50E991",
  "#E6D800",
  "#9B19F5",
  "#FFA300",
  "#DC0AB4",
  "#B3D4FF",
  "#00BFA0",
];

const chartColors = [
  "bg-chart1",
  "bg-chart2",
  "bg-chart3",
  "bg-chart4",
  "bg-chart5",
  "bg-chart6",
  "bg-chart7",
  "bg-chart8",
  "bg-chart9",
];

const VendorChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Sales per vendors</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="w-full h-[75%]">
        <ResponsiveContainer>
          <PieChart width={730} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-4">
        {data.map((item, idx) => (
          <div className="flex flex-col gap-1" key={item.name}>
            <div className={`w-5 h-5 ${chartColors[idx]} rounded-full`} />
            <h2 className="text-xs text-gray-700">{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VendorChart;
