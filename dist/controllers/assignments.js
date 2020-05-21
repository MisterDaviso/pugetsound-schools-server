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
 * @param req.params.classid    The id of the class the assignment is for
 * @param req.body.teacher      The id of the teacher who made the assignment
 * @param req.body.students     An array of student ref id's
 * @param req.body.question     A string containing the question(s)
 * @returns                     The newly created assignment
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
/**
 * GET
 * @param classid   The id of the class to search for
 * @returns         All assignments for a class
 */
router.get('/class/:classid', function (req, res) {
    db.Assignment.find({ class: req.params.classId })
        .then(function (assignment) {
        res.send(assignment);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @param studentid The id of the student to search for
 * @returns         All assignments for a student assigned by their classes
 */
router.get('/student/:studentid', function (req, res) {
    db.Assignment.find({ students: { $elemMatch: { id: req.params.studentid } } })
        .then(function (assignments) {
        res.send(assignments);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @param req.params.id The id of the assignement to search for
 * @returns             A specific assignment
 */
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
