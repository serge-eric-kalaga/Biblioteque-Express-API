const express = require("express");
const userRouter = express.Router();


const bookRouter = express.Router();


const {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    addReview,
    updateReview,
    deleteReview,
  } = require("../controllers/Book.controller");
  
bookRouter.get("/", getAllBooks);

bookRouter.post("/", createBook);

bookRouter.patch("/:id", updateBook);

bookRouter.delete("/:id", deleteBook);

bookRouter.post("/:id/reviews", addReview);

bookRouter.patch("/reviews/:id", updateReview);

bookRouter.delete("/reviews/:id", deleteReview);
  
module.exports = bookRouter;
