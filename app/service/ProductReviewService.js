import ReviewModel from "../model/reviewsModel.js";

export const CreatReviewService = async (req,) => {
    try {
        let user_id = req.headers['user_id'];
        let {productID,des,rating} = req.body;
        let postJSON={userID:user_id,productID:productID,des:des,rating:rating};

        let data = await ReviewModel.updateOne({userID:user_id, productID:productID},{$set:postJSON},{upsert:true})
        return {status:"Success",message:"Review Successfully Created",data:data};
    } catch (error) {
        return {status:"Fail",data:error.toString()}
    }
}