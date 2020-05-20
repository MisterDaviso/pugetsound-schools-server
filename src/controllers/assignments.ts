import {Request, Response, Router} from 'express'
let db = require('../models')
import {IAssignment} from '../models/assignment'

//let router = require('express').Router()
const router = Router()

// POST a new assignment to a class
router.post('/class/:classId', (req:Request, res:Response) => {
    
    db.Assignment.create(req.body)
    .then((as:IAssignment) => {
        res.send(as)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })

})


// GET all assignments for a class
router.get('/class/:classId', (req:Request, res:Response) => {

    db.Assignment.find({class :req.params.classId})
    .then((as:IAssignment)=>{
        res.send(as)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })

})


// GET all assignments for a student
router.get('/student/:studentId', (req:Request, res:Response) => {

})


// GET an assignment by id
router.get('/:id', (req:Request, res:Response) => {
    db.Assignment.findOne({_id :req.params.id})
    .then((as:IAssignment)=>{
        res.send(as)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

module.exports = router