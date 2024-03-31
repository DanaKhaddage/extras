const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true, "First name is required"],
        trim:true,
        maxlength:50,
        minlength:3
    },
    lastName:{
        type:String,
        required:[true, "Last name is required"],
        trim:true,
        maxlength:50,
        minlength:3
    },
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        trim:true,
        maxlength:20
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        trim:true,
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true, "Password confirmation is required"],
        trim:true,
        minlength:8
    },
    passwordChangedAt: Date,
    email:{
        type:String,
        unique:true,
        trim:true,
        maxlength:150,
        lowercase:true,
        required:[true,"Email is required"]
    },
    phoneNumber:{
        type:String,
        unique:true,
        trim:true,
        maxlength:20,
        required:[true,"Phone number is required"]
    },
    gender:{
        type:String,
        trim:true,
        enum:["Male", "Female", "Rather not to say"],
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user", "admin"],
        required:true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
{timestamps:true}
);

module.exports=mongoose.model("User", userSchema);