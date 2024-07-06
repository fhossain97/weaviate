import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { type formattedAPIDogData } from "lib/types";

const columns = [
  "Breed",
  "Description",
  "Hypoallergenic",
  // "Life Span",
  // "Male Weight",
  // "Female Weight",
];

export default function Results({
  data,
}: {
  data: (typeof formattedAPIDogData)[] | undefined;
}) {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
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
            {data && data.length > 0 ? (
              data.map((dog, idx) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                    <TableCell align="center">{dog.name}</TableCell>
                    <TableCell align="center">{dog.description}</TableCell>
                    <TableCell align="center">
                      {dog.hypoallergenic.toString()}
                    </TableCell>
                    {/* <TableCell align="center">
                      Max: {dog.life_span.max}
                      Min: {dog.life_span.min}
                    </TableCell>
                    <TableCell align="center">
                      Max: {dog.male_weight.max}
                      Min: {dog.male_weight.min}
                    </TableCell>
                    <TableCell align="center">
                      Max: {dog.female_weight.max}
                      Min: {dog.female_weight.min}
                    </TableCell> */}
                  </TableRow>
                );
              })
            ) : (
              <Box>No corresponding data found.</Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
