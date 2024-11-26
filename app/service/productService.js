import BrandModel from "../model/brandsModel.js";
import categoryModel from "../model/categoriesModel.js";
import ProductSlidesModel from "../model/slidersModel.js";
import mongoose from "mongoose";
import ProductModel from "../model/productsModel.js";
import ReviewModel from "../model/reviewsModel.js";
//import SlidersModel from "../model/slidersModel.js";
//import CategoriesModel from "../model/categoriesModel.js";
//import {reject} from "nodemailer/.ncurc.js";

const ObjectId = mongoose.Types.ObjectId;

// Brand Service
export const BrandListService = async () => {
    try {
        let data=await BrandModel.find()
        return {status:"Success",data:data}
    }
    catch(err){
        return {status:"Fail",data:err.toString()}
    }
}


// Category Service
export const CategoryListService = async () => {
    try {
        let data = await categoryModel.find()
        return {status:"Success",data:data}
    }
    catch(err){
        return {status:"Fail",data:err.toString()}
    }
}


// Slider Service

export const SliderListService = async () => {
    try {
        let data = await ProductSlidesModel.find({})
        return {status:"Success",data:data}
    }
    catch(err) {
        return {status:"Fail",data:err.toString()}
    }
}
// List By Brand Service


export const ListByBrandService = async (req) => {
    try {
        let BrandID = new ObjectId(req.params.BrandID);
        let MatchStage = {$match:{brandID:BrandID}}

        let JoinWithBrandStage = {
            $lookup:{
                from:"brands",
                localField:"brandID",
                foreignField:"_id",as:"brand"
            }};

        let JoinWithCategoryStage = {
            $lookup:{
                from:"categories",
                localField: "categoryID",
                foreignField:"_id",as:"category"
            }};

        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}

        let ProjectionStage = {
            $project:{
                'brand._id':0,
                'category._id':0,
                'categoryID':0,
                'brandID':0
            }}
        // Query

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:"Success",data:data}
    }
    catch(err) {
        return {status:"Fail",data:err.toString()}
    }
}


// CategoryService

export const ListByCategoryService = async (req) => {
    try{

    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = {$match:{categoryID:CategoryID}}


    let JoinWithBrandStage = {
        $lookup:{
            from:"brands",
            localField:"brandID",
            foreignField:"_id",as:"brand"
        }};

    let JoinWithCategoryStage = {
        $lookup:{
            from:"categories",
            localField: "categoryID",
            foreignField:"_id",as:"category"
        }};

    let UnwindBrandStage ={$unwind:"$brand"}
    let UnwindCategoryStage = {$unwind:"$category"}

    let ProjectionStage = {
        $project:{
            'brand._id':0,
            'category._id':0,
            'categoryID':0,
            'brandID':0
        }}
    // Query

    let data = await ProductModel.aggregate([
        MatchStage,
        JoinWithBrandStage,
        JoinWithCategoryStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        ProjectionStage
    ])
    return {status:"Success",data:data}
}

catch (err){
        return {status:"Fail",data:err.toString()}
    }
}

// Remark Service

export const ListByRemarkService = async (req) => {
    try {
        let Remark = req.params.Remark
        let MatchStage={$match:{remark:Remark}}
        let JoinWithBrandStage = {
            $lookup:{
                from:"brands",
                localField:"brandID",
                foreignField:"_id",as:"brand"
            }};

        let JoinWithCategoryStage = {
            $lookup:{
                from:"categories",
                localField: "categoryID",
                foreignField:"_id",as:"category"
            }};

        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}

        let ProjectionStage = {
            $project:{
                'brand._id':0,
                'category._id':0,
                'categoryID':0,
                'brandID':0
            }}
        // Query

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:"Success",data:data}
    }

    catch (err){
        return {status:"Fail",data:err.toString()}
    }
}

// DetailsService

export const DetailsService = async (req)=>{
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage={$match:{_id:ProductID}}
        let JoinWithBrandStage = {
            $lookup:{
                from:"brands",
                localField:"brandID",
                foreignField:"_id",as:"brand"
            }};

        let JoinWithCategoryStage = {
            $lookup:{
                from:"categories",
                localField: "categoryID",
                foreignField:"_id",as:"category"
            }};

        let JoinWithDetailsStage={
            $lookup:{
                from:"productdetails",
                localField:"_id",
                foreignField:"productID",as:"details"
            }};

        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}
        let UnwindDetailsStage={$unwind:"$details"}

        let ProjectionStage = {
            $project:{
                'brand._id':0,
                'category._id':0,
                'categoryID':0,
                'brandID':0
            }}
        // Query

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage
        ])
        return {status:"Success",data:data}
    }

    catch (err){
        return {status:"Fail",data:err.toString()}
    }
}


// List By Keyword

export const ListByKeywordService = async (req)=>{
    try {
        let keyword = req.params.keyword
        let regex={"$regex":keyword,"$options":"i"}
        let SearchParams=[{title:regex},{shortDes:regex}]
        let SearchQuery={$or:SearchParams};
        let MatchStage={$match:SearchQuery}

        let JoinWithBrandStage = {
            $lookup:{
                from:"brands",
                localField:"brandID",
                foreignField:"_id",as:"brand"
            }};

        let JoinWithCategoryStage = {
            $lookup:{
                from:"categories",
                localField: "categoryID",
                foreignField:"_id",as:"category"
            }};

        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage = {$unwind:"$category"}

        let ProjectionStage = {
            $project:{
                'brand._id':0,
                'category._id':0,
                'categoryID':0,
                'brandID':0
            }}
        // Query

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:"Success",data:data}
    }

    catch (err){
        return {status:"Fail",data:err.toString()}
    }
}


// Review List Service

export const ReviewListService = async (req)=>{
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage={$match:{productID:ProductID}}

        let JoinWithProfileStage={
            $lookup:{
                from:"profiles",
                localField:"userID",
                foreignField:"userID",as:"profile"


            }};
        let UnwindProfileStage = {$unwind:"$profile"}

        let ProjectionStage={
            $project:{
                'des':1,
                'rating':1,
                'profile.cus_name': 1
            }}

        let data= await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ])
        return {status:"Success",data:data}
    } catch (error){
        return {status:"Fail",data:error.toString()}
    }
}