import express from 'express'
const router=express.Router()
import { CreatTasks, DeletUserTask, getUserOwnTask, getSingleTask, updateUserOwnTask } from '../controller/Task.controller.js';
import  authMiddleware  from '../Middleware/AuthMiddleware.js';

router.post('/create',authMiddleware,CreatTasks)
router.get('/all',authMiddleware,getUserOwnTask)
router.get('/single', authMiddleware, getSingleTask);
router.put('/update/:id',authMiddleware,updateUserOwnTask)
router.delete('/delete/:id',authMiddleware,DeletUserTask)

export default router;  