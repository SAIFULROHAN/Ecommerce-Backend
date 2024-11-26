import CartModel from "../model/cartsModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

// Create Cart Service
 export const CreateCartService= async (req) => {
  try {
   let user_id = req.headers['user_id']
   let {productID,color,qty,size} = req.body;
   let postJSON={
    productID:productID,
    userID:user_id,
    color:color,
    qty:qty,
    size:size,
   }
   await CartModel.create(postJSON)
   return {status:"Success",message:"Cart Successfully Created"}
  } catch (error){
   return {status:"Fail",message:error.toString()}
  }
 }

// Read Cart Service
 export const ReadCartService = async (req) => {
  try {
   let user_id= new ObjectId(req.headers['user_id']);
   let matchStage = {$match:{userID:user_id}}
   let JoinStageProduct={
         $lookup:{
         from:"products",
         localField:"productID",
         foreignField:"_id",as:"product"
    }}
   let data = await CartModel.aggregate([
         matchStage,
         JoinStageProduct,
   ])
     return{status:"Success",message:"Cart Successfully Read List",data:data}
  } catch (error) {
     return {status:"Fail",message:error.toString()}
  }
 }

// Remove Cart Service
 export const RemoveCartService = async (req) => {
     try {
      let user_id = req.headers['user_id']
      let {id} = req.body;
      let postJSON = {
       _id: id,
       userID: user_id,
      }
      let data = await CartModel.deleteOne(postJSON)
      return {status:"Success",message:"Cart Successfully Removed",data:data}

     } catch (error) {
      return {status:"Fail",message:error.toString()}
     }

 }

 export const UpdateCartService = async (req) => {
  try {
   let user_id = req.headers['user_id']
   let {color, qty, size, id} = req.body;

   let postJSON = {
    color: color,
    qty: qty,
    size: size,
   }
   let data = await CartModel.updateOne({userID: user_id, _id: id}, {$set: postJSON})
   return {status: "Success", message: "Cart Successfully Updated", data: data}
  } catch (error) {
   return {status: "Fail", message: error.toString()}
  }
  
 }

