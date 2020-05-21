/**
 * Classes Controller
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IClass} from '../models/class'
import {IUser} from '../models/user'
const router = Router()

// GET all classes
router.get('/', (req:Request, res:Response) => {
    db.Class.find()
    .then((c:[IClass]) => {
        console.log("Class:",c[0])
        console.log("Students:",c[0].students)
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// POST a new class
router.post('/', (req:Request, res:Response) => {
    db.Class.create(req.body)
    .then((c:IClass) => {
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// GET a class by ID 
router.get('/:id', (req:Request, res:Response) => {
    db.Class.findOne({_id:req.params.id})
    .then((c:IClass) => {
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// PUT a student that signs up in a class
router.put('/signup/:id', (req:Request, res:Response) => {
    // Takes in an array of tuple arrays
    let newStudent:{} = {
        student:req.body.studentid,
        grade:  ''
    }
    db.Class.updateOne(
        {_id:req.params.id},
        {$push: {students: newStudent}}
    )
    .then((c:IClass) => {
        console.log("Successfully added student")
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// PUT updated info into a class by ID
router.put('/:id', (req:Request, res:Response) => {
    db.Class.findOneAndUpdate({_id:req.params.id}, req.body)
    .then((c:IClass) => {
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// GET all classes a student HAS signed up for
router.get('/student/:id', (req:Request, res:Response) => {
    db.Class.find({students: {$elemMatch: {student: req.params.id}}})
    .then((classes:[IClass]) => {
        res.send(classes)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})
// GET all classes a student has NOT signed up for
router.get('/not/student/id', (req:Request, res:Response) => {
    
})
// GET all classes for a specified teacher
router.get('/teacher/:id', (req:Request, res:Response) => {
    db.Class.find({teacher: req.params.id})
    .then((classes:[IClass]) => {
        res.send(classes)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

module.exports = router