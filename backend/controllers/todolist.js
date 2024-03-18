const Todolist = require('../models/todolist');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const todolist = require('../models/todolist');

exports.list = (req, res, next) => {
    Todolist.findOne({
        user_id: req.params.user_id
    }).then(
        (todolist) => {
            res.status(200).json(todolist);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.add = (req, res, next) => {
    
};

exports.delete = (req, res, next) => {
    
};