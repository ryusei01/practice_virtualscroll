# Row / `KindForId` notes

Notes on how `src/data.ts` ties **`ColumnId`**, **`Row` cell types**, and per-column **`kind`** to the `COLUMNS` table (`as const satisfies`).

## Goals

- Use column **`id` as keys** in `Row`, with **some columns as `number`** and the rest **`string`**.
- When you add or change rows in `COLUMNS`, **types should follow the metadata** (especially `kind`).

Current rule (matches the code):

- Columns whose **`kind` is `"int"`** in `COLUMNS` → **`number`** on `Row`
- All other columns → **`string`**

## Relevant types (excerpt)

```ts
export type ColumnId = (typeof COLUMNS)[number]["id"];

type ColumnEntry = (typeof COLUMNS)[number];
type KindForId<I extends ColumnId> = Extract<ColumnEntry, { id: I }>["kind"];

export type Row = {
  [K in ColumnId]: KindForId<K> extends "int" ? number : string;
};
```

## What `ColumnEntry` is

```ts
type ColumnEntry = (typeof COLUMNS)[number];
```

- `COLUMNS` is read as a **tuple whose element type is a union** of all column objects.
- `ColumnEntry` means “**exactly one** of the ~100 `{ id, label, kind }` objects”.

## What `KindForId<I>` does

```ts
type KindForId<I extends ColumnId> = Extract<ColumnEntry, { id: I }>["kind"];
```

### Step 1: generic `I`

- `I` is a **literal column id** (e.g. `"floor"`, `"revision"`).
- `I extends ColumnId` means only valid ids are allowed.

### Step 2: `Extract<ColumnEntry, { id: I }>`

- `Extract<A, B>` keeps only members of union `A` that are assignable to `B`.
- Here it keeps the **single object type** whose `id` is exactly `I` (assuming no duplicate ids).
- Example: for `KindForId<"floor">`, you keep `{ id: "floor", label: "...", kind: "int" }`.

### Step 3: `["kind"]`

- Take only the **`kind` property type** of that object.
- Example: `KindForId<"floor">` → **`"int"`** (literal type).

So: **look up the `kind` literal for column id `I` straight from the `COLUMNS` type.**

## `Row` as a mapped type

```ts
export type Row = {
  [K in ColumnId]: KindForId<K> extends "int" ? number : string;
};
```

- For each key `K` in `ColumnId`, compute `KindForId<K>`.
- If it extends `"int"`, the property type is **`number`**; otherwise **`string`**.
- Changing `kind` in `COLUMNS` updates `Row` automatically.

## Runtime must match (`cellValue` / `buildGrid`)

- `cellValue` returns **`string | number`**.
- For `spec.kind === "int"`, return a **`number`** (do not wrap with `String`).
- Other branches return display **`string`** values.

`buildGrid` asserts the object as `Row`. If you return a `number` for a column that `Row` still types as `string`, types and data disagree—**change `Row` and `cellValue` together**.

## UI

Cells may be `string | number`. Attributes like HTML **`title`** expect strings—use `String(value)` (already done in `VirtualDataTable`).

## Extensions

### Also type `amount` / `decimal1` as `number`

Widen the conditional on `Row`:

```ts
type KindForId<I extends ColumnId> = Extract<ColumnEntry, { id: I }>["kind"];

type RowCell<K extends ColumnId> =
  KindForId<K> extends "int" | "amount" | "decimal1" ? number : string;

export type Row = { [K in ColumnId]: RowCell<K> };
```

Then update **`cellValue`** so those `kind`s return **`number`**.

### Pin `number` by column id only

Override by an id union instead of by `kind`:

```ts
type NumericId = "floor" | "revision"; // example

export type Row = Omit<{ [K in ColumnId]: string }, NumericId> & {
  [K in NumericId]: number;
};
```

Keep **`NumericId`** in sync with what **`cellValue`** actually returns.

---

## References

- Implementation: `src/data.ts` (`ColumnId`, `KindForId`, `Row`, `cellValue`, `buildGrid`)
- Rendering: `src/VirtualDataTable.tsx` (`title` uses `String(...)`)
