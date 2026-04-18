# ��想スクロール実装の解説

このプロジェクトでは、[@tanstack/react-virtual](https://tanstack.com/virtual/latest) を使い、**行方向・列方向の両方**で�想化したデータグリッドを実装している。DOMには「現在の表示�オー��ースキャン」分のセルだけが存在する。

---

## 全体の流れ

1. `data.ts` で5000 行 × 100 列相当の `Row[]`（`string[]` の配列）を生成する。
2. `App.tsx` が `VirtualDataTable` に `rows` を渡す。
3. `VirtualDataTable.tsx` が**同じスクロール要素**を共有する 2 つの `useVirtualizer`�・横）で、可視行・可視列だけをレンダリングする。
4. `VirtualDataTable.css` でスクロールコンテナの高さ・オー��ー��ロー・セル見た目を定義する。

---

## 依存関係�想化の中核は `@tanstack/react-virtual` だけである（UI は MUI を別途利用）。

```11:17:D:\document\program\project\practice\practice_virtualscroll\package.json
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^6.4.8",
    "@tanstack/react-virtual": "^3.13.12",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
```

---

## データ��（`data.ts`）

- `ROW_COUNT`（5000）と `COLUMNS`（100 項目の列定義）から `COL_COUNT = COLUMNS�出している。
- `buildGrid(seed)` が行ごとに疑似乱数を回し、列定義に沿ったデモ用の文字列セルを埋めた `Row[]` を返す。

```1:2:D:\document\program\project\practice\practice_virtualscroll\src\data.ts
/** 行数（列数は COLUMNS の長さ） */
export const ROW_COUNT = 5000;
```

```321:332:D:\document\program\project\practice\practice_virtualscroll\src\data.ts
/** 5000×100 のセル（項目定義に沿ったありえそうな値） */
export function buildGrid(seed = 42): Row[] {
  const rows: Row[] = [];
  for (let r = 0; r < ROW_COUNT; r++) {
    const rand = mulberry32(seed + r * 10007);
    const row: string[] = [];
    for (let c = 0; c < COL_COUNT; c++) {
      row.push(cellValue(r, c, COLUMNS[c]!, rand, seed));
    }
    rows.push(row);
  }
  return rows;
}
�ー��ント側は「行�ックス `vr.index`・列イン��ックス `vc.index`」で `rows[vr.index]?.[vc.index]` を参照するだけなので、データは通常の 2 次元配列として��える。

---

##��想化の核（`VirtualDataTable.tsx`）

### 固定サイズの前提

行の高さ `ROW_H`、列の幅 `COL_W` を定数にしている。可変行高・可変列幅にする場合は `estimateSize` や計��ロジックを差し替える必要がある。

```6:8:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
const ROW_H = 36;
const COL_W = 128;
```

### スクロール要素の共有

`scrollRef` を `getScrollElement` に渡し、**��・横の virtualizer が同じスクロールコンテナ**を見る。横スクロール・��スクロールの両方がこの1 要素で処理される。

```20:22:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
export function VirtualDataTable({ rows }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const getScroll = () => scrollRef.current;
```

�想化と `scrollMargin`

ヘッダー行は `vt-body` の外側（上）にあり、スク�域の**先頭から `ROW_H` だけコンテン��が食っている**。TanStack Virtual では `scrollMargin` にその分を渡すと、内部で各アイテムの `start` が `scrollMargin` 以降から�み上がる（ライブラリ実装では先頭アイテムの `start` に `paddingStart + scrollMargin` が入る）。

そのため、ボディ内で `position: absolute` する行の `top` は **`vr.start` から `ROW_H` を引いて**、`.vt-body` 左上（�データ行エリアの上端）基準の座標に直している。

```24:30:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
  const rowsV = useVirtualizer({
    count: rows.length,
    getScrollElement: getScroll,
    estimateSize: () => ROW_H,
    overscan: 8,
    scrollMargin: ROW_H,
  });
```

```59:70:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
          <div className="vt-body" style={gridLayer(gridWidth, bodyHeight)}>
            {virtualRows.map((vr) => (
              <div
                key={vr.key}
                className="vt-row"
                style={{
                  position: "absolute",
                  top: vr.start - ROW_H,
                  left: 0,
                  width: gridWidth,
                  height: vr.size,
                }}
```

�想化

`horizontal: true` で横方向の virtualizer を別インスタンスとして持つ。ヘッダーとボディの**両方**で同じ `virtualCols` を使い、列のキー・位置・幅を共有する。

```32:38:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
  const colsV = useVirtualizer({
    horizontal: true,
    count: COL_COUNT,
    getScrollElement: getScroll,
    estimateSize: () => COL_W,
    overscan: 4,
  });
```

### 総サイズとセル配置

- `colsV.getTotalSize()` … グリッド全体の幅（横スクロールバーの長さの基準）。
- `rowsV.getTotalSize()` … データ行エリアの高さ（ヘッダーは含まない）。

ヘッダー・ボディのラッパーには `gridLayer(width, height)` で `position: relative` と寸法を与え、各セルは `colCell` で `left` / `width` / `height�対配置している。

```12:17:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
function colCell(vc: VirtualItem, height: number): CSSProperties {
  return { position: "absolute", left: vc.start, width: vc.size, height };
}

function gridLayer(width: number, height: number): CSSProperties {
  return { position: "relative", width, height };
```

### レンダリングの組み立て（入れ子ループ）

外側ループが**可視行**、内側が**可視列**なので、DOM ノード数はおおむね `(可視行数) × (可視列数)` オー��ーに抑えられる。ストライプ行は `vr.index % 2` でクラスを切り替えている。

```45:84:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.tsx
  return (
    <div className="vt-wrap">
      <div ref={scrollRef} className="vt-scroll">
        <div className="vt-stack">
          <div className="vt-header-row" style={gridLayer(gridWidth, ROW_H)}>
            {virtualCols.map((vc) => (
              <div key={vc.key} className="vt-cell vt-header-cell" style={colCell(vc, ROW_H)}>
                <span className="vt-header-label" title={COLUMNS[vc.index]?.label}>
                  {COLUMNS[vc.index]?.label ?? `列${vc.index + 1}`}
                </span>
              </div>
            ))}
          </div>

          <div className="vt-body" style={gridLayer(gridWidth, bodyHeight)}>
            {virtualRows.map((vr) => (
              <div
                key={vr.key}
                className="vt-row"
                style={{
                  position: "absolute",
                  top: vr.start - ROW_H,
                  left: 0,
                  width: gridWidth,
                  height: vr.size,
                }}
              >
                {virtualCols.map((vc) => (
                  <div
                    key={vc.key}
                    className={`vt-cell vt-body-cell ${vr.index % 2 === 1 ? "vt-body-cell--alt" : ""}`}
                    style={colCell(vc, vr.size)}
                    title={rows[vr.index]?.[vc.index]}
                  >
                    {rows[vr.index]?.[vc.index]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
```

### `overscan` の意味

`overscan: 8`（行）/ `overscan: 4`（列）は、可�の外側に**余分に何行・何列分レンダリングするか**を指定する。スクロールが速いときのちらつきを��らす代わりに DOM がわずかに増えるトレードオフである。

---

## レイアウトと CSS（`VirtualDataTable.css`）

- `.vt-scroll` に `overflow: auto` と高さ上限を与え、**ここが�想化のスクロール要素**になる。
- `.vt-body` に `contain: layout style` を指定し、ブラウザにレイアウトのスコープを示してパフォーマンスのヒントにしている（環境によって効果の程度は異なる）。

```9:26:D:\document\program\project\practice\practice_virtualscroll\src\VirtualDataTable.css
.vt-scroll {
  height: min(70vh, 640px);
  overflow: auto;
  position: relative;
}

.vt-stack {
  min-width: min-content;
}

.vt-header-row {
  border-bottom: 1px solid #cbd5e1;
  flex-shrink: 0;
}

.vt-body {
  contain: layout style;
}
```

---

## アプリからの利用（`App.tsx`）

`useMemo` で `buildGrid` の結果を保持し、ボタンで `seed` を変えてデータを再生成できる�ー��ントは `rows` の参照が変われば再描画に追随する。

```15:17:D:\document\program\project\practice\practice_virtualscroll\src\App.tsx
export default function App() {
  const [seed, setSeed] = useState(0);
  const rows = useMemo(() => buildGrid(42 + seed), [seed]);
```

```46:48:D:\document\program\project\practice\practice_virtualscroll\src\App.tsx
            <VirtualDataTable rows={rows} />
```

---

## まとめ

| 項目 | 内容 |
|------|------|
| ライブラリ | `@tanstack/react-virtual` の `useVirtualizer` を�・横で 2 回 |
| スクロール要素 | 1 つの `div`（`.vt-scroll`）を共有 |
| ヘッダーとの整合 | `scrollMargin: ROW_H` と `top: vr.start - ROW_H` で座標を合わせる |
| DOM 数 | 全 50 万セルではなく、�オー��ースキャン分のみ |
| データ | `Row[]`（`string[][]`）を行・列イン��ックスで参照 |

可変行高・スティッキー列・�ードフォーカス移動などを足す場合は、`estimateSize` /計��、`scrollMargin` の�い、フォーカス管理をこの構造に載せて��張することになる。
