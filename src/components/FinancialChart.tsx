"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "2000-01",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: "2000-02",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date: "2000-03",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    date: "2000-04",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    date: "2000-05",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    date: "2000-06",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    date: "2000-07",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    date: "2000-08",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date: "2000-09",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date: "2000-10",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    date: "2000-11",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    date: "2000-12",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
];

const FinancialChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}

      {/* BOTTOM */}
    </div>
  );
};
export default FinancialChart;
