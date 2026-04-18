/**
 * 仮想スクロール表向けデモ用グリッド（5000行 × 100 列）。
 * セルは「固定のベース文字列 + 行インデックス i」または 20+i 系の数値文字列。
 */
/** データ行数。列数は COL_COUNT（COLUMNS.length） */
export const ROW_COUNT = 5000;

/** cellValue の switch で参照する値の系統 */
export type ColumnKind =
  | "equipId"
  | "assetNo"
  | "serial"
  | "model"
  | "code"
  | "date"
  | "datetime"
  | "dept"
  | "person"
  | "vendor"
  | "amount"
  | "int"
  | "decimal1"
  | "pct"
  | "bool"
  | "pref"
  | "postal"
  | "address"
  | "latlng"
  | "tel"
  | "email"
  | "shift"
  | "mode"
  | "status"
  | "alarm"
  | "uuid";

export type ColumnSpec = {
  id: string;
  label: string;
  kind: ColumnKind;
};

/**
 * 100 項目の列定義（ヘッダ表示用ラベルと kind のみ使用。セル値は cellValue で統一ルール生成）。
 */
export const COLUMNS = [
  { id: "equipment_mgmt_no", label: "設備管理番号", kind: "equipId" },
  { id: "asset_tag", label: "資産タグ", kind: "assetNo" },
  { id: "serial_no", label: "製造番号", kind: "serial" },
  { id: "model_name", label: "型式", kind: "model" },
  { id: "sap_equipment_key", label: "SAP設備キー", kind: "code" },
  { id: "iot_gateway_id", label: "IoTゲートウェイID", kind: "code" },
  { id: "edge_device_id", label: "エッジ端末ID", kind: "code" },
  { id: "legacy_system_id", label: "旧システム連携ID", kind: "code" },
  { id: "spare_id_1", label: "予備識別子1", kind: "code" },
  { id: "spare_id_2", label: "予備識別子2", kind: "code" },
  { id: "equipment_name", label: "設備名称", kind: "model" },
  { id: "category_l", label: "設備分類（大）", kind: "dept" },
  { id: "category_m", label: "設備分類（中）", kind: "dept" },
  { id: "category_s", label: "設備分類（小）", kind: "dept" },
  { id: "rated_voltage_v", label: "定格電圧(V)", kind: "int" },
  { id: "rated_current_a", label: "定格電流(A)", kind: "decimal1" },
  { id: "floor", label: "設置フロア", kind: "int" },
  { id: "zone_code", label: "設置区域コード", kind: "code" },
  { id: "explosion_class", label: "防爆区分", kind: "status" },
  { id: "weight_kg", label: "重量(kg)", kind: "amount" },
  { id: "manufacture_year", label: "製造年", kind: "int" },
  { id: "install_date", label: "設置日", kind: "date" },
  { id: "commission_date", label: "試運転完了日", kind: "date" },
  { id: "warranty_until", label: "保証期限", kind: "date" },
  { id: "purchase_date", label: "購入日", kind: "date" },
  { id: "last_overhaul", label: "前回オーバーホール日", kind: "date" },
  { id: "next_inspection_due", label: "次回法定点検予定", kind: "date" },
  { id: "last_inspection", label: "前回自主点検日", kind: "date" },
  { id: "design_life_years", label: "耐用年数(設計)", kind: "int" },
  { id: "planned_start", label: "稼働開始予定", kind: "datetime" },
  { id: "run_state", label: "稼働状態", kind: "status" },
  { id: "alarm_level", label: "アラームレベル", kind: "alarm" },
  { id: "tower_lamp", label: "タワーランプ色", kind: "status" },
  { id: "current_mode", label: "現在モード", kind: "mode" },
  { id: "last_fault_code", label: "前回異常コード", kind: "code" },
  { id: "uptime_session_h", label: "連続稼働時間(h)", kind: "decimal1" },
  { id: "uptime_total_h", label: "累積稼働時間(h)", kind: "amount" },
  { id: "stop_count_total", label: "累積停止回数", kind: "int" },
  { id: "good_counter", label: "良品カウンタ", kind: "int" },
  { id: "ng_counter", label: "不良カウンタ", kind: "int" },
  { id: "primary_owner_id", label: "主担当者ID", kind: "person" },
  { id: "primary_owner_name", label: "主担当者名", kind: "person" },
  { id: "backup_owner_id", label: "副担当者ID", kind: "person" },
  { id: "dept_code", label: "所属課コード", kind: "code" },
  { id: "dept_name", label: "所属課名", kind: "dept" },
  { id: "outsourcer_code", label: "外注業者コード", kind: "vendor" },
  { id: "maintenance_contractor", label: "保全契約先", kind: "vendor" },
  { id: "approver_id", label: "承認者ID", kind: "person" },
  { id: "last_updated_by", label: "最終更新者", kind: "person" },
  { id: "owner_division", label: "オーナー部門", kind: "dept" },
  { id: "spare_part_code_1", label: "主要部品コード1", kind: "code" },
  { id: "spare_part_code_2", label: "主要部品コード2", kind: "code" },
  { id: "spare_part_code_3", label: "主要部品コード3", kind: "code" },
  { id: "spare_part_code_4", label: "主要部品コード4", kind: "code" },
  { id: "spare_part_code_5", label: "主要部品コード5", kind: "code" },
  { id: "consumable_stock_a", label: "消耗品在庫A", kind: "int" },
  { id: "consumable_stock_b", label: "消耗品在庫B", kind: "int" },
  { id: "consumable_stock_c", label: "消耗品在庫C", kind: "int" },
  { id: "consumable_stock_d", label: "消耗品在庫D", kind: "int" },
  { id: "consumable_stock_e", label: "消耗品在庫E", kind: "int" },
  { id: "sensor_temp_c", label: "代表温度(℃)", kind: "decimal1" },
  { id: "sensor_humidity_pct", label: "代表湿度(%)", kind: "pct" },
  { id: "sensor_vibration", label: "振動指標", kind: "decimal1" },
  { id: "power_kw", label: "消費電力(kW)", kind: "decimal1" },
  { id: "pressure_mpa", label: "圧力(MPa)", kind: "decimal1" },
  { id: "flow_l_min", label: "流量(L/min)", kind: "decimal1" },
  { id: "valve_open_pct", label: "開度(%)", kind: "pct" },
  { id: "speed_rpm", label: "回転数(rpm)", kind: "int" },
  { id: "torque_nm", label: "トルク(N·m)", kind: "decimal1" },
  { id: "noise_db", label: "騒音(dB)", kind: "int" },
  { id: "lot_no", label: "ロット番号", kind: "code" },
  { id: "work_order_no", label: "作業指示番号", kind: "code" },
  { id: "part_no", label: "品番", kind: "code" },
  { id: "process_code", label: "工程コード", kind: "code" },
  { id: "shift_name", label: "シフト", kind: "shift" },
  { id: "check_item_1", label: "点検項目1結果", kind: "bool" },
  { id: "check_item_2", label: "点検項目2結果", kind: "bool" },
  { id: "check_item_3", label: "点検項目3結果", kind: "bool" },
  { id: "check_item_4", label: "点検項目4結果", kind: "bool" },
  { id: "check_item_5", label: "点検項目5結果", kind: "bool" },
  { id: "record_created_at", label: "記録作成日時", kind: "datetime" },
  { id: "record_updated_at", label: "記録更新日時", kind: "datetime" },
  { id: "data_source", label: "データソース", kind: "status" },
  { id: "api_link_state", label: "API連携状態", kind: "status" },
  { id: "edge_fw_version", label: "エッジFWバージョン", kind: "model" },
  { id: "cloud_sync", label: "クラウド同期", kind: "bool" },
  { id: "batch_id", label: "取込バッチID", kind: "uuid" },
  { id: "revision", label: "データ改訂番号", kind: "int" },
  { id: "comment_digest", label: "コメント要約", kind: "code" },
  { id: "remark_flag", label: "備考フラグ", kind: "bool" },
  { id: "country", label: "国", kind: "pref" },
  { id: "prefecture", label: "都道府県", kind: "pref" },
  { id: "plant_code", label: "工場コード", kind: "code" },
  { id: "postal_code", label: "郵便番号", kind: "postal" },
  { id: "address_line1", label: "住所1", kind: "address" },
  { id: "address_line2", label: "住所2", kind: "address" },
  { id: "latitude", label: "緯度", kind: "latlng" },
  { id: "longitude", label: "経度", kind: "latlng" },
  { id: "hazmat_class", label: "危険物区分", kind: "status" },
  { id: "permit_no", label: "許認可番号", kind: "code" },
] as const satisfies readonly ColumnSpec[];

export const COL_COUNT = COLUMNS.length;

export type ColumnId = (typeof COLUMNS)[number]["id"];

export type Row = { [K in ColumnId]: string };

function pad(n: number, w: number) {
  return String(n).padStart(w, "0");
}

/** 行 i・列・seed から数値系セル用のベース整数（20 + i + 列 + seed） */
function numBase(i: number, colIndex: number, seed: number) {
  return 20 + i + colIndex + seed;
}

/**
 * 1 セル分。文字列系は `ラベル-${i}` / `Name ${i}` / `Country-${i}` など、数値系は 20+i 系を文字列化。
 */
function cellValue(i: number, colIndex: number, spec: ColumnSpec, seed: number): string {
  const c = colIndex;
  const base = numBase(i, c, seed);

  switch (spec.kind) {
    case "int":
      return String(base % 100000);
    case "amount":
      return ((base % 500000) / 100).toFixed(2);
    case "decimal1":
      return (base * 0.1).toFixed(1);
    case "pct":
      return `${base % 101}%`;
    case "bool":
      return (i + c + seed) % 2 === 0 ? "OK" : "NG";
    case "date":
      return `date-${i}-${c}`;
    case "datetime":
      return `dt-${i}-${pad(c, 2)}`;
    case "latlng":
      return spec.id === "latitude"
        ? (35.0 + (i % 200) * 0.01).toFixed(4)
        : (137.0 + (c % 180) * 0.01).toFixed(4);
    case "pref":
      return spec.id === "country" ? `Country-${i}` : `Pref-${i}`;
    case "person":
      return spec.id.endsWith("_id") ? `USR-${pad((base % 9000) + 1000, 4)}` : `Name ${i}`;
    default:
      if (spec.id === "equipment_name" || spec.id === "model_name") return `Name ${i}`;
      return `${spec.label}-${i}`;
  }
}

/** 5000×100。各行は列 id → セル文字列の Row。 */
export function buildGrid(seed = 42): Row[] {
  return Array.from({ length: ROW_COUNT }, (_, row) =>
    Object.fromEntries(
      COLUMNS.map((spec, col) => [spec.id, cellValue(row, col, spec, seed)] as const),
    ) as Row,
  );
}
