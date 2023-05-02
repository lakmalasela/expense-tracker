const mongoose  = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    colorCode:{
        type: String,
        require: true
    },
    status:{
        type: Boolean,
        default: true
    },
    isDelete:{
        type:Boolean,
        default: false
    },
    userRef:{
        type:Schema.ObjectId,//foreign key eka wage
        ref: "User"
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }
}


);

module.exports = mongoose.model("Category",CategorySchema)