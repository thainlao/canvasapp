import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema({
    name: { type: String, required: true },
    fieldOfWork: { type: String, required: true },
    createdBy: { type: String, required: true },
    participants: { type: [String] }, 
}, { timestamps: true });

const Board = mongoose.models.Board || mongoose.model('Board', boardSchema);
export default Board;