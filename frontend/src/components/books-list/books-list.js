import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  TablePagination,
//   TextField, // Import TextField component
} from "@mui/material";
import { BackendApi } from "../../client/backend-api";
import { useUser } from "../../context/user-context";
import classes from "./styles.module.css";

export const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeBookIsbn, setActiveBookIsbn] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isAdmin, user } = useUser();
  //const [filter, setFilter] = useState(""); // Add filter state

  const fetchBooks = async () => {
    const { books } = await BackendApi.book.getAllBooks();
    setBooks(books);
  };

  const fetchUserBook = async () => {
    const { books } = await BackendApi.user.getBorrowBook();
    setBorrowedBook(books);
  };

  const deleteBook = () => {
    if (activeBookIsbn && books.length) {
      BackendApi.book.deleteBook(activeBookIsbn)
        .then(({ success }) => {
          fetchBooks().catch(console.error);
          setOpenModal(false);
          setActiveBookIsbn("");
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    fetchBooks().catch(console.error);
    fetchUserBook().catch(console.error);
  }, [user]);

  // Handle filter change
//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

  // Filter books based on filter criteria
//   const filteredBooks = books.filter((book) => {
//     const { title, author, subject, publishDate } = book;

//     // Check if any of the book properties contain the search value
//     return (
//       title.toLowerCase().includes(filter.toLowerCase()) ||
//       author.toLowerCase().includes(filter.toLowerCase()) ||
//       subject.toLowerCase().includes(filter.toLowerCase()) ||
//       publishDate.toLowerCase().includes(filter.toLowerCase())
//     );
//   });

  return (
    <>
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
        <Typography variant="h5">List Of Books</Typography>
        {isAdmin && (
          <Button variant="contained" color="primary" component={RouterLink} to="/admin/books/add">
            Add Book
          </Button>
        )}
      </div>
      {/* <TextField
        label="Filter"
        variant="outlined"
        value={filter}
        // onChange={handleFilterChange}
      /> */}
      {books.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>

                    
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">Author</TableCell>
                                        <TableCell>Subject</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Available</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell>Action</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : books
                                    ).map((book) => (
                                        <TableRow key={book.isbn}>
                                            <TableCell component="th" scope="row">
                                                {book.name}
                                            </TableCell>
                                            <TableCell align="right">{book.isbn}</TableCell>
                                            <TableCell>{book.category}</TableCell>
                                            <TableCell align="right">{book.quantity}</TableCell>
                                            <TableCell align="right">{book.availableQuantity}</TableCell>
                                            <TableCell align="right">{`$${book.price}`}</TableCell>

                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/books/${book.isbn}`}
                                                    >
                                                        View
                                                    </Button>
                                                    {isAdmin && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                component={RouterLink}
                                                                size="small"
                                                                to={`/admin/books/${book.isbn}/edit`}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                size="small"
                                                                onClick={(e) => {
                                                                    setActiveBookIsbn(book.isbn)
                                                                    setOpenModal(true)
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={books.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                        <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <h2>Are you sure?</h2>
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={deleteBook}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>
                    </div>
                </>
            ) : (
                <Typography variant="h5">No books found!</Typography>
            )}

            {
                user && !isAdmin && (
                    <>
                        <div className={`${classes.pageHeader} ${classes.mb2}`}>
                            <Typography variant="h5">Borrowed Books</Typography>
                        </div>
                        {borrowedBook.length > 0 ? (
                            <>
                                <div className={classes.tableContainer}>
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell align="right">Author</TableCell>
                                                    <TableCell>Subject</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {borrowedBook.map((book) => (
                                                    <TableRow key={book.isbn}>
                                                        <TableCell component="th" scope="row">
                                                            {book.name}
                                                        </TableCell>
                                                        <TableCell align="right">{book.isbn}</TableCell>
                                                        <TableCell>{book.category}</TableCell>
                                                        <TableCell align="right">{`$${book.price}`}</TableCell>
                                                        <TableCell>
                                                            <div className={classes.actionsContainer}>
                                                                <Button
                                                                    variant="contained"
                                                                    component={RouterLink}
                                                                    size="small"
                                                                    to={`/books/${book.isbn}`}
                                                                >
                                                                    View
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </>
                        ) : (
                            <Typography variant="h5">No books issued!</Typography>
                        )}
                    </>
                )
            }
    </>
  );
};
