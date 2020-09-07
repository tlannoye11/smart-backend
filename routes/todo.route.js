const express = require("express");
const todoRouter = express.Router();

let Todo = require("../models/todo.model");

todoRouter.get("/", (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRouter.get("/:id", (req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

todoRouter.post("/add", (req, res) => {
    let todo = new Todo({
        todo_description: req.body.todo_description,
        todo_responsible: req.body.todo_responsible,
        todo_priority: req.body.todo_priority,
        todo_completed: req.body.todo_completed
    });
    console.log("BODY:", req.body);
    console.log("DESC:",req.body.todo_description);
    console.log("New Todo:",todo);
    todo.save()
        .then((todo) => {
            res.status(200).json({ todo: "todo added successfully" });
        })
        .catch((err) => {
            res.status(400).send("failed to add new todo");
        });
});

todoRouter.post("/update/:id", (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send("no data found");
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save()
                .then((todo) => {
                    res.json("Todo has been updated");
                })
                .catch((err) => {
                    res.status(400).send("failed to update todo");
                });
        }
    });
});

todoRouter.delete("/delete/:id", (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(todo);
        }
    });
});

module.exports = todoRouter;
