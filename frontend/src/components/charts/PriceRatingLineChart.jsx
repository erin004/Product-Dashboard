import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";

export default function PriceRatingLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f2e" />
        <XAxis dataKey="name" tick={{ fill: "#ede9fe", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis yAxisId="l" tick={{ fill: "#ede9fe", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
        <YAxis yAxisId="r" orientation="right" tick={{ fill: "#52525b", fontSize: 10 }} tickLine={false} axisLine={false} domain={[0, 5]} />
        <Tooltip content={<CustomTooltip />} />
        <Line yAxisId="l" type="monotone" dataKey="price"  name="price"  stroke="#6366f1" strokeWidth={2} dot={false} />
        <Line yAxisId="r" type="monotone" dataKey="rating" name="rating" stroke="#a78bfa" strokeWidth={2} dot={false} strokeDasharray="4 2" />
      </LineChart>
    </ResponsiveContainer>
  );
}
