import mongoose from "mongoose";

const TaskSchima=new mongoose.Schema({
title:{type:String,required:true,},
description:{type:String,required:true},
image:{type:String},
deadLine:{type:String,required:true},
isCompleted:{type:Boolean,default:false},
createdAt: { type: Date, default: Date.now },
UserId:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true

}

},{timestamps:true})
const Tasks=mongoose.model("task",TaskSchima)
export default Tasks;