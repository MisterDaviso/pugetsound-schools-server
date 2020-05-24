"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Require needed packages
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var morgan = require('morgan');
var expressJwt = require('express-jwt');
var rowdyLogger = require('rowdy-logger');
// Instantiate app
var app = express_1.default();
var rowdyResults = rowdyLogger.begin(app);
// Set up middleware
app.use(morgan('dev'));
app.use(cors());
// ADD REACT APP FOR CORS HERE
app.use(express_1.default.urlencoded({ extended: false })); // Accept form data
app.use(express_1.default.json()); // Accept data from fetch (or any AJAX call)
// Routes
app.use('/auth', require('./controllers/auth'));
app.use('/profile', expressJwt({ secret: process.env.JWT_SECRET }), require('./controllers/profile'));
app.use('/classes', require('./controllers/classes'));
app.use('/assignments', require('./controllers/assignments'));
app.use('/users', require('./controllers/users'));
app.get('/', function (req, res) {
    res.send({ message: "Welcome to the base route!" });
});
app.get('*', function (req, res) {
    res.status(404).send({ message: 'Not Found' });
});
app.listen(process.env.PORT || 3000, function () {
    rowdyResults.print();
});
