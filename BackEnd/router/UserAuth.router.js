import express from 'express';
import { checkAuth, Login, logout, Registration } from '../controller/UserAuth.controller.js';
import authMiddleware from '../Middleware/AuthMiddleware.js';

const router =express()

router.post('/signup',Registration)
router.post('/login',Login)
router.post('/logout',logout)
// router.post('/refresh',RefreshToken)
router.get('/checkAuth',authMiddleware,checkAuth)




export default router;