"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Assignments Controller
 */
var express_1 = require("express");
var db = require('../models');
var router = express_1.Router();
/**
 * POST. Create a new assignement for a class
 * @param req.params.classid    Class ref id
 * @param req.body.teacher      Teacher User ref id
 * @param req.body.students     An array of student ref id's
 * @param req.body.question     A string containing the question(s)
 */
router.post('/class/:classid', function (req, res) {
    var students = [];
    req.body.students.forEach(function (student) {
        students.push({
            id: student,
            grade: '',
            answer: ''
        });
    });
    db.Assignment.create({
        class: req.params.classid,
        teacher: req.body.teacher,
        students: students,
        question: req.body.question
    })
        .then(function (assignment) {
        res.send(assignment);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all assignments for a class
router.get('/class/:classId', function (req, res) {
    db.Assignment.find({ class: req.params.classId })
        .then(function (assignment) {
        res.send(assignment);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all assignments for a student
router.get('/student/:studentid', function (req, res) {
    // Find all the classes for the student
    // Find all the assignments for each of those classes
    db.User.findOne(req.params.studentid);
});
// GET an assignment by id
router.get('/:id', function (req, res) {
    db.Assignment.findOne({ _id: req.params.id })
        .then(function (assignment) {
        res.send(assignment);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
module.exports = router;
