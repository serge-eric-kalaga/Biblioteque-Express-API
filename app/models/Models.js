const { User, CreateUserModel, UpdateUserModel } = require("./User.model");
const { DB, connect_db } = require("../configs/Database");

// Compte.hasMany(Transaction, { onDelete: "CASCADE" });
// Transaction.belongsTo(Compte);

// DB.sync({ force: true });

module.exports = {
  User,
  CreateUserModel,
  UpdateUserModel,
};
