import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        attachmentId: {
            type: mongoose.Schema.Types.ObjectId, // GridFS File ID
            ref: "uploads.files",
          },
        status: {
            type: String,
            enum: ["new", "pending", "progress", "closed"],
            required: true,
            default: "new", // Default status
        },
        forwardedTo: {
            type: String,
            enum: ["Warden", "Employee", "DeputyProvost", "Provost"],
            default: null,
            index: true,
        },
        remarksByWarden: { type: String },
        remarksByEmployee: { type: String },
        remarksByDeputyProvost: { type: String },
        remarksByProvost: { type: String },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        resolutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resolution",
        },
        feedbackId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
        },
    },
    { timestamps: true }
);

export const Complaint = mongoose.model("Complaint", complaintSchema);
