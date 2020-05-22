"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ASSIGNMENTS CONTROLLER
 * All routes to get, put or post assignment data goes here
 */
var express_1 = require("express");
var db = require('../models');
var router = express_1.Router();
/*****************************
 * GET ROUTES
 ****************************/
/**
 * GET
 * @returns A stub message
 */
router.get('/', function (req, res) {
    res.send({ message: "You've reached the assignments route" });
});
/**
 * GET
 * @returns         All assignments for a class
 * @param classid   The id of the class to search for
 */
router.get('/class/:classid', function (req, res) {
    db.Assignment.find({ class: req.params.classid })
        .then(function (assignment) {
        res.send(assignment);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @returns         All assignments for a student assigned by their classes
 * @param studentid The id of the student to search for
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
 * @returns             A specific assignment
 * @param req.params.id The id of the assignement to search for
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
/*****************************
 * POST ROUTES
 ****************************/
/**
 * POST. Create a new assignement for a class
 * @returns                     The newly created assignment
 * @param req.params.classid    The id of the class the assignment is for
 * @param req.body.teacher      The id of the teacher who made the assignment
 * @param req.body.students     An array of student ref id's
 * @param req.body.question     A string containing the question(s)
 *
 * @todo Remove students as a req.body requirement
 */
router.post('/class/:classid', function (req, res) {
    var studentArray;
    if (!Array.isArray(req.body.students)) {
        studentArray = [req.body.students];
    }
    else {
        studentArray = req.body.students;
    }
    var students = [];
    studentArray.forEach(function (student) {
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
        question: req.body.question,
        dateDue: req.body.dateDue,
        dateAssigned: req.body.dateAssigned
    })
        .then(function (assignment) {
        db.Class.updateOne({ _id: req.params.classid }, { $push: { assignments: assignment._id } })
            .then(function () { res.send(assignment); })
            .catch(function (err) {
            console.log("Error:", err);
        });
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/*****************************
 * PUT ROUTES
 ****************************/
// Export the router
module.exports = router;
