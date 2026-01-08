import { Box, Paper, Stack, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const palette = {
  teal: "#0F7D84",
  blue: "#2F6FED",
  muted: "#A0AEC0",
  textMain: "#17212C",
  textMuted: "#5C6B7A",
  shadow: "0 10px 26px rgba(16, 24, 40, 0.08)",
};

type TrafficItem = {
  name: string;
  value: number;
  color: string;
};

type TrafficChartProps = {
  items: TrafficItem[];
};

export default function TrafficChart({ items }: TrafficChartProps) {
  return (
    <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow, height: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, minHeight: 40 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>
          Traffic Sources
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          {items.map((item) => (
            <Box
              key={item.name}
              sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color }}
            />
          ))}
        </Stack>
      </Stack>
      <Box sx={{ height: 260 }}>
        {items.length === 0 ? (
          <Typography variant="body2" sx={{ color: palette.textMuted }}>
            No data yet
          </Typography>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={items} barSize={36}>
              <CartesianGrid strokeDasharray="4 4" stroke="#D5DDE6" strokeOpacity={0.8} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: palette.textMuted, fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: palette.textMuted, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  boxShadow: palette.shadow,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {items.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
                <LabelList dataKey="value" position="top" fill={palette.textMuted} fontSize={11} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Paper>
  );
}
