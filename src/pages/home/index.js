import React, { useEffect, useState } from "react";
import { getDataUser } from "src/modules/getData";
import { useSelector, useDispatch } from "react-redux";
import { userData } from "src/store/action/userAction";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Link from "next/link";
import { Button } from "@mui/material";
import Image from "next/image";
import TextField from "@mui/material/TextField";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 24,
  },
}));

const Index = () => {
  // const data = useSelector((state) => state.users);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getDataUser()
      .then((res) => {
        setData(res.data.results);
        console.log("data : ", res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(userData(data));
  }, [dispatch]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    setFilteredData(data);
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // console.log(searchWord);
    const newFilter = data.filter((value) => {
      return value.id.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(data);
    } else {
      setFilteredData(newFilter);
    }
  };

  // console.log("object", data.id);

  return (
    <>
      <div
        style={{
          width: "75%",
          margin: "auto",
          height: "auto",
          position: "relative",
          zIndex: "1",
          color: "black",
        }}
      >
        <Link href="/">
          <Button
            style={{
              color: "black",
              width: "100%",
              margin: "auto",
              height: "auto",
            }}
          >
            Welcome to Admin
          </Button>
        </Link>
        <TextField
          id="outlined-helperText"
          label="Search"
          // defaultValue=" "
          value={wordEntered}
          onChange={handleFilter}
        />
        {/* <div className="searchIcon">
          {filteredData.length === 0 ? (
            <p>search</p>
          ) : (
            <Button onClick={clearInput}>Clear Search</Button>
          )}
        </div> */}
        <TableContainer component={Paper}>
          <Table
            sx={{ width: 350, width: "100%" }}
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ fontWeight: 900, fontSize: 16 }}>
                  nama
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: 900, fontSize: 16 }}
                  align="right"
                >
                  address
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: 900, fontSize: 16 }}
                  align="right"
                >
                  cell
                </StyledTableCell>
                <StyledTableCell
                  style={{ fontWeight: 900, fontSize: 16 }}
                  align="right"
                >
                  dob
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: 900,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  email
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    fontWeight: 900,
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  pic
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((item) => (
                <TableRow key={item.id.value}>
                  <TableCell style={{ width: 160 }} align="right">
                    {item.id.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {item.email}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {item.address}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {item.phone}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {/* {item.dob} */}
                  </TableCell>
                  {/* <TableCell component="th" scope="item"> */}
                  {/* <Image
                      src={
                        item
                          ? process.env.NEXT_PUBLIC_API_URL +
                            "/" +
                            JSON.parse(item.picture)
                          : defaultImages
                      }
                      alt="user"
                      width={50}
                      height={50}
                      onError={() => setSrcImg(defaultImages)}
                    /> */}
                  {/* </TableCell> */}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Index;
