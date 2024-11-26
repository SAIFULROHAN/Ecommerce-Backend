import WishModel from "../model/wishesModel.js";
import mongoose from "mongoose";
import res from "express/lib/response.js";
const ObjectId = mongoose.Types.ObjectId;

// CreateWishService

export const CreateWishService=async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {productID}=req.body;
        let postJSON={
            productID:productID,
            userID:user_id,
        }
        await WishModel.updateOne(postJSON,{$set:postJSON},{upsert:true})
        return{status:"Success",message:"Wish Successfully Created"}
    } catch (error){
        return res.json({status:"Fail",message:error.toString()})
    }
}

// ReadWish Service

export const ReadWishListService=async (req) => {
    try {
        let user_id = new ObjectId(req.headers['user_id'])

        let matchStage={$match:{userID:user_id}}

        let JoinStageProduct={
            $lookup:{
                from:"products",
                localField:"productID",
                foreignField:"_id",as:"product"
            }}
        let data = await WishModel.aggregate([
            matchStage,
            JoinStageProduct,
        ])
        return{status:"Success",message:"Wish Successfully Read List",data:data}
    } catch (error) {
        return {status:"Fail",message:error.toString()}
    }
}

// Remove Wish Service

export const RemoveWishService=async (req) => {
    try {
        let user_id=req.headers['user_id']
        let {productID}=req.body;
        let postJSON={
            productID:productID,
            userID:user_id,
        }

        await WishModel.deleteOne(postJSON)
        return {status:"Success",message:"Wish Successfully Removed"}
    } catch (error){
        return {status:"Fail",message:error.toString()}
    }
}