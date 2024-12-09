import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
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
}: JobApplicantsTableProps<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [color, setColor] = useState<{ [key: string]: string }>({});
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    // Initialize color state based on initial rows data
    const initialColors: { [key: string]: string } = {};
    rows.forEach((row: any) => {
      initialColors[row.id] = getColor(row.status); // Assuming `row.id` is unique
    });
    setColor(initialColors);
  }, [rows]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getColor = (value: string) => {
    switch (value) {
      case "accepted":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "pending":
      default:
        return "text-yellow-300";
    }
  };

  const handleStatusChange = async(e: React.ChangeEvent<HTMLSelectElement>, row: any) => {
    const status = e.target.value;
    const updatedColor = getColor(status);
    setColor((prevColors) => ({
      ...prevColors,
      [row.id]: updatedColor,
    }));
    await axios.patch("https://salarysafe.ai/api/v1/jobs/applications/{application_id}/status".replace("{application_id}",row.id),{status:status},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

  };

  const handleView = (row: any) => {
    setIsView(true);
    setRowData(row);
    console.log("Edit row:", row);
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
              .map((row: any, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    if (column.id === "status") {
                      const value: any = row[column.id as keyof T];
                      return (
                        <TableCell key={String(column.id)} align={column.align}>
                          <select
                            className={`p-2 rounded ${color[row.id] || ""}`}
                            onChange={(e) => handleStatusChange(e, row)}
                            // value={value}
                          >
                            <option className="text-yellow-300" value="pending" selected={value==="pending"}>
                              Pending
                            </option>
                            <option className="text-green-500" value="accepted" selected={value==="accepted"}>
                            Accepted
                            </option>
                            <option className="text-red-500" value="rejected" selected={value==="rejected"}>
                              Rejected
                            </option>
                          </select>
                        </TableCell>
                      );
                    }
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

                    const value: any = row[column.id as keyof T];
                    return (
                      <TableCell
                        key={String(column.id)}
                        align={column.align}
                        style={{ textAlign: "center" }}
                      >
                        {column.format &&
                        column.id !== "actions" &&
                        column.id !== "status" &&
                        typeof value === "number"
                          ? column.format(value)
                          : value}
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
