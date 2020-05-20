"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var mongoose_1 = require("mongoose");
var bcrypt = require('bcryptjs');
var userSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    birthdate: { type: Date, default: null },
    admin: { type: Boolean, default: false },
    position: { type: String, required: true },
    grade: { type: String, default: 'N/A' },
    classes: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: []
    }
});
// Hash passwords
userSchema.pre('save', function (done) {
    // Make sure it's new as opposed to modified
    if (this.isNew) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    // Indicate we are good to move on
    done();
});
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
userSchema.methods.validPassword = function (typedPassword) {
    // typedPassword: Plain text, just typed in by user
    return bcrypt.compareSync(typedPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);
