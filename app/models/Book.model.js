const { Sequelize, DataTypes, Model } = require("sequelize");
const Joi = require("joi");
const { DB } = require("../configs/Database");


const Book = DB.define(
    "Book",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {}
);


const Review = DB.define(
    "Review",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },
    {}
);
// Relationship
Book.hasMany(Review, { foreignKey: "book_id", onDelete: "CASCADE" });
Review.belongsTo(Book, { foreignKey: "book_id" });



const CreateBookModel = Joi.object({
    title: Joi.string().required().min(3).max(200),
    author: Joi.string().required().min(3).max(200),
    description: Joi.string().optional().max(1000),
    publication_date: Joi.date().optional(),
    genre: Joi.string().optional().max(100),
    isbn: Joi.string().optional().max(20),
});
const UpdateBookModel = Joi.object({
    title: Joi.string().optional().min(3).max(200),
    author: Joi.string().optional().min(3).max(200),
    description: Joi.string().optional().max(1000),
    publication_date: Joi.date().optional(),
    genre: Joi.string().optional().max(100),
    isbn: Joi.string().optional().max(20),
})

const CreateReviewModel = Joi.object({
    book_id: Joi.number().required(),
    user_id: Joi.number().required(),
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().optional().max(1000),
});
const UpdateReviewModel = Joi.object({
    book_id: Joi.number().optional(),
    user_id: Joi.number().optional(),
    rating: Joi.number().optional().min(1).max(5),
    comment: Joi.string().optional().max(1000),
});


module.exports = { Book, Review, CreateBookModel, UpdateBookModel, CreateReviewModel, UpdateReviewModel };