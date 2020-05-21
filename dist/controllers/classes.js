"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Classes Controller
 */
var express_1 = require("express");
var db = require('../models');
var router = express_1.Router();
// GET all classes
router.get('/', function (req, res) {
    db.Class.find()
        .then(function (c) {
        console.log("Class:", c[0]);
        console.log("Students:", c[0].students);
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// POST a new class
router.post('/', function (req, res) {
    db.Class.create(req.body)
        .then(function (c) {
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET a class by ID 
router.get('/:id', function (req, res) {
    db.Class.findOne({ _id: req.params.id })
        .then(function (c) {
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// PUT a student that signs up in a class
router.put('/signup/:id', function (req, res) {
    // Takes in an array of tuple arrays
    var newStudent = {
        student: req.body.studentid,
        grade: ''
    };
    db.Class.updateOne({ _id: req.params.id }, { $push: { students: newStudent } })
        .then(function (c) {
        console.log("Successfully added student");
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// PUT updated info into a class by ID
router.put('/:id', function (req, res) {
    db.Class.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(function (c) {
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all classes for a specified student
router.get('/student/:id', function (req, res) {
    db.Class.find({ students: { $elemMatch: { student: req.params.id } } })
        .then(function (classes) {
        res.send(classes);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all classes for a specified teacher
router.get('/teacher/:id', function (req, res) {
    db.Class.find({ teacher: req.params.id })
        .then(function (classes) {
        res.send(classes);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
module.exports = router;
