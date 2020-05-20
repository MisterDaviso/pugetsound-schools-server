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
var ClassSchema = new mongoose_1.Schema({
    classname: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    students: {
        type: [{ student: mongoose_1.Schema.Types.ObjectId, grade: String }],
        default: []
    },
    assignments: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    startdate: { type: Date, default: null },
    enddate: { type: Date, default: null }
});
module.exports = mongoose.model('Class', ClassSchema);
