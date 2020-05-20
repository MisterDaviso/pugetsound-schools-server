"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db = require('../models');
//let router = require('express').Router()
var router = express_1.Router();
// POST a new assignment to a class
router.post('/class/:classId', function (req, res) {
    db.Assignment.create(req.body)
        .then(function (as) {
        res.send(as);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all assignments for a class
router.get('/class/:classId', function (req, res) {
    db.Assignment.find({ class: req.params.classId })
        .then(function (as) {
        res.send(as);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all assignments for a student
router.get('/student/:studentId', function (req, res) {
});
// GET an assignment by id
router.get('/:id', function (req, res) {
    db.Assignment.findOne({ _id: req.params.id })
        .then(function (as) {
        res.send(as);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
module.exports = router;
