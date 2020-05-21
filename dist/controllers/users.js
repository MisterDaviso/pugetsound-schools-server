"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * USERS CONTROLLER
 * All routes to get or put User model data goes here
 * Auth controller takes care of user creation
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
    res.send({ message: "Welcome to the users route" });
});
/**
 * GET
 * @returns         All students
 * @param position  To specify the student
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
 * @returns         All teachers
 * @param position  To specify the search for a teacher
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
 * @returns         All the students in a particular class
 * @param classid   The class to search for
 */
router.get('/class/:classid', function (req, res) {
    db.User.find({ classes: { $elemMatch: req.params.classid } })
        .then(function (students) {
        res.send(students);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/*****************************
 * POST ROUTES
 ****************************/
/*****************************
 * PUT ROUTES
 ****************************/
/**
 * @name    PUT
 * @summary Updates a a student's profile
 * @param   req.body.user The id of the student to update
 */
router.put('/', function (req, res) {
    db.User.updateOne({ _id: req.body.user._id }, req.body)
        .then(function (user) {
        res.send({
            message: "Student info updated",
            student: user
        });
    })
        .catch(function (err) { console.log("Error:", err); });
});
/**
 * @name    PUT
 * @summary Adds the student to the provided classes
 * @param   req.body.classes  An array of class ref id's the student signs up for
 * @todo    Update the classes and assignments with the new information
 */
router.put('/classes/register', function (req, res) {
    // First, get the list of classes the student is currently signed up for
    db.Class.find({ students: { $elemMatch: { student: req.params.id } } })
        .then(function (currentClasses) {
        // Second, create two new arrays: Old classes and new classes
        // One is classes the student is no longer signed up for,
        // The other are their new classes
        var currentClassIds = currentClasses.map(function (c) { return c._id; });
        var signup;
        var resign;
        currentClassIds.forEach(function (c) { if (!req.body.classes.includes(c)) {
            resign.push(c);
        } });
        req.body.classes.forEach(function (c) { if (!currentClassIds.includes(c)) {
            signup.push(c);
        } });
        // Third, remove the student from their old classes
        db.Class.update;
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// Export the router
module.exports = router;
