import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { buildGrid, COL_COUNT, ROW_COUNT } from "./data";
import { VirtualDataTable } from "./VirtualDataTable";

export default function App() {
  const [seed, setSeed] = useState(0);
  const rows = useMemo(() => buildGrid(42 + seed), [seed]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar variant="dense" sx={{ gap: 2 }}>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
            仮想スクロール表の練習
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" component="main" sx={{ py: 3, flex: 1 }}>
        <Stack spacing={3}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
              <Typography variant="body1" color="text.secondary">
                {ROW_COUNT.toLocaleString()} 行 × {COL_COUNT} 列の工場設備風マスタ。DOM
                は表示範囲＋オーバースキャンのみです。
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setSeed((s) => s + 1)}>
                データを再生成
              </Button>
            </Box>
          </Paper>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              データグリッド（仮想スクロール・独自スタイル）
            </Typography>
            <VirtualDataTable rows={rows} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
