const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
    content: { type: String, required: true},
});

module.exports = mongoose.model('Todolist', todolistSchema);