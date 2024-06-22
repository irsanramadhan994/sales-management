import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TablePagination, TextField } from "@mui/material";

const DataTable = ({ rows, columns,onSearch }) => {
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onSearch(event.target.value)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  return (
    <Box style={{ height: "100%", width: "100%" }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <DataGrid
        rows={rows.slice(page * pageSize, page * pageSize + pageSize)}
        columns={columns}
        sx={{ minHeight: "300px" }}
        pageSize={pageSize}
        hideFooterPagination={true}
        hideFooter={true}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        autoHeight
        
      />
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default DataTable;
