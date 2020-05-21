/**
 * Assignments Controller
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IAssignment} from '../models/assignment'
import {IUser} from '../models/user'
import {IClass} from '../models/class'
const router = Router()

/**
 * POST. Create a new assignement for a class
 * @param req.params.classid    Class ref id
 * @param req.body.teacher      Teacher User ref id
 * @param req.body.students     An array of student ref id's
 * @param req.body.question     A string containing the question(s)
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

// GET all assignments for a class
router.get('/class/:classId', (req:Request, res:Response) => {
    db.Assignment.find({class :req.params.classId})
    .then((assignment:IAssignment)=>{
        res.send(assignment)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

// GET all assignments for a student
router.get('/student/:studentid', (req:Request, res:Response) => {
    db.Assignment.find({students: {$elemMatch:{id: req.params.studentid}}})
    .then((assignments:[IAssignment]) => {
        res.send(assignments)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

// GET an assignment by id
router.get('/:id', (req:Request, res:Response) => {
    db.Assignment.findOne({_id :req.params.id})
    .then((assignment:IAssignment)=>{
        res.send(assignment)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

module.exports = router