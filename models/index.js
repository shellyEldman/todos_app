const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');


