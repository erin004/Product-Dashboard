import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { BAR_COLORS } from "../../utils/formatters";
import CustomTooltip from "./CustomTooltip";

export default function PriceBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f2e" />
        <XAxis dataKey="name" tick={{ fill: "#ede9fe", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: "#ede9fe", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
        <Bar dataKey="price" name="price" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
