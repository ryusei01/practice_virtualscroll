/** 行数（列数は COLUMNS の長さ） */
export const ROW_COUNT = 5000;

export type Row = string[];

/** セル値の生成に使う項目種別 */
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
  /** システム内部キー（英字） */
  id: string;
  /** 画面上の項目名 */
  label: string;
  kind: ColumnKind;
};

/**
 * 100項目: 工場設備の識別・属性・稼働・保全・組織・所在地など、
 * 実務でありそうなマスタ列を想定（値はデモ用の決定論的生成）。
 */
export const COLUMNS: ColumnSpec[] = [
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
  { id: "work_order_no", label: "作業指図番号", kind: "code" },
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
];

export const COL_COUNT = COLUMNS.length;

const DEPTS = [
  "成形課",
  "組立課",
  "加工課",
  "検査課",
  "保全課",
  "動力課",
  "倉庫課",
  "品質保証",
] as const;

const NAMES = [
  "佐藤",
  "鈴木",
  "高橋",
  "田中",
  "伊藤",
  "渡辺",
  "山本",
  "中村",
  "小林",
  "加藤",
] as const;

const VENDORS = [
  "東洋メンテ",
  "日機装サービス",
  "三和保全工業",
  "中部テクノ",
  "北陸プラント",
] as const;

const PREFS = [
  "愛知",
  "岐阜",
  "三重",
  "静岡",
  "長野",
  "滋賀",
  "大阪",
  "兵庫",
] as const;

const STATUSES = ["運転中", "停止", "保全中", "異常", "待機", "段取り中"] as const;
const ALARMS = ["—", "注意", "軽故障", "重故障"] as const;
const SHIFTS = ["未割当", "早番", "中番", "夜番", "昼夜"] as const;
const TOWER = ["緑", "黄", "赤", "点滅", "消灯"] as const;
const MODES = ["AUTO", "MANUAL", "JOG", "MAINT", "REMOTE"] as const;
const DATA_SOURCES = ["SCADA", "MES", "手入力", "バッチ取込", "API"] as const;
const API_STATES = ["同期済", "遅延", "切断", "再送中"] as const;
const EXP_CLASSES = ["非防爆", "Ex d", "Ex e", "Ex n"] as const;

/** 擬似乱数（再現可能なデモ用） */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pad(n: number, w: number) {
  return String(n).padStart(w, "0");
}

const EQUIPMENT_NAMES = [
  "射出成形機 #3",
  "ライン用チラー A",
  "搬送コンベア B",
  "外観検査機",
  "溶接ロボット",
  "AGV充電ステーション",
] as const;

function formatDate(baseDay: number): string {
  const d = new Date(Date.UTC(2019, 0, 1) + baseDay * 86400000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1, 2)}-${pad(d.getUTCDate(), 2)}`;
}

function formatDateTime(baseMin: number): string {
  const ms = Date.UTC(2024, 0, 1, 6, 0) + baseMin * 60000;
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1, 2)}-${pad(d.getUTCDate(), 2)} ${pad(d.getUTCHours(), 2)}:${pad(d.getUTCMinutes(), 2)}`;
}

function cellValue(
  row: number,
  colIndex: number,
  spec: ColumnSpec,
  rand: () => number,
  seed: number,
): string {
  const r = row + 1;
  const c = colIndex;
  const pick = <T,>(arr: readonly T[]) => arr[(row + colIndex) % arr.length]!;
  const rnd = () => rand();

  switch (spec.kind) {
    case "equipId":
      return `EQ-${pad((10000 + (row * 17 + c * 3)) % 90000, 5)}`;
    case "assetNo":
      return `AST-2023-${pad((row * 11 + c) % 100000, 5)}`;
    case "serial":
      return `SN${pad((row + 1) % 1000, 3)}-${pad((8888 + row * 13) % 10000, 4)}`;
    case "model":
      if (spec.id === "equipment_name") return pick(EQUIPMENT_NAMES);
      if (spec.id === "edge_fw_version")
        return `${2 + (row % 3)}.${(row % 24) + 1}.${(colIndex % 18) + 1}`;
      return pick(["VXT-2000", "MP-45X", "FX9-Lite", "ZR-Module", "HL-Compact", "NeoDrive"]);
    case "code":
      return `${spec.id.slice(0, 3).toUpperCase()}-${pad((row * 31 + c * 7) % 1000000, 6)}`;
    case "date":
      return formatDate((row * 19 + c * 5) % 2200);
    case "datetime":
      return formatDateTime((row * 97 + c * 11) % 500000);
    case "dept":
      return pick(DEPTS);
    case "person":
      if (spec.id.endsWith("_id"))
        return `USR-${pad((5000 + row + colIndex * 17) % 9000, 4)}`;
      return `${pick(NAMES)}${(row % 9) + 1}${["", "郎", "子"][(row + colIndex) % 3]}`;
    case "vendor":
      return pick(VENDORS);
    case "amount":
      return ((row * 137 + c * 19) % 500000 / 100).toFixed(2);
    case "int":
      return String((row * 23 + c * 41 + 100) % 100000);
    case "decimal1":
      return (5 + rnd() * 120 + (row % 17) * 0.1).toFixed(1);
    case "pct":
      return `${(row * 3 + c * 7) % 101}%`;
    case "bool":
      return (row + colIndex) % 5 === 0 ? "NG" : "OK";
    case "pref":
      return spec.id === "country" ? "日本" : pick(PREFS);
    case "postal":
      return `${pad((100 + row) % 900 + 100, 3)}-${pad((4000 + row * 3) % 10000, 4)}`;
    case "address":
      return `${pick(PREFS)}市${["北", "南", "東", "西"][(row + c) % 4]}区${(row % 40) + 1}-${(c % 15) + 1}`;
    case "latlng":
      return spec.id === "latitude"
        ? (35.0 + (row % 200) * 0.01).toFixed(4)
        : (137.0 + (c % 180) * 0.01).toFixed(4);
    case "tel":
      return `052-${pad((2000 + row) % 8000, 4)}-${pad((1000 + c * 17) % 9000, 4)}`;
    case "email":
      return `plant-${pad((row % 500) + 1, 3)}@example.co.jp`;
    case "shift":
      return pick(SHIFTS);
    case "mode":
      return pick(MODES);
    case "status":
      if (spec.id === "explosion_class") return pick(EXP_CLASSES);
      if (spec.id === "tower_lamp") return pick(TOWER);
      if (spec.id === "current_mode") return pick(MODES);
      if (spec.id === "data_source") return pick(DATA_SOURCES);
      if (spec.id === "api_link_state") return pick(API_STATES);
      if (spec.id === "hazmat_class") return ["該当なし", "第4類", "第5類", "高圧ガス"][(row + c) % 4]!;
      return pick(STATUSES);
    case "alarm":
      return pick(ALARMS);
    case "uuid":
      return `IMP-${formatDate((row * 13 + colIndex * 41 + seed) % 800)}-${pad(r, 5)}-${pad(c, 2)}`;
    default:
      return "—";
  }
}

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
