"use client";
import { RowUI } from "@/components/BalanceSheets/Table";
import { balanceSheetService } from "@/service/balanceSheetService";
import { useQuery } from "@tanstack/react-query";
import { RowData } from "@/components/BalanceSheets/types";

export default function Home() {
  const queryTable = useQuery({
    queryKey: ["balance-sheet"],
    queryFn: balanceSheetService,
  });
  const reports = queryTable.data?.Reports?.[0];
  const rows = reports?.Rows;

  return (
    <div className="max-w-7xl mx-auto pb-10 px-4">
      <header className="pt-8">
        <h2 className="text-2xl font-semibold leading-none tracking-tight mb-1 text-gray-800">
          {reports?.ReportName}
        </h2>
        <p className="text-sm text-muted-foreground text-gray-500">
          {reports?.ReportTitles?.join(" ")}
        </p>
      </header>
      <section className="mt-4">
        {rows?.map((row: RowData, index: number) => (
          <RowUI data={row} key={`main-row-${index}`} />
        ))}
      </section>
    </div>
  );
}
