const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
    user_id: { type: Number, required: true},
    list: [
       { type: String, required: true}
    ] 
});

module.exports = mongoose.model('Todolist', todolistSchema);