const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
    userId: { type: String, required: true},
    list: [ String ] 
});

module.exports = mongoose.model('Todolist', todolistSchema);