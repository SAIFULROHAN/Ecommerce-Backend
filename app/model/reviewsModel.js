import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, required:true},
    productID:{type: mongoose.Schema.Types.ObjectId, required:true},
    des:{type:String,unique:true},
    rating:{type:String,unique:true},
},
    {
        timestamps: true,
        versionKey: false,
    })

const ReviewModel = mongoose.model('reviews', DataSchema);
export default ReviewModel;