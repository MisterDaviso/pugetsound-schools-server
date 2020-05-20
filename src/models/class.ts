import * as mongoose from 'mongoose'
import {Schema, Document} from 'mongoose'
import {IUser} from './user'
import {IAssignment} from './assignment'

export interface IClass extends Document {
    classname:  string;
    subject:    string;
    teacher:    IUser['_id'];
    students:   [IUser['_id'],string];
    assignments:IAssignment['_id'][];
    startdate:  Date;
    enddate:    Date;
}

const ClassSchema: Schema = new Schema({
    classname:  {type:String, required:true},
    subject:    {type:String, required:true},
    teacher:    {type:Schema.Types.ObjectId, required:true},
    students:   {
        type:[{student:Schema.Types.ObjectId, grade:String}], 
        default: []
    },
    assignments:{type:[Schema.Types.ObjectId], default:[]},
    startdate:  {type:Date, default:null},
    enddate:    {type:Date, default:null}
})

module.exports = mongoose.model<IClass>('Class', ClassSchema);