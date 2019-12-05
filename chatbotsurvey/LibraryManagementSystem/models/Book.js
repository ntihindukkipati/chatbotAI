var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({

  isbn: String,
  prof: String,
  updated_date: {type: Date, default: Date.now},
});
/**
 * @class Book
 * @typeof Model<BookSchema>
 */
const Book = mongoose.model('userdatas',BookSchema);
module.exports = Book;
