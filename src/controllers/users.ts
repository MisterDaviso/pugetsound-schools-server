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
// GET all students
router.get('/students', (req:Request, res:Response) => {
    db.User.find({position:'student'})
    .then((students:[IUser]) => {
        res.send(students)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// GET all teachers
router.get('/teachers', (req:Request, res:Response) => {
    db.User.find({position:'teacher'})
    .then((teachers:[IUser]) => {
        res.send(teachers)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// GET students by class
router.get('/class/:classid', (req:Request, res:Response) => {
    
})
// PUT updated info into a user's profile
router.put('/', (req:Request, res:Response) => {
    
})

module.exports = router