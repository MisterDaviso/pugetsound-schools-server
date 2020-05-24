"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CLASSES CONTROLLER
 * All routes to get, put or post Class model data goes here
 */
var express_1 = require("express");
var db = require('../models');
var router = express_1.Router();
/*****************************
 * GET ROUTES
 ****************************/
/**
 * GET
 * @returns All classes in the db
 */
router.get('/', function (req, res) {
    db.Class.find()
        .then(function (c) {
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @returns the specified class
 * @param id, The id of the class to return
 */
router.get('/:id', function (req, res) {
    db.Class.findOne({ _id: req.params.id })
        .then(function (c) {
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @returns All classes a student has signed up for
 * @param id, The student's id
 */
router.get('/student/:id', function (req, res) {
    db.Class.find({ students: { $elemMatch: { student: req.params.id } } })
        .then(function (classes) {
        res.send(classes);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/**
 * GET
 * @returns All classes taught by a specified teacher
 * @param id, The teacher's id
 */
router.get('/teacher/:id', function (req, res) {
    db.Class.find({ teacher: req.params.id })
        .then(function (classes) {
        res.send(classes);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/*****************************
 * POST ROUTES
 ****************************/
/**
 * POST
 * Adds a new class to the database.
 */
router.post('/', function (req, res) {
    console.log("req.body.teacher", req.body.teacher);
    db.User.findOne({ _id: req.body.teacher })
        .then(function (teacher) {
        console.log("teacher from Db", teacher);
        var name = teacher.firstname + " " + teacher.lastname;
        console.log("name", name);
        db.Class.create({
            classname: req.body.classname,
            subject: req.body.subject,
            teacher: req.body.teacher,
            teachername: name,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
        })
            .then(function (c) {
            res.send(c);
        })
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
/**
 * PUT
 * Updates info about a class
 */
router.put('/:id', function (req, res) {
    db.Class.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(function (c) {
        res.send(c);
    })
        .catch(function (err) {
        console.log("Error:", err);
    });
});
/*****************************
 * DELETE ROUTES
 ****************************/
router.delete('/:id', function (req, res) {
    // First, remove the class from the teachers and students in it
    db.User.updateMany({ $elemMatch: { classes: req.params.id } }, { $pull: { classes: { _id: req.params.id } } })
        .then(function (userUpdate) {
        console.log("Result of deleting from users:", userUpdate);
        // Second, delete all assignments for that class
        db.Assignment.delete({ class: req.params.id })
            .then(function (assignmentDelete) {
            console.log("Result of deleting assignments:", assignmentDelete);
            // Third, delete the class itself
            db.Class.delete({ _id: req.params.id })
                .then(function (classDelete) {
                res.send(classDelete);
            })
                .catch(function (err) { console.log("Error:", err); });
        })
            .catch(function (err) { console.log("Error:", err); });
    })
        .catch(function (err) { console.log("Error:", err); });
});
// Export the router
module.exports = router;
