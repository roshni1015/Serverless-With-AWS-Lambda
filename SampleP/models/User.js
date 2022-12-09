import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        FirstName: {
            type: String,
            trim: true,
            required: [true, "FirstName is required"],
            minlength: [3, "FirstName can't be shorter that 3 characters"]
        },
        LastName: {
            type: String,
            trim: true,
            required: [true, "LastName is required"],
            minlength: [3, "FirstName can't be shorter that 3 characters"]
        },
        EmailID: {
            type: String,
            trim: true,
            required: [true, "EmailID is required"],
            unique: true
        },
        Password: {
            type: String, trim: true,
            required: [true, "Password is required"],
            minlength: [4, "Password can't be shorter that 4 characters"]
        }
    },
    {
        timestamps: true
    }
);

export default model('User', userSchema);
