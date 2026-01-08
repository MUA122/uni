import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const palette = {
  textMain: "#17212C",
  textMuted: "#5C6B7A",
  shadow: "0 10px 26px rgba(16, 24, 40, 0.08)",
};

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
  if (!seconds || seconds <= 0) {
    return "0s";
  }
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  if (minutes > 0) {
    return `${minutes}m ${remaining}s`;
  }
  return `${remaining}s`;
}

export default function TopPagesTable({ rows, updatedLabel }: TopPagesTableProps) {
  return (
    <Paper sx={{ p: 2.5, borderRadius: 3, boxShadow: palette.shadow }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, minHeight: 40 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textMain }}>
          Top Pages
        </Typography>
        <Chip label="Pageviews" size="small" sx={{ backgroundColor: "#EEF2F6", fontWeight: 600 }} />
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }}>Page</TableCell>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }} align="right">
              Pageviews <ArrowDropDown sx={{ fontSize: 16, verticalAlign: "middle" }} />
            </TableCell>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }} align="right">
              Unique Visitors
            </TableCell>
            <TableCell sx={{ color: palette.textMuted, fontWeight: 600 }} align="right">
              Avg Time
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
            <TableRow key={row.path} hover>
              <TableCell sx={{ color: palette.textMain, fontWeight: 600 }}>{row.path}</TableCell>
              <TableCell align="right">{numberFormatter.format(row.pageviews)}</TableCell>
              <TableCell align="right">{numberFormatter.format(row.unique_visitors)}</TableCell>
              <TableCell align="right">{formatDuration(row.avg_time_sec)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      </Table>
      <Box sx={{ mt: 1.5, display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="caption" sx={{ color: palette.textMuted }}>
          {updatedLabel || "Updated just now"}
        </Typography>
      </Box>
    </Paper>
  );
}
