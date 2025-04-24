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
  
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         description:
 *           type: string
 *           description: A brief description of the book
 *         publication_date:
 *           type: string
 *           format: date
 *           description: The publication date of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         isbn:
 *           type: string
 *           description: The ISBN of the book
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the review
 *         book_id:
 *           type: integer
 *           description: The ID of the book being reviewed
 *         user_id:
 *           type: integer
 *           description: The ID of the user who wrote the review
 *         rating:
 *           type: integer
 *           description: The rating given by the user (1-5)
 *         comment:
 *           type: string
 *           description: The comment provided by the user
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
bookRouter.get("/", getAllBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 */
bookRouter.post("/", createBook);

/**
 * @swagger
 * /books/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
bookRouter.patch("/:id", updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
bookRouter.delete("/:id", deleteBook);

/**
 * @swagger
 * /books/{id}/reviews:
 *   post:
 *     summary: Add a review to a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review added successfully
 */
bookRouter.post("/:id/reviews", addReview);

/**
 * @swagger
 * /books/reviews/{id}:
 *   patch:
 *     summary: Update a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
bookRouter.patch("/reviews/:id", updateReview);

/**
 * @swagger
 * /books/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
bookRouter.delete("/reviews/:id", deleteReview);
  
  module.exports = bookRouter;
