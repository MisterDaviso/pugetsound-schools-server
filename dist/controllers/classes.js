"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Classes Controller
 */
var express_1 = require("express");
var db = require('../models');
var router = express_1.Router();
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
// PUT more/less students into a class
router.put('/students/:id', function (req, res) {
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
    db.Class.find({ students: req.params.id })
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
