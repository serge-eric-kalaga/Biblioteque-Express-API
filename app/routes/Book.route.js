const express = require("express");
const userRouter = express.Router();


const bookRouter = express.Router();


const {
    getAllBooks,
    getBookByISBN, 
    getBookByAuthor,
    getBookById,
    getBookByTitle,
    createBook,
    updateBook,
    deleteBook,
    addReview,
    updateReview,
    deleteReview,
    findBookByISBNPromise, findBooksByAuthorPromise, findBooksByTitlePromise, getAllBooksAsyncCallback, getBookReviews, removeUserReview
  } = require("../controllers/Book.controller");

bookRouter.get("/isbn-promise/:isbn", findBookByISBNPromise);

bookRouter.get("/author-promise/:author", findBooksByAuthorPromise);

bookRouter.get("/title-promise/:title", findBooksByTitlePromise);

bookRouter.get("/async-callback", getAllBooksAsyncCallback);

bookRouter.get("/:id/reviews", getBookReviews);

bookRouter.delete("/:id/reviews/:reviewId", removeUserReview);
  
bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.get("/isbn/:isbn", getBookByISBN);

bookRouter.get("/title/:title", getBookByTitle);

bookRouter.get("/author/:author", getBookByAuthor);

bookRouter.delete("/:id", deleteBook);

bookRouter.post("/", createBook);

bookRouter.patch("/:id", updateBook);

bookRouter.post("/:id/reviews", addReview);

bookRouter.patch("/reviews/:id", updateReview);

bookRouter.delete("/reviews/:id", deleteReview);
  
module.exports = bookRouter;
