import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";


interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface TableForCandiadteJobProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  tableHeight?: number;
  showActionButtons?: boolean;

}

export default function TableForCandiadteJob<T>({
  columns,
  rows,
  rowsPerPageOptions = [10, 25, 100],
  defaultRowsPerPage = 10,
  tableHeight = 440,
  showActionButtons = false,
}: TableForCandiadteJobProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
const navigator = useNavigate()
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: tableHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="bg-blue">
            <TableRow className="text-center!">
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    textAlign: "center",
                    backgroundColor: "#120A2A",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row:any, rowIndex) => {
                console.log("sdfsdfgsdf",row)
                return <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={String(column.id)}
                      align={column.align}
                      style={{ textAlign: "center" }}
                    >
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : String(value)}
                    </TableCell>
                  );
                }
                
                
                
                )}
                {showActionButtons && (
                  <TableCell align="center" style={{ textAlign: "center" }}>
                  <button onClick={()=>navigator(`/candidate/dashboard/job-list/${row?.id}`)} className={`text-center bg-blue-600 p-2 rounded-lg cursor-pointer hover:bg-blue-900 text-white ${row.status=="active"?"bg-blue-600 hover:bg-blue-900":"bg-gray-400 hover:bg-gray-600"}`}>Apply</button>
                  </TableCell>
                )}
              </TableRow>
})}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
