import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  MdDelete,
  MdOutlineEditNote,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDetailInApplication } from "../../Redux/reducer/jobSlice";

interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface StickyHeadTableProps<T> {
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

export default function StickyHeadTable<T>({
  columns,
  rows,
  rowsPerPageOptions = [10, 25, 100],
  defaultRowsPerPage = 10,
  tableHeight = 440,
  showActionButtons = false,
  setIsUpdate,
  setIsView,
  setIsDelete,
  setRowData,
}: // deleteJob,
StickyHeadTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const navigator = useNavigate();
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const dispatch = useDispatch()

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (row: any) => {
    setIsUpdate(true);
    setRowData(row);
    console.log("Edit row:", row);
    // Implement your edit logic here
  };
  const handleView = (row: any) => {
    setIsView(true);
    setRowData(row);
    console.log("Edit row:", row);
    // Implement your edit logic here
  };
  const redirect = (row: any) => {
    console.log("row:::",row)
    dispatch(
      setDetailInApplication({ title: row.title, status: row?.status,location: row.location,postedDate:row.created_at})
    );
    navigator(`/employeer/dashboard/job-listing/${row.id}`);
  };

  const handleDelete = (row: any) => {
    setIsDelete(true);
    setRowData(row);
    // deleteJob(row?.id);
    console.log("Delete row:", row);
    // Implement your delete logic here
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
                    const value = row[column.id as keyof T] ;

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
                              <button
                                className="ml-1 text-2xl"
                                title="Edit Job"
                                onClick={() => handleEdit(row)}
                              >
                                <MdOutlineModeEditOutline />
                              </button>
                              <button
                                className="ml-1 text-2xl"
                                title="Delete Job"
                                onClick={() => handleDelete(row)}
                              >
                                <MdDelete color="red" />
                              </button>
                              <button
                                className="ml-1 text-2xl"
                                title="View How Many Candidates Applied"
                                onClick={() => redirect(row)}
                              >
                                <MdOutlineEditNote />
                              </button>
                            </>
                          )}
                        </TableCell>
                      );
                    }


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
