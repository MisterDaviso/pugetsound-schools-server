"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var db = require('../models');
var jwt = require('jsonwebtoken');
var express_1 = require("express");
//let router = require('express').Router()
var router = express_1.Router();
// POST /auth/login (find and validate user; send token)
router.post('/login', function (req, res) {
    console.log(req.body);
    // look up user by email
    db.User.findOne({ email: req.body.email })
        .then(function (user) {
        //check whether the user exists
        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }
        //if they exist make sure they have the correct password
        if (!user.validPassword(req.body.password)) {
            return res.status(401).send({ message: "invalid credentials" });
        }
        // we have a good user if they make it here
        // give them a new token
        var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 8
        });
        res.send({ token: token });
    })
        .catch(function (err) {
        console.log('error in POST', err);
        res.send(503).send({ message: 'Server-side or DB error' });
    });
});
// POST to /auth/signup (create user; generate token)
router.post('/signup', function (req, res) {
    console.log(req.body);
    console.log(db.User);
    db.User.findOne({ email: req.body.email })
        .then(function (user) {
        if (user) {
            return res.status(409).send({ message: "email address in use" });
        }
        db.User.create(req.body)
            .then(function (newUser) {
            var token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                //options
                //60secs 60min 8hours
                // expiresIn: 60 * 60 * 8
                expiresIn: 120
            });
            res.send({ token: token });
        })
            .catch(function (innerErr) {
            console.log('user creation in post /auth/signup error', innerErr);
            if (innerErr.name === 'ValidationError') {
                res.status(412).send({ message: "Validation Error!" });
            }
            else {
                res.status(500).send({ message: "error creating user" });
            }
        });
    })
        .catch(function (err) {
        console.log('error in post /auth/signup', err);
        res.status(503).send({ message: 'this is a database or server error' });
    });
});
module.exports = router;
