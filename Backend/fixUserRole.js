import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const fixUserRole = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find the user with email 'warden@g.com'
        const user = await User.findOne({ email: 'warden@g.com' });
        
        if (!user) {
            console.log('User with email warden@g.com not found');
            return;
        }

        console.log('Found user:', {
            _id: user._id,
            email: user.email,
            currentAccountType: user.accountType
        });

        // Update the user's account type to 'Warden'
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { accountType: 'Warden' },
            { new: true, runValidators: true }
        );

        console.log('User updated successfully:', {
            _id: updatedUser._id,
            email: updatedUser.email,
            newAccountType: updatedUser.accountType
        });

        console.log('✅ User role fixed successfully!');
        
    } catch (error) {
        console.error('Error fixing user role:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
};

// Run the script
fixUserRole();


