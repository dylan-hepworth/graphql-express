const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    itemId: Number,
    item: String,
    completed: Boolean
}, { collection:"TodoList" });

module.exports = mongoose.model('Todo', todoSchema);