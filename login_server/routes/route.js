import express from "express";
import { signUp,logIn,verifyToken,getUser } from "../controller/userController.js";

const router=express.Router();
console.log("signup route");
router.post('/signup',signUp);
router.post('/login',logIn);
router.get('/user', verifyToken,getUser);

export default router;