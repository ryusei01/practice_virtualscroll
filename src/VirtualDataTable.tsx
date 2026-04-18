import { useRef, type CSSProperties } from "react";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import "./VirtualDataTable.css";
import type { Row } from "./data";
import { COL_COUNT, COLUMNS } from "./data";

/** Fixed row height in px (virtualizer estimate + layout). */
const ROW_H = 36;
/** Fixed column width in px (horizontal virtualizer). */
const COL_W = 128;

type Props = { rows: Row[] };

/** Absolute cell position inside a relatively positioned row or header strip. */
function colCell(vc: VirtualItem, height: number): CSSProperties {
  return { position: "absolute", left: vc.start, width: vc.size, height };
}

/** Wrapper size for a header strip or the scrollable body area. */
function gridLayer(width: number, height: number): CSSProperties {
  return { position: "relative", width, height };
}

/**
 * Two-axis virtualized grid: only visible rows/columns (+ overscan) mount DOM nodes.
 * Rows are `Row` records; cells are read by `rows[vr.index][columnId]`.
 */
export function VirtualDataTable({ rows }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const getScroll = () => scrollRef.current;

  // Vertical: one strip per visible data row.
  const rowsV = useVirtualizer({
    count: rows.length,
    getScrollElement: getScroll,
    estimateSize: () => ROW_H,
    overscan: 8,
    scrollMargin: ROW_H,
  });

  // Horizontal: header cells and body cells share the same column virtualizer.
  const colsV = useVirtualizer({
    horizontal: true,
    count: COL_COUNT,
    getScrollElement: getScroll,
    estimateSize: () => COL_W,
    overscan: 4,
  });

  const virtualRows = rowsV.getVirtualItems();
  const virtualCols = colsV.getVirtualItems();
  const gridWidth = colsV.getTotalSize();
  const bodyHeight = rowsV.getTotalSize();

  return (
    <div className="vt-wrap">
      <div ref={scrollRef} className="vt-scroll">
        <div className="vt-stack">
          {/* Sticky header: same horizontal offsets as body cells */}
          <div className="vt-header-row" style={gridLayer(gridWidth, ROW_H)}>
            {virtualCols.map((vc) => (
              <div key={vc.key} className="vt-cell vt-header-cell" style={colCell(vc, ROW_H)}>
                <span className="vt-header-label" title={COLUMNS[vc.index]?.label}>
                  {COLUMNS[vc.index]?.label ?? `Column ${vc.index + 1}`}
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
                  // Place row 0 directly under the header strip
                  top: vr.start - ROW_H,
                  left: 0,
                  width: gridWidth,
                  height: vr.size,
                }}
              >
                {virtualCols.map((vc) => {
                  const colId = COLUMNS[vc.index]?.id;
                  const raw = colId ? rows[vr.index]?.[colId] : undefined;
                  return (
                    <div
                      key={vc.key}
                      className={`vt-cell vt-body-cell ${vr.index % 2 === 1 ? "vt-body-cell--alt" : ""}`}
                      style={colCell(vc, vr.size)}
                      title={raw != null ? String(raw) : undefined}
                    >
                      {raw}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
