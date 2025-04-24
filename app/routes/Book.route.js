const express = require("express");
const userRouter = express.Router();


const bookRouter = express.Router();


const {
    getAllBooks,
    getBookByISBN, 
    getBookByAuthor,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    addReview,
    updateReview,
    deleteReview,
  } = require("../controllers/Book.controller");
  
bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.get("/isbn/:isbn", getBookByISBN);

bookRouter.get("/author/:author", getBookByAuthor);

bookRouter.delete("/:id", deleteBook);

bookRouter.post("/", createBook);

bookRouter.patch("/:id", updateBook);

bookRouter.post("/:id/reviews", addReview);

bookRouter.patch("/reviews/:id", updateReview);

bookRouter.delete("/reviews/:id", deleteReview);
  
module.exports = bookRouter;
