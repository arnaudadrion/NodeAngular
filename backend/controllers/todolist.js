const Todolist = require('../models/Todolist');

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
            if (!todolist) {
                todolist = new Todolist({
                    userId: req.auth.userId,
                    list: [ req.body.task ]
                });
            } else {
                todolist.list.push(req.body.task);
            }

            todolist.save()
                .then(() => { res.status(201).json({ success: "true", message: 'Tache enregistrée !' })})
                .catch(error => { res.status(400).json({ success: "false", message: error })})
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    );
};

exports.updateOrder = (req, res, next) => {
    Todolist.findOne({
        userId: req.auth.userId
    }).then(
        (todolist) => {
            todolist.list = req.body.list;
            todolist.save()
                .then(() => { res.status(201).json({ success: "true", message: 'Liste enregistrée !' })})
                .catch(error => { res.status(400).json({ success: "false", message: error })})
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    );
};

exports.deleteTask = (req, res, next) => {
    Todolist.findOne({
        userId: req.auth.userId
    }).then(
        (todolist) => {
            todolist.list.filter((value, index) => {
                if (value === req.body.task) {
                    todolist.list.splice(index, 1);
                    return true;
                }
                return false;
            });

            todolist.save()
                .then(() => { res.status(201).json({ success: "true", message: 'Tache supprimée !' })})
                .catch(error => { res.status(400).json({ success: "false", message: error })})
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    );
};