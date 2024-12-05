import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEye } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface JobApplicantsTableProps<T> {
  columns: Column<any>[];
  rows: T[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  tableHeight?: number;
  rowEditData?: any;
  rowdeleteData?: any;
  isDelete?: boolean;
  setIsDelete?: any;
  setIsUpdate?: any;
  setIsView?: any;
  isUpdate?: boolean;
  showActionButtons?: boolean;
  setRowData?: any;
  deleteJob?: any;
}

export default function JobApplicantsTable<T>({
  columns,
  rows,
  rowsPerPageOptions = [10, 25, 100],
  defaultRowsPerPage = 10,
  tableHeight = 440,
  showActionButtons = false,
  setIsView,
  setRowData,
}: // deleteJob,
JobApplicantsTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  // const navigator = useNavigate();
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleView = (row: any) => {
    console.log("kdhfkjsh",row)
    setIsView(true);
    setRowData(row);
    console.log("Edit row:", row);
    // Implement your edit logic here
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
              .map((row, rowIndex) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={rowIndex} /* onClick={()=>redirect(row)} */
                >
                  {columns.map((column) => {
                    if (column.id === "actions") {
                      return (
                        <TableCell
                          key={String(column.id)}
                          align={column.align}
                          style={{ textAlign: "center" }}
                        >
                          {showActionButtons && (
                            <>
                              <button
                                className="text-2xl"
                                title="View Job"
                                onClick={() => handleView(row)}
                              >
                                <FaEye />
                              </button>
                            </>
                          )}
                        </TableCell>
                      );
                    }

                    const value:any = row[column.id as keyof T];

                    return (
                      <TableCell
                        key={String(column.id)}
                        align={column.align}
                        style={{ textAlign: "center" }}
                      >
                        {column.format &&
                        column.id !== "actions" &&
                        typeof value === "number"
                          ? column.format(value)
                          : String(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
