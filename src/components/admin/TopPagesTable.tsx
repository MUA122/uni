import "antd/dist/reset.css";

import { Card, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

type TopPageRow = {
  path: string;
  pageviews: number;
  unique_visitors: number;
  avg_time_sec: number;
};

type TopPagesTableProps = {
  rows: TopPageRow[];
  updatedLabel?: string;
};

const numberFormatter = new Intl.NumberFormat("en-US");

function formatDuration(seconds: number) {
  if (!seconds || seconds <= 0) return "0s";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  return minutes > 0 ? `${minutes}m ${remaining}s` : `${remaining}s`;
}

export default function TopPagesTable({ rows, updatedLabel }: TopPagesTableProps) {
  const columns: ColumnsType<TopPageRow> = [
    {
      title: "Page",
      dataIndex: "path",
      key: "path",
      render: (v: string) => <Typography.Text strong>{v}</Typography.Text>,
    },
    {
      title: "Pageviews",
      dataIndex: "pageviews",
      key: "pageviews",
      align: "right",
      sorter: (a, b) => a.pageviews - b.pageviews,
      defaultSortOrder: "descend",
      render: (v: number) => numberFormatter.format(v),
    },
    {
      title: "Unique Visitors",
      dataIndex: "unique_visitors",
      key: "unique_visitors",
      align: "right",
      sorter: (a, b) => a.unique_visitors - b.unique_visitors,
      render: (v: number) => numberFormatter.format(v),
    },
    {
      title: "Avg Time",
      dataIndex: "avg_time_sec",
      key: "avg_time_sec",
      align: "right",
      sorter: (a, b) => a.avg_time_sec - b.avg_time_sec,
      render: (v: number) => formatDuration(v),
    },
  ];

  return (
    <Card
      title={<span style={{ fontWeight: 700 }}>Top Pages</span>}
      extra={<Tag>Pageviews</Tag>}
      style={{ borderRadius: 16 }}
      bodyStyle={{ paddingTop: 8 }}
    >
      <Table<TopPageRow>
        rowKey="path"
        size="small"
        columns={columns}
        dataSource={rows}
        pagination={false}
        locale={{ emptyText: "No data yet" }}
      />
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {updatedLabel || "Updated just now"}
        </Typography.Text>
      </div>
    </Card>
  );
}
