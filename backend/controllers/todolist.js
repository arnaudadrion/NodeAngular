const Todolist = require('../models/todolist');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const todolist = require('../models/todolist');

exports.list = (req, res, next) => {
    Todolist.findOne({
        userId: req.auth.userId
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

exports.addTask = (req, res, next) => {
    Todolist.findOne({
        userId: req.auth.userId
    }).then(
        (todolist) => {
            console.log(todolist)
            if (!todolist) {
                todolist = new Todolist({
                    userId: req.auth.userId,
                    list: [ req.body.task ]
                });
console.log(todolist)
                thing.save()
                    .then(() => { console.log(546);res.status(201).json({message: 'Tache enregistrée !'})})
                    .catch(error => { res.status(400).json( { error })})
            } else {

            }
        }
    ).catch(
        (error) => {
            res.status(40).json({
                error: error
            })
        }
    )
};

exports.deleteTask = (req, res, next) => {
    
};