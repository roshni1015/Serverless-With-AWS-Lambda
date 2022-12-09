import { Schema, model } from 'mongoose';
const NoteSchema = new Schema(
    {
        Title: {type: String,required: true,},
        Descreption: {type: String,required: true,},
        Color: {type: String},
        isArchived: {type: Boolean, default: false},
        isTrash: {type: Boolean, default: false},
        UserID: {type: String}
        
    },
    {
        timestamps: true
    }
    );

export default model('Note', NoteSchema);