"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Controller for students and teachers
 */
var express_1 = require("express");
var db = require('../models');
var router = express_1.Router();
// GET the stub route
router.get('/', function (req, res) {
});
/**
 * GET
 * @param position  To specify the student
 * @returns         All students
 */
router.get('/students', function (req, res) {
    db.User.find({ position: 'student' })
        .then(function (students) {
        res.send(students);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @param position  To specify the search for a teacher
 * @returns         All teachers
 */
router.get('/teachers', function (req, res) {
    db.User.find({ position: 'teacher' })
        .then(function (teachers) {
        res.send(teachers);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET.
 * @param classid   The class to search for
 * @returns         All the students in a particular class
 */
router.get('/class/:classid', function (req, res) {
});
/**
 * PUT. Updates a a student's profile
 * @param id    The id of the student to update
 */
router.put('/:id', function (req, res) {
});
/**
 * GET
 * @param req.params.id The id of the student to return the classes of
 * @returns             All classes a student has signed up for
 */
router.get('/classes/:id', function (req, res) {
});
module.exports = router;
