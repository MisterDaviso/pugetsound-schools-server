/**
 * USERS CONTROLLER
 * All routes to get or put User model data goes here
 * Auth controller takes care of user creation
 */
import {Request, Response, Router} from 'express'
let db = require('../models')
import {IUser} from '../models/user'
import {IClass} from '../models/class'
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
 * @returns             The specified student
 * @param req.params.id The student's id
 */
router.get('/students/:id', (req:Request, res:Response) => {
    db.User.findOne({_id: req.params.id})
    .then((user:IUser) => {res.send(user)})
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
 * @param   req.body.classes    An array of class ref id's the student signs up for
 * @param   req.params.id       The id of the student
 * @todo    Update the classes and assignments with the new information
 */
router.put('/classes/:id', (req:Request, res:Response) => {
    // First, get the list of classes the student is currently signed up for
    db.Class.find({students: {$elemMatch: {student: req.params.id}}})
    .then((currentClasses:[IClass]) => {
        // Second, create two new arrays: Old classes and new classes
            // One is classes the student is no longer signed up for,
            // The other are their new classes
        let currentClassIds:any[] = currentClasses.map(c => {return `${c._id}`})
        let newClassIds:any[]
        if(Array.isArray(req.body.classes)) {
            newClassIds = req.body.classes
        } else if(req.body.classes){
            newClassIds = [req.body.classes]
        } else {
            newClassIds = []
        }
        console.log("Current Class ID's", currentClassIds)
        let signup:any[] = []
        let resign:any[] = []
        currentClassIds.forEach((c:string) => { if(!newClassIds.includes(c)) {resign.push(c)} })
        newClassIds.forEach((c:string) => { if(!currentClassIds.includes(c)) {signup.push(c)} })

        console.log("Classes to sign up for:",signup)
        console.log("Classes to leave:",resign)
        
        // Third, remove the student from their old classes
        db.Class.updateMany(
            {_id: {$in: resign}}, 
            {$pull: {students: {student:req.params.id}}}
        )
        .then((classRemove:{}) => {
            // Fourth, add the student to their new classes
            console.log("Classes resigned from:",classRemove)
            let newStudent:{} = {
                student: req.params.id,
                grade: ''
            }
            db.Class.updateMany(
                {_id: {$in: signup}}, 
                {$push: {students: newStudent}}
            )
            .then((classAdd:{}) => {
                console.log("Classes signed up to:",classAdd)
                db.User.update({_id:req.params.id}, {classes:newClassIds})
                .then((studentChange:IUser) => {
                    console.log("Classes given to student:",studentChange)
                    res.send(studentChange)
                })
                .catch((err:Error) => {console.log("Broke adding classes to student:",err)})
            })
            .catch((err:Error) => {console.log("Broke adding student to classes:",err)})
        })
        .catch((err:Error) => {console.log("Broke resigning the student for classes:",err)})
    })
    .catch((err:Error) => {
        console.log("Broke getting classes the student signed up for:",err)
    })
})

// Export the router
module.exports = router