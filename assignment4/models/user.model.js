import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20, trim: true, },
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, },
    password: { type: String, required: true, minlength: 6},
}, {
    timestamps: true, 
});


const User = mongoose.model("User", userSchema);

export default User;
