const { User, CreateUserModel, UpdateUserModel } = require("./User.model");
const { Book, Review, CreateBookModel, UpdateBookModel, CreateReviewModel, UpdateReviewModel } = require("./Book.model");
const { DB, connect_db } = require("../configs/Database");


module.exports = {
  User,
  Book,
  Review,
  CreateBookModel,
  UpdateBookModel,
  CreateUserModel,
  UpdateUserModel,
  CreateReviewModel,
  UpdateReviewModel,
};

DB.sync({ force: true });