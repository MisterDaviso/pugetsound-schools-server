/**
 * Assignments Controller
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IAssignment} from '../models/assignment'
const router = Router()

/*****************************
 * GET ROUTES
 ****************************/

/**
 * GET
 * @param classid   The id of the class to search for
 * @returns         All assignments for a class
 */
router.get('/class/:classid', (req:Request, res:Response) => {
    db.Assignment.find({class :req.params.classId})
    .then((assignment:IAssignment)=>{
        res.send(assignment)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET
 * @param studentid The id of the student to search for
 * @returns         All assignments for a student assigned by their classes
 */
router.get('/student/:studentid', (req:Request, res:Response) => {
    db.Assignment.find({students: {$elemMatch:{id: req.params.studentid}}})
    .then((assignments:[IAssignment]) => {
        res.send(assignments)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET
 * @param req.params.id The id of the assignement to search for
 * @returns             A specific assignment
 */
router.get('/:id', (req:Request, res:Response) => {
    db.Assignment.findOne({_id :req.params.id})
    .then((assignment:IAssignment)=>{
        res.send(assignment)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/*****************************
 * POST ROUTES
 ****************************/

/**
 * POST. Create a new assignement for a class
 * @param req.params.classid    The id of the class the assignment is for
 * @param req.body.teacher      The id of the teacher who made the assignment
 * @param req.body.students     An array of student ref id's
 * @param req.body.question     A string containing the question(s)
 * @returns                     The newly created assignment
 */
router.post('/class/:classid', (req:Request, res:Response) => {
    let students:{}[] = []
    req.body.students.forEach((student:string) => {
        students.push({
            id: student,
            grade: '',
            answer: ''
        })
    })
    db.Assignment.create({
        class: req.params.classid,
        teacher: req.body.teacher,
        students: students,
        question: req.body.question
    })
    .then((assignment:IAssignment) => {
        res.send(assignment)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/*****************************
 * PUT ROUTES
 ****************************/


// Export the router
module.exports = router