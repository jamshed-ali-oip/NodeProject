import mongoose from "mongoose";

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    }
}, { timestamps: true, versionKey: false }
)
export default mongoose.model("User", User)