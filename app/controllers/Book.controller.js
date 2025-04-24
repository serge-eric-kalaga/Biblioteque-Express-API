const { Book, Review, CreateBookModel, UpdateBookModel, CreateReviewModel, UpdateReviewModel } = require("../models/Models");
const { generateISBN } = require("../utils/Functions");

module.exports = {
    async getAllBooks(req, res) {
        try {
            const books = await Book.findAll({ include: [Review] });
            res.Response({ data: books });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },

    async getBookByISBN(req, res) {
        try {
            const book = await Book.findOne({ where: { isbn: req.params.isbn } });
            if (!book) {
                return res.status(404).Response({ message: `Book ${req.params.isbn} not found!` });
            }
            res.Response({ data: book });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },

    async getBookById(req, res) {
        try {
            const book = await Book.findByPk(req.params.id, { include: [Review] });
            if (!book) {
                return res.status(404).Response({ message: `Book ${req.params.id} not found!`  });
            }
            res.Response({ data: book });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },


    async createBook(req, res, next) {
        try {
            await CreateBookModel.validateAsync(req.body);
            req.body.isbn = generateISBN();
            const newBook = await Book.create(req.body);
            res.Response({ data: newBook });
        } catch (error) {
            next(error);
        }
    },

    async updateBook(req, res, next) {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(404).Response({ message: `Book ${req.params.id} not found!` });
            }
            await UpdateBookModel.validateAsync(req.body);
            await book.update(req.body);
            res.Response({ data: book });
        } catch (error) {
            next(error);
        }
    },

    async deleteBook(req, res) {
        try {
            const result = await Book.destroy({ where: { id: req.params.id } });
            if (!result) {
                return res.status(404).Response({ message: `Book ${req.params.id} not found!`  });
            }
            res.Response({ message: "Book deleted successfully!" });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },

    async addReview(req, res, next) {
        try {
            await CreateReviewModel.validateAsync(req.body);
            const review = await Review.create(req.body);
            res.Response({ data: review });
        } catch (error) {
            next(error);
        }
    },

    async updateReview(req, res, next) {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) {
                return res.status(404).Response({ message: "Review not found!" });
            }
            await UpdateReviewModel.validateAsync(req.body);
            await review.update(req.body);
            res.Response({ data: review });
        } catch (error) {
            next(error);
        }
    },

    async deleteReview(req, res) {
        try {
            const result = await Review.destroy({ where: { id: req.params.id } });
            if (!result) {
                return res.status(404).Response({ message: "Review not found!" });
            }
            res.Response({ message: "Review deleted successfully!" });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },
};