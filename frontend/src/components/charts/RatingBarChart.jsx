import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function RatingBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f2e" />
        <XAxis dataKey="star" tick={{ fill: "#ede9fe", fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#ede9fe", fontSize: 10 }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
        <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]} fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
