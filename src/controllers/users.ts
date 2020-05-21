/**
 * Controller for students and teachers
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IUser} from '../models/user'
const router = Router()

// GET the stub route
router.get('/', (req:Request, res:Response) => {

})
/**
 * GET
 * @param position  To specify the student
 * @returns         All students
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
 * @param position  To specify the search for a teacher
 * @returns         All teachers
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
 * @param classid   The class to search for
 * @returns         All the students in a particular class
 */
router.get('/class/:classid', (req:Request, res:Response) => {
    
})

/**
 * PUT. Updates a a student's profile
 * @param id    The id of the student to update
 */
router.put('/:id', (req:Request, res:Response) => {
    
})

/**
 * GET
 * @param req.params.id The id of the student to return the classes of
 * @returns             All classes a student has signed up for
 */
router.get('/classes/:id', (req:Request, res:Response) => {

})

module.exports = router