import { Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const palette = {
  textMain: "#17212C",
  textMuted: "#5C6B7A",
  shadow: "0 10px 26px rgba(16, 24, 40, 0.08)",
};

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
  if (!value) {
    return "0.0s";
  }
  return `${(value / 1000).toFixed(1)}s`;
}

function VitalsTable({ title, rows }: { title: string; rows: PerformanceRow[] }) {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: palette.textMain }}>
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }}>Page path</TableCell>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }} align="right">
              LCP
            </TableCell>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }} align="right">
              FCP
            </TableCell>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }} align="right">
              CLS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} sx={{ color: palette.textMuted }}>
                No data yet
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.path}>
                <TableCell sx={{ fontWeight: 600 }}>{row.path}</TableCell>
                <TableCell align="right">{formatMs(row.lcp_p75_ms)}</TableCell>
                <TableCell align="right">{formatMs(row.fcp_p75_ms)}</TableCell>
                <TableCell align="right">{row.cls_p75.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Stack>
  );
}

export default function PerformanceTable({ items }: PerformanceTableProps) {
  const corePages = items.slice(0, 3);
  const secondaryPages = items.slice(3);

  return (
    <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow, height: "100%" }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>
          Web Vitals Performance
        </Typography>
        <VitalsTable title="Core Pages" rows={corePages} />
        <VitalsTable title="Secondary Pages" rows={secondaryPages} />
      </Stack>
    </Paper>
  );
}
