import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim: true
        },
        lastName:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true
        },
        address:{
            type: String,

        },
        password:{
            type: String,
            required: true,
        },       
        accountType:{
            type: String,
            enum:["Ordinary", "Admin", "Agent", "Warden", "Employee", "DeputyProvost", "Provost"],
            required: true
        },

    },

    {timestamps: true}
);

export const User = mongoose.model("User", userSchema)