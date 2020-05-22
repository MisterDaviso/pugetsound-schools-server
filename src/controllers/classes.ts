/**
 * CLASSES CONTROLLER
 * All routes to get, put or post Class model data goes here
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IClass} from '../models/class'
import { IUser } from '../models/user'
const router = Router()

/*****************************
 * GET ROUTES
 ****************************/

/**
 * GET
 * @returns All classes in the db
 */
router.get('/', (req:Request, res:Response) => {
    db.Class.find()
    .then((c:[IClass]) => {
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET
 * @returns the specified class
 * @param id, The id of the class to return
 */
router.get('/:id', (req:Request, res:Response) => {
    db.Class.findOne({_id:req.params.id})
    .then((c:IClass) => {
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET
 * @returns All classes a student has signed up for
 * @param id, The student's id
 */
router.get('/student/:id', (req:Request, res:Response) => {
    db.Class.find({students: {$elemMatch: {student: req.params.id}}})
    .then((classes:[IClass]) => {
        res.send(classes)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/**
 * GET
 * @returns All classes taught by a specified teacher
 * @param id, The teacher's id
 */
router.get('/teacher/:id', (req:Request, res:Response) => {
    db.Class.find({teacher: req.params.id})
    .then((classes:[IClass]) => {
        res.send(classes)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/*****************************
 * POST ROUTES
 ****************************/

/**
 * POST 
 * Adds a new class to the database.
 */
router.post('/', (req:Request, res:Response) => {
    db.User.find({_id:req.body.teacher})
    .then((teacher:IUser) => {
        let name = teacher.firstname + " " + teacher.lastname
        db.Class.create({
            classname: req.body.classname,
            subject: req.body.subject,
            teacher: req.body.teacher, 
            teachername: name,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
        })
        .then((c:IClass) => {
            res.send(c)
        })
        .catch((err:Error) => {
            console.log("Error:",err)
        })
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})

/*****************************
 * PUT ROUTES
 ****************************/

/**
 * PUT
 * Adds a student to a class
 */
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

/**
 * PUT
 * Updates info about a class
 */
router.put('/:id', (req:Request, res:Response) => {
    db.Class.findOneAndUpdate({_id:req.params.id}, req.body)
    .then((c:IClass) => {
        res.send(c)
    })
    .catch((err:Error) => {
        console.log("Error:",err)
    })
})


// Export the router
module.exports = router