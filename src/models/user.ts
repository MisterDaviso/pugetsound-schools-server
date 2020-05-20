import * as mongoose from 'mongoose'
import {Schema, Document} from 'mongoose'
import {IClass} from './class'
let bcrypt = require('bcryptjs')

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    birthdate: Date;
    admin: boolean;
    position: string;
    grade: string;
    classes: IClass['_id'][];
    validPassword(typedPassword:string): boolean;
}

let userSchema:Schema = new Schema({
    firstname:  {type:String, required:true},
    lastname:   {type:String, required:true},
    password:   {type:String, required:true},
    email:      {
        type:String, 
        required:true,
        unique: true,
    },
    birthdate:  {type:Date, default:null},
    admin:      {type:Boolean, default:false},
    position:   {type:String, required:true},
    grade:      {type:String, default:'N/A'},
    classes:    {
        type: [Schema.Types.ObjectId],
        default: []
    }
})

// Hash passwords
userSchema.pre<IUser>('save', function(done) {
    // Make sure it's new as opposed to modified
    if(this.isNew) {
        this.password = bcrypt.hashSync(this.password, 12)
    }
    // Indicate we are good to move on
    done()
})

// Make a json representation of the user (for sending on the JWT payload)
// userSchema.set<IUser>('toJSON', {
//     transfrom: (doc:any, user:any) => {
//         delete user.password
//         delete user.lastname
//         delete user.pic
//         delete user.__v
//         return user
//     }
// })

// Make a function that compares passwords
userSchema.methods.validPassword = function(typedPassword:string) {
    // typedPassword: Plain text, just typed in by user
    return bcrypt.compareSync(typedPassword, this.password)
}

module.exports = mongoose.model<IUser>('User', userSchema)