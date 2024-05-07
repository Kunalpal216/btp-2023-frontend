import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

function PaginatedTable({ fetchFunction }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchFunction(page)
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [page, rowsPerPage, fetchFunction]);

  const handleChangePage = (event, newPage) => {
    if(data==[] && newPage>page){
      return;
    }
    setPage(newPage);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow>
              <TableCell>Place Name</TableCell>
              <TableCell>District</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>latitude</TableCell>
              <TableCell>longitude</TableCell>
              <TableCell>area_type</TableCell>
              <TableCell>accident_type</TableCell>
              <TableCell>persons_killed</TableCell>
              <TableCell>persons_grievously_injured</TableCell>
              <TableCell>persons_minor_injured</TableCell>
              <TableCell>no_motorized_vehicles</TableCell>
              <TableCell>no_non_moterized_vehicles</TableCell>
              <TableCell>no_pedestrians_involved</TableCell>
              <TableCell>collosion_type</TableCell>
              <TableCell>road_type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.place_name}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.latitude}</TableCell>
                <TableCell>{row.longitude}</TableCell>
                <TableCell>{row.area_type}</TableCell>
                <TableCell>{row.accident_type}</TableCell>
                <TableCell>{row.persons_killed}</TableCell>
                <TableCell>{row.persons_grievously_injured}</TableCell>
                <TableCell>{row.persons_minor_injured}</TableCell>
                <TableCell>{row.no_motorized_vehicles}</TableCell>
                <TableCell>{row.no_non_moterized_vehicles}</TableCell>
                <TableCell>{row.no_pedestrians_involved}</TableCell>
                <TableCell>{row.collosion_type}</TableCell>
                <TableCell>{row.road_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default PaginatedTable;
