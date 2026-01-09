import "antd/dist/reset.css";

import { Card, Table, Typography, Space, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

type PerformanceRow = {
  path: string;
  lcp_p75_ms: number;
  fcp_p75_ms: number;
  cls_p75: number;
};

type PerformanceTableProps = {
  items: PerformanceRow[];
};

function formatMs(value: number) {
  if (!value) return "0.0s";
  return `${(value / 1000).toFixed(1)}s`;
}

export default function PerformanceTable({ items }: PerformanceTableProps) {
  const columns: ColumnsType<PerformanceRow> = [
    {
      title: "Page path",
      dataIndex: "path",
      key: "path",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "LCP",
      dataIndex: "lcp_p75_ms",
      key: "lcp",
      align: "right",
      sorter: (a, b) => a.lcp_p75_ms - b.lcp_p75_ms,
      render: (v: number) => formatMs(v),
    },
    {
      title: "FCP",
      dataIndex: "fcp_p75_ms",
      key: "fcp",
      align: "right",
      sorter: (a, b) => a.fcp_p75_ms - b.fcp_p75_ms,
      render: (v: number) => formatMs(v),
    },
    {
      title: "CLS",
      dataIndex: "cls_p75",
      key: "cls",
      align: "right",
      sorter: (a, b) => a.cls_p75 - b.cls_p75,
      render: (v: number) => v.toFixed(2),
    },
  ];

  const corePages = items.slice(0, 3);
  const secondaryPages = items.slice(3);

  return (
    <Card
      title={<span style={{ fontWeight: 700 }}>Web Vitals Performance</span>}
      style={{ borderRadius: 16, height: "100%" }}
      bodyStyle={{ paddingTop: 8 }}
    >
      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        <div>
          <Typography.Text strong>Core Pages</Typography.Text>
          <Table<PerformanceRow>
            rowKey="path"
            size="small"
            columns={columns}
            dataSource={corePages}
            pagination={false}
            locale={{ emptyText: "No data yet" }}
          />
        </div>

        <Divider style={{ margin: "6px 0" }} />

        <div>
          <Typography.Text strong>Secondary Pages</Typography.Text>
          <Table<PerformanceRow>
            rowKey="path"
            size="small"
            columns={columns}
            dataSource={secondaryPages}
            pagination={false}
            locale={{ emptyText: "No data yet" }}
          />
        </div>
      </Space>
    </Card>
  );
}
