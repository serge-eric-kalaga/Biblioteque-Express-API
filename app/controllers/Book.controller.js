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

    async getAllBooksAsyncCallback(req, res) {
        try {
            const books = await Book.findAll({ include: [Review] });

            const handleResponse = (data) => {
                res.Response({ data: data });
            };

            handleResponse(books);

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

    async findBookByISBNPromise(req, res) {
        const isbn = req.params.isbn;

        Book.findOne({ where: { isbn: isbn } })
            .then((book) => {
                if (!book) {
                    return res.status(404).Response({ message: `Book with ISBN ${isbn} not found!` });
                }
                res.Response({ data: book });
            })
            .catch((error) => {
                res.status(400).Response({ message: error.message });
            });
    }
    ,

    async getBookByAuthor(req, res) {
        try {
            const books = await Book.findAll({ where: { author: req.params.author } });
            res.Response({ data: books });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },

    async findBooksByAuthorPromise(req, res) {
        const author = req.params.author;

        Book.findAll({ where: { author: author } })
            .then((books) => {
                if (books.length === 0) {
                    return res.status(404).Response({ message: `No books found by author ${author}` });
                }
                res.Response({ data: books });
            })
            .catch((error) => {
                res.status(400).Response({ message: error.message });
            });
    },

    async findBooksByTitlePromise(req, res) {
        const title = req.params.title;

        Book.findAll({ where: { title: title } })
            .then((books) => {
                if (books.length === 0) {
                    return res.status(404).Response({ message: `No books found with title ${title}` });
                }
                res.Response({ data: books });
            })
            .catch((error) => {
                res.status(400).Response({ message: error.message });
            });
    },


    async getBookByTitle(req, res) {
        try {
            const books = await Book.findAll({ where: { title: req.params.title } });
            res.Response({ data: books });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    },

    async getBookById(req, res) {
        try {
            const book = await Book.findByPk(req.params.id, { include: [Review] });
            if (!book) {
                return res.status(404).Response({ message: `Book ${req.params.id} not found!` });
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
            // verify if id is valid
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).Response({ message: "Invalid ID format!" });
            }

            const result = await Book.destroy({ where: { id: id } });
            if (!result) {
                return res.status(404).Response({ message: `Book ${id} not found!` });
            }
            res.Response({ message: "Book deleted successfully!" });
        } catch (error) {
            console.log(error);

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

    async getBookReviews(req, res) {
        try {
            const book = await Book.findByPk(req.params.id, { include: [Review] });
            if (!book) {
                return res.status(404).Response({ message: `Book ${req.params.id} not found!` });
            }
            res.Response({ data: book.Reviews });
        } catch (error) {
            res.status(400).Response({ message: error.message });
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

    async removeUserReview(req, res) {
        try {
            const review = await Review.findByPk(req.params.id);
            if (!review) {
                return res.status(404).Response({ message: "Review not found!" });
            }

            if (review.userId !== req.user.id) {
                return res.status(403).Response({ message: "You are not authorized to delete this review!" });
            }

            const result = await Review.destroy({ where: { id: req.params.id } });
            if (!result) {
                return res.status(404).Response({ message: "Review not found!" });
            }

            res.Response({ message: "Review deleted successfully!" });
        } catch (error) {
            res.status(400).Response({ message: error.message });
        }
    }

};