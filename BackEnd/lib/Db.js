import mongoose, { connect } from "mongoose";
import env from 'dotenv'
env.config();
const ConnectDb=async()=>{
     try {
          await mongoose.connect(process.env.DB);
          console.log("DataBase is Connected"+process.env.DB)
     } catch (error) {
          console.log("the error is occurd id database"+error)
          
     }
}
export default ConnectDb;