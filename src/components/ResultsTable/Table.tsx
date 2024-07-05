import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { type DOG_BREEDS_API } from "lib/types";

const columns = [
  "Breed",
  "Description",
  "Life Span",
  "Male Weight",
  "Female Weight",
  "Hypoallergenic",
];

export default function Results({
  data,
}: {
  data: (typeof DOG_BREEDS_API)["data"];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableCell key={idx} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dog, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    <TableCell align="center">{dog.attributes.name}</TableCell>
                    <TableCell align="center">
                      {dog.attributes.description}
                    </TableCell>
                    <TableCell align="center">
                      Max: {dog.attributes.life.max}
                      Min: {dog.attributes.life.min}
                    </TableCell>
                    <TableCell align="center">
                      Max: {dog.attributes.male_weight.max}
                      Min: {dog.attributes.male_weight.min}
                    </TableCell>
                    <TableCell align="center">
                      Max: {dog.attributes.female_weight.max}
                      Min: {dog.attributes.female_weight.min}
                    </TableCell>
                    <TableCell align="center">
                      {dog.attributes.hypoallergenic}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
