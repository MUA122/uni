import "antd/dist/reset.css";

import { Card, Space } from "antd";
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
    <Card
      title={<span style={{ fontWeight: 700 }}>Traffic Sources</span>}
      extra={
        <Space size={8}>
          {items.map((item) => (
            <span
              key={item.name}
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                display: "inline-block",
                background: item.color,
              }}
            />
          ))}
        </Space>
      }
      style={{ borderRadius: 16, height: "100%" }}
      bodyStyle={{ paddingTop: 8 }}
    >
      <div style={{ height: 240 }}>
        {items.length === 0 ? (
          <div style={{ padding: 8, opacity: 0.7 }}>No data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={items} barSize={36}>
              <CartesianGrid strokeDasharray="4 4" stroke="#D5DDE6" strokeOpacity={0.8} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {items.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
                <LabelList dataKey="value" position="top" fontSize={11} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
