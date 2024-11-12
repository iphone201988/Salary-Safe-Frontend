import React from 'react';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Table,
  Row,
  Cell,
} from '@tanstack/react-table';

// Define the candidate interface
interface CandidateRecommendation {
  name: string;
  range: string;
  recommendation: string;
}

// Define columns with `ColumnDef`
const columns: ColumnDef<CandidateRecommendation>[] = [
  { accessorKey: 'name', header: 'Candidate' },
  { accessorKey: 'range', header: 'Salary Range' },
  { accessorKey: 'recommendation', header: 'Salary-Safe Recommendation' },
];

// Table component
const CandidateTable: React.FC<{ data: CandidateRecommendation[] }> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full bg-white rounded-lg shadow-md ">
      <TableHead table={table} />
      <TableBody table={table} />
    </table>
  );
};

// Table Head component
const TableHead: React.FC<{ table: Table<CandidateRecommendation> }> = ({ table }) => (
  <thead>
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            className="px-4 py-2 border-b font-medium text-left text-gray-600"
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

// Table Body component
const TableBody: React.FC<{ table: Table<CandidateRecommendation> }> = ({ table }) => (
  <tbody>
    {table.getRowModel().rows.map((row: Row<CandidateRecommendation>) => (
      <tr key={row.id} className="hover:bg-gray-50">
        {row.getVisibleCells().map((cell: Cell<CandidateRecommendation, any>) => (
          <td
            key={cell.id}
            className="px-4 py-2 border-b text-gray-700"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

export default CandidateTable;
