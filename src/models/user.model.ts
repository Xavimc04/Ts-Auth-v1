import mongoose from "mongoose";
const { Schema } = mongoose; 

const userSchema = new Schema({
    username: String, 
    password: String,
    mail: String, 
    phone: Number,  
    profilePicture: String, 
}, { timestamps: true }); 

export default mongoose.model("users", userSchema)