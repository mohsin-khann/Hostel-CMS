import mongoose from "mongoose";
import { Complaint } from "../models/complaint.model.js";
import { GridFSBucket } from "mongodb";

// import fileUpload from "../utiles/uploadFile.js";

import multer from 'multer';
const db = mongoose.connection;
let gfs;
db.once("open", () => {
  gfs = new GridFSBucket(db.db, { bucketName: "uploads" });
});

console.log('entering complaint controller')
// Initialize multer
const fileUpload = multer({ dest: '../db/uploads' });
// Create a new complaint
const createComplaint = async (req, res) => {
    try {


        console.log('create complaint hit',req.body);
        const { title, description } = req.body;
        console.log('ttl',title);
        const file = req.files?.attachment;

        // Validate inputs
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required.",
            });
        }

        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID is missing.",
            });
        }

        // Save file to GridFS
        // Declare attachmentId before usage
        let attachmentId = null;

        // Save file to GridFS if a file is provided
        if (file) {
            console.log("Uploading file...");

            // Use a Promise to handle the stream asynchronously
            const uploadFile = new Promise((resolve, reject) => {
                console.log("Starting file upload...");
                const uploadStream = gfs.openUploadStream(file.name, {
                    contentType: file.mimetype,
                });
            
                uploadStream.on("finish", () => {
                    console.log("File upload completed");
                    resolve(uploadStream.id);
                });
            
                uploadStream.on("error", (error) => {
                    console.error("File upload error", error);
                    reject(error);
                });
            
                uploadStream.end(file.data);
                console.log("File stream ended.");
            });
            
            console.log("Waiting for file upload to complete...");
            // Await the file upload to complete and get the file ID
            attachmentId = await uploadFile;
            console.log("Uploaded attachmentId:", attachmentId);
        }

            console.log('hit point')
        // Create a new complaint
       const newComplaint = await Complaint.create({
    title,
    description,
    attachmentId,
    userId,
    status: "new",
    forwardedTo: "Warden",   // ya "Employee" / "DeputyProvost" jo tumhari flow hai
});

      
console.log(newComplaint, "newComplaint")
        res.status(200).json({
            success: true,
            message: "Complaint created successfully.",
            complaint: newComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create complaint.",
            error: error.message,
        });
    }
};


// Fetch all complaints with role-based filtering
const getAllComplaints = async (req, res) => {
    try {
        const { accountType, userId } = req.user;
        let complaints;
        switch (accountType) {
            case "Admin":
                complaints = await Complaint.find();
                break;
            case "Ordinary":
                complaints = await Complaint.find({ userId });
                break;
            case "Agent":
                complaints = await Complaint.find({ userId });
                break;
            case "Warden":
                complaints = await Complaint.find({ forwardedTo: "Warden" });
                break;
            case "Employee":
                complaints = await Complaint.find({ forwardedTo: "Employee" });
                break;
            case "DeputyProvost":
                complaints = await Complaint.find({ forwardedTo: "DeputyProvost" }).sort({ updatedAt: -1 }).lean();
                break;
            case "Provost":
                complaints = await Complaint.find({ forwardedTo: "Provost" }).sort({ updatedAt: -1 }).lean();
                break;
            default:
                return res.status(403).json({
                    success: false,
                    message: "Access forbidden: Unauthorized role.",
                });
        }
        console.log(complaints, "complaints")
        res.status(200).json({
            success: true,
            message: "Complaints retrieved successfully.",
            complaints,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch complaints.",
            error: error.message,
        });
    }
};

// Fetch a specific complaint by ID
const getComplaintById = async (req, res) => {
    try {
        const { id } = req.params;

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint retrieved successfully.",
            complaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch complaint.",
            error: error.message,
        });
    }
};

// Update a complaint's details
const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const { title, description } = req.body;
        const file = req.files.attachment;

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        if (complaint.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this complaint.",
            });
        }

        const upload = await fileUpload(file, process.env.FOLDER)

        const updatedComplaint = await Complaint.findByIdAndUpdate(id, 
            {
                title,
                description,
                attachment:upload.secure_url
            }, { new: true });

        res.status(200).json({
            success: true,
            message: "Complaint updated successfully.",
            complaint: updatedComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update complaint.",
            error: error.message,
        });
    }
};

// Update the status of a complaint with role constraints
const updateComplaintStatus = async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;
        const { status } = req.body;
        const { accountType } = req.user;

        // Only Admin, Agent, Warden, Employee, DeputyProvost, Provost can update status
        if (!["Admin", "Agent", "Warden", "Employee", "DeputyProvost", "Provost"].includes(accountType)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update complaint status.",
            });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedComplaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Complaint status updated successfully.",
            complaint: updatedComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update complaint status.",
            error: error.message,
        });
    }
};

// Forward complaint
const forwardComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const { target } = req.body; // "Warden" | "Employee" | "DeputyProvost" | "Provost"
        const { accountType } = req.user;

        if (accountType === "Admin") {
            if (!["Warden", "Employee", "DeputyProvost", "Provost"].includes(target)) {
                return res.status(400).json({ success: false, message: "Invalid forward target." });
            }
        } else if (accountType === "Warden" || accountType === "Employee") {
            if (target !== "Provost") {
                return res.status(400).json({ success: false, message: `${accountType} can only forward to Provost.` });
            }
        } else if (accountType === "DeputyProvost") {
            if (target !== "Provost") {
                return res.status(400).json({ success: false, message: "Deputy Provost can only forward to Provost." });
            }
        } else {
            return res.status(403).json({ success: false, message: "Not authorized to forward complaints." });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { forwardedTo: target },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }

        res.status(200).json({ success: true, message: "Complaint forwarded.", complaint: updatedComplaint });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to forward complaint.", error: error.message });
    }
};

// Add remarks by Warden
const addWardenRemarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { remarks } = req.body;
        const { accountType } = req.user;
        if (accountType !== "Warden") {
            return res.status(403).json({ success: false, message: "Only Warden can add these remarks." });
        }
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { remarksByWarden: remarks },
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }
        res.status(200).json({ success: true, message: "Remarks updated.", complaint: updatedComplaint });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add remarks.", error: error.message });
    }
};

// Add remarks by Employee
const addEmployeeRemarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { remarks } = req.body;
        const { accountType } = req.user;
        if (accountType !== "Employee") {
            return res.status(403).json({ success: false, message: "Only Employee can add these remarks." });
        }
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { remarksByEmployee: remarks },
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }
        res.status(200).json({ success: true, message: "Remarks updated.", complaint: updatedComplaint });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add remarks.", error: error.message });
    }
};

// Add remarks by Deputy Provost
const addDeputyProvostRemarks = async (req, res) => {
    try {
        const { id } = req.params;
        const { remarks } = req.body;
        const { accountType } = req.user;
        if (accountType !== "DeputyProvost") {
            return res.status(403).json({ success: false, message: "Only Deputy Provost can add these remarks." });
        }
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { remarksByDeputyProvost: remarks },
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }
        res.status(200).json({ success: true, message: "Remarks updated.", complaint: updatedComplaint });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add remarks.", error: error.message });
    }
};

// Add remarks by Provost and optionally close
const addProvostRemarksAndClose = async (req, res) => {
    try {
        const { id } = req.params;
        const { remarks, close } = req.body; // close: boolean
        const { accountType } = req.user;
        if (accountType !== "Provost") {
            return res.status(403).json({ success: false, message: "Only Provost can add these remarks." });
        }
        const updates = { remarksByProvost: remarks };
        if (close === true) {
            updates.status = "closed";
        }
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );
        if (!updatedComplaint) {
            return res.status(404).json({ success: false, message: "Complaint not found." });
        }
        res.status(200).json({ success: true, message: "Remarks updated.", complaint: updatedComplaint });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add remarks.", error: error.message });
    }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, accountType } = req.user;

        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found.",
            });
        }

        if (complaint.userId.toString() !== userId && accountType !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this complaint.",
            });
        }

        await Complaint.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete complaint.",
            error: error.message,
        });
    }
};

// Export functions
export {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    updateComplaint,
    updateComplaintStatus,
    deleteComplaint,
    forwardComplaint,
    addWardenRemarks,
    addEmployeeRemarks,
    addDeputyProvostRemarks,
    addProvostRemarksAndClose,
};    