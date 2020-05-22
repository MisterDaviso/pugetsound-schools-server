import * as mongoose from 'mongoose'
import {Schema, Document} from 'mongoose'
import {IClass} from './class'
import {IUser} from './user'

export interface IAssignment extends Document {
    class: IClass['_id'];
    teacher: IUser['_id'];
    students: [IUser['_id'],string, string];
    question: string;
    dateAssigned: Date;
    dateDue: Date;
}

const AssignmentSchema:Schema = new Schema({
    class:      {type:Schema.Types.ObjectId, required:true},
    teacher:    {type:Schema.Types.ObjectId, required:true},
    students:   {type:[{id:Schema.Types.ObjectId, grade:String, answer:String}], default: []},
    question :  {type: String, required:true},
    dateAssigned: {type:Date, default:null},
    dateDue:    {type:Date, default:null},
})

module.exports = mongoose.model<IAssignment>('Assignment', AssignmentSchema)