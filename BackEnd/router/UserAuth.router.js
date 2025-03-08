import express from 'express';
import { Login, Registration } from '../controller/UserAuth.controller.js';

const router =express()

router.post('/signup',Registration)
router.post('/login',Login)




export default router;