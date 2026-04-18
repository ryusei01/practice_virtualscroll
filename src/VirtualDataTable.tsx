import { useRef, type CSSProperties } from "react";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import "./VirtualDataTable.css";
import type { Row } from "./data";
import { COL_COUNT, COLUMNS } from "./data";

const ROW_H = 36;
const COL_W = 128;

type Props = { rows: Row[] };

function colCell(vc: VirtualItem, height: number): CSSProperties {
  return { position: "absolute", left: vc.start, width: vc.size, height };
}

function gridLayer(width: number, height: number): CSSProperties {
  return { position: "relative", width, height };
}

export function VirtualDataTable({ rows }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const getScroll = () => scrollRef.current;

  const rowsV = useVirtualizer({
    count: rows.length,
    getScrollElement: getScroll,
    estimateSize: () => ROW_H,
    overscan: 8,
    scrollMargin: ROW_H,
  });

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
                {virtualCols.map((vc) => {
                  const colId = COLUMNS[vc.index]?.id;
                  const text = colId ? rows[vr.index]?.[colId] : undefined;
                  return (
                    <div
                      key={vc.key}
                      className={`vt-cell vt-body-cell ${vr.index % 2 === 1 ? "vt-body-cell--alt" : ""}`}
                      style={colCell(vc, vr.size)}
                      title={text}
                    >
                      {text}
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
