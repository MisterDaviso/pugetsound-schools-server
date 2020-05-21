/**
 * USERS CONTROLLER
 * All routes to get or put User model data goes here
 * Auth controller takes care of user creation
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IUser} from '../models/user'
const router = Router()


/*****************************
 * GET ROUTES
 ****************************/

/**
 * GET
 * @returns A stub message
 */
router.get('/', (req:Request, res:Response) => {
    res.send({message: "Welcome to the users route"})
})

/**
 * GET
 * @returns         All students
 * @param position  To specify the student
 */
router.get('/students', (req:Request, res:Response) => {
    db.User.find({position:'student'})
    .then((students:[IUser]) => {
        res.send(students)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET
 * @returns         All teachers
 * @param position  To specify the search for a teacher
 */
router.get('/teachers', (req:Request, res:Response) => {
    db.User.find({position:'teacher'})
    .then((teachers:[IUser]) => {
        res.send(teachers)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET. 
 * @returns         All the students in a particular class
 * @param classid   The class to search for
 */
router.get('/class/:classid', (req:Request, res:Response) => {
    db.User.find({classes: {$elemMatch: req.params.classid}})
    .then((students:[IUser]) => {
        res.send(students)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

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
router.put('/', (req:Request, res:Response) => {
    db.User.updateOne({_id: req.body.user._id}, req.body)
    .then((user:IUser) => {
        res.send({
            message: "Student info updated", 
            student:user
        })
    })
    .catch((err:Error) => {console.log("Error:",err)})
})

/**
 * @name    PUT 
 * @summary Adds the student to the provided classes
 * @param   req.body.classes  An array of class ref id's the student signs up for
 * @todo    Update the classes and assignments with the new information
 */
router.put('/classes/register', (req:Request, res:Response) => {
    // First, get the list of classes the student is currently signed up for
    // Second, create two new arrays: Old classes and new classes
})

// Export the router
module.exports = router