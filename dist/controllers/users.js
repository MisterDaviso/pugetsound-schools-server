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
// GET all students
router.get('/students', function (req, res) {
    db.User.find({ position: 'student' })
        .then(function (students) {
        res.send(students);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET all teachers
router.get('/teachers', function (req, res) {
    db.User.find({ position: 'teacher' })
        .then(function (teachers) {
        res.send(teachers);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
// GET students by class
router.get('/class/:classid', function (req, res) {
});
// PUT updated info into a user's profile
router.put('/', function (req, res) {
});
module.exports = router;
