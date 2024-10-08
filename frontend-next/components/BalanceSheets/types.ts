export type Value = { Value: string };
export type Row = { Cells: Array<Value> };
export type Rows = Array<Row>;

export type RowData = {
  RowType: "Header" | "Section";
  Rows: Rows;
  Cells: Array<Value>;
  Title: string;
};
