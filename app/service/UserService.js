import SendEmail from "../utility/emailUtility.js";
import UserModel from "../model/usersModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";
import ProfileModel from "../model/profilesModel.js";
import res from "express/lib/response.js";

// Login Service

export const LoginService = async (req)=> {
    try {
        let {email} = req.body;
        let code=Math.floor(100000+Math.random()*900000);
        let EmailText = `Your Verification Code is=${code}`
        let EmailSubject='Email Verification'

        //await SendEmail(email,EmailText,EmailSubject)
        await UserModel.updateOne({email: email},{$set:{otp:code}},{upsert:true})

        return {status:"Success",message:"6 Digit Code Send Successfully"};
    } catch (error) {
        return {status:"Fail",message:error.toString()}
    }
}


// Verify Login Service

export const VerifyLoginService = async (req)=> {
    try {
        let {email,otp}=req.body;

        let total = await UserModel.find({email: email,otp:otp})
        if(total.length===1){
            let user_id=await UserModel.find({email: email,otp: otp}).select('_id');
            let token=TokenEncode(email,user_id[0]['_id'].toString())
            await UserModel.updateOne({email: email},{$set:{otp:"0"}})
            return {status:"Success", message:"Login Successfully Verified",token:token};
        } else {
            return {status:"Fail", message:"Invalid OTP"}
        }
    } catch (error) {
        return {status:"Fail",message:error.toString()}
    }

}

// Create User Profile

export const CreateUserProfileService = async (req)=> {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID: user_id},{$set:reqBody},{upsert:true})
        return {status:"Success",message:"Profile Successfully Create"};
    } catch (error){
        return res.json({status:"Fail",message:error.toString()})
    }
}

// Update User Profile Service

export const UpdateUserProfileService = async (req)=> {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;

        await ProfileModel.updateOne({userID: user_id},{$set:reqBody},{upsert:true})
        return {status:"Success",message:"Profile Successfully Updated"};
    } catch (error) {
        return res.json({status:"Fail",message:error.toString()})
    }
}

// Read User Profile
export const ReadUserProfileService = async (req)=> {
    try {
        let user_id=req.headers.user_id;
        let data= await ProfileModel.findOne({userID:user_id})
        return {status:"Success",message:"Profile Successfully Read",data:data};
    } catch (error) {
        return res.json({status:"Fail",message:error.toString()})
    }
}