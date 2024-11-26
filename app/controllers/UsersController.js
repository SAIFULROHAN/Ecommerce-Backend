import {CreateUserProfileService,LoginService,ReadUserProfileService,UpdateUserProfileService,VerifyLoginService} from "../service/UserService.js";
import {CreatReviewService} from "../service/ProductReviewService.js"

// Login
export const Login = async (req, res) => {
   let result = await LoginService(req)
    return res.json(result)
}

// VerifyLogin
export const VerifyLogin = async (req, res) => {
    let result = await VerifyLoginService(req)
    return res.json(result)
}


export const CreateUserProfile = async (req, res) => {
    let result = await CreateUserProfileService(req)
    return res.json(result)
}


export const UpdateUserProfile = async (req, res) => {
    let result = await UpdateUserProfileService(req)
    return res.json(result)
}


export const ReadUserProfile = async (req, res) => {
    let result = await ReadUserProfileService(req)
    return res.json(result)
}

export const CreateUserReview = async (req, res) => {
    let result = await CreatReviewService(req)
    return res.json(result)
}


export const UpdateUserReview = async (req, res) => {
    let result = await CreatReviewService(req)
    return res.json(result)
}