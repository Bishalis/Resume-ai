import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

})



export const User = mongoose.models.User || mongoose.model('User', userSchema);
