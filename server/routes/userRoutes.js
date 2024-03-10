import express from 'express';
const router = express.Router();
import { addUser, deactivateUser, getUser, getUsers, modifyUser } from '../controllers/userController.js';



router.get('/getusers', getUsers);
router.get('/getuser/:userId', getUser);
router.post('/add', addUser);
router.put('/modify/:userId', modifyUser);
router.delete('/delete/:userId', deactivateUser);

export default router;