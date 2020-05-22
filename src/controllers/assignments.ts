/**
 * ASSIGNMENTS CONTROLLER
 * All routes to get, put or post assignment data goes here
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
 * @returns A stub message
 */
router.get('/', (req:Request,res:Response) => {
    res.send({message: "You've reached the assignments route"})
})

/**
 * GET
 * @returns         All assignments for a class
 * @param classid   The id of the class to search for
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
 * @returns         All assignments for a student assigned by their classes
 * @param studentid The id of the student to search for
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
 * @returns             A specific assignment
 * @param req.params.id The id of the assignement to search for
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
 * @returns                     The newly created assignment
 * @param req.params.classid    The id of the class the assignment is for
 * @param req.body.teacher      The id of the teacher who made the assignment
 * @param req.body.students     An array of student ref id's
 * @param req.body.question     A string containing the question(s)
 * 
 * @todo Remove students as a req.body requirement
 */
router.post('/class/:classid', (req:Request, res:Response) => {
    let studentArray:any[]
    if(!Array.isArray(req.body.students)) {
        studentArray = [req.body.students]
    } else {studentArray = req.body.students}
    let students:{}[] = []
    studentArray.forEach((student:string) => {
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
        question: req.body.question,
        dateDue: req.body.dateDue
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