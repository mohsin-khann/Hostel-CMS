import express from 'express';
import {
     signup,
     login, 
     deleteUserById, 
     getAllUsers, 
     getUserById, 
     updateUserById, 
     updateUserPassword,
     updateUserAccountType
} from '../controllers/user.controller.js'; // Adjust path as needed
import { auth, isAdmin, isOrdinary } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/getAllUsers', auth, isAdmin, getAllUsers); 
router.get('/getUser/:id', auth, getUserById); 
router.delete('/deleteUser/:id', auth,isAdmin, deleteUserById); 
router.put('/updateUser/:id',auth, updateUserById); 
router.put('/resetPass/:id',auth, updateUserPassword);
router.put('/updateAccountType/:id', auth, isAdmin, updateUserAccountType);

export default router;
