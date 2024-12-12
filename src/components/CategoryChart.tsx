"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    category: "Gold 99%",
    rings: 400,
    necklaces: 200,
    bracelets: 300,
  },
  {
    category: "Gold 98%",
    rings: 300,
    necklaces: 200,
    bracelets: 300,
  },
  {
    category: "Gold 97%",
    rings: 200,
    necklaces: 200,
    bracelets: 300,
  },
  {
    category: "Gold 61%",
    rings: 278,
    necklaces: 200,
    bracelets: 300,
  },
];

const colors = ["#0BB4FF", "#E6D800", "#50E991", "#00BFA0"];

const CategoryChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Sales by category</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="category" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />
          <Tooltip />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar dataKey="rings" fill={colors[0]} legendType="circle" />
          <Bar dataKey="necklaces" fill={colors[1]} legendType="circle" />
          <Bar dataKey="bracelets" fill={colors[2]} legendType="circle" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CategoryChart;
