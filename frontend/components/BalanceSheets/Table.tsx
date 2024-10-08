import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { Row, Value, RowData } from "./types";
import { clsx } from "clsx";

function format(value: string) {
  if (isNaN(Number(value))) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

function Indicate({
  current,
  previous,
}: {
  current: string;
  previous: string;
}) {
  const currentNumber = Number(current);
  const previousNumber = Number(previous);

  if (currentNumber === previousNumber) return null;

  if (currentNumber > previousNumber) {
    return <ArrowTrendingUpIcon className="size-4 text-green-800" />;
  }

  return <ArrowTrendingDownIcon className="size-4 text-red-800" />;
}

function InnerRow({
  data,
}: {
  data: Array<{ Cells: Array<{ Value: string }> }>;
}) {
  if (!data?.length) {
    return <p className="text-center py-2 text-xs text-gray-500">No Data</p>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((row: Row, index: number) => (
        <li
          key={`cells-${index}`}
          className={clsx(
            "flex py-2 hover:bg-slate-100",
            row.Cells[0].Value.toLowerCase().includes("total")
              ? "bg-slate-200 hover:bg-slate-300"
              : "",
            row.Cells[0].Value.toLowerCase().includes("net")
              ? "bg-slate-300 hover:bg-slate-400"
              : ""
          )}
        >
          <div className="grid grid-cols-3 w-full [&>*:nth-child(1)]:flex [&>*:nth-child(1)]:items-center [&>*:nth-child(2)]:text-right [&>*:nth-child(3)]:text-right ">
            {row.Cells?.map((cell: Value, innerIndex: number) => (
              <div key={`cell-${innerIndex}`} className="text-sm px-2 gap-2">
                {format(cell.Value)}
                {innerIndex === 0 &&
                (row.Cells[0].Value.toLowerCase().includes("total") ||
                  row.Cells[0].Value.toLowerCase().includes("net")) ? (
                  <Indicate
                    current={row.Cells?.[1]?.Value as string}
                    previous={row.Cells?.[2]?.Value as string}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function RowUI({ data }: { data: RowData }) {
  if (data.RowType === "Header") {
    return (
      <header className="grid grid-cols-3 [&>*:nth-child(2)]:text-right [&>*:nth-child(3)]:text-right sticky top-0 bg-white/90">
        {data.Cells.map((cell, index: number) => (
          <div
            className="text-base font-semibold py-4 flex justify-end items-center gap-2 text-gray-700"
            key={`header-${index}`}
          >
            {cell.Value !== "" ? (
              <CalendarIcon className="size-6 text-gray-600" />
            ) : null}
            {cell.Value}
          </div>
        ))}
      </header>
    );
  }

  return (
    <div className="divide-y-2 divide-gray-200 pb-8">
      <p className="text-md font-semibold leading-6 text-gray-900 px-2">
        {data.Title}
      </p>
      <InnerRow data={data.Rows} />
    </div>
  );
}
