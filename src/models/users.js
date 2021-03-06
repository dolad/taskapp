const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true,
        trim : true
    },
    email:{
        type: String,
        required : true,
        unique :true,
        trim : true,
        lowercase : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error("email must be a valid email");
            }
        }
    },
    password:{
        type : String,
        required : true,
        trim : true,
        minlength : 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('u cant set default password to be password');
            }
        }
    },
    age :{
        type : Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be greater than zero');
            }
        }
    },
    tokens :[{
        token:{
            type: String,
            required : true
        }
    }],
    avatar : {
        type : Buffer
    }
 },
    
 {
     timestamps: true
 },
 );
// this is not stored in the database this is meant for relationship
 userSchema.virtual('task', {
     ref : "Task",
     localField : '_id',
     foreignField : 'owner'
 })

 userSchema.methods.toJSON = function (){
     const user = this;
     const userObject = user.toObject();

     delete userObject.password;
     delete userObject.tokens;
     delete userObject.avatar;

     return userObject;
 }

 userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;

 }


 userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');

    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user
 }




//  hash the plain text password
 userSchema.pre('save', async function (next) {
     const user = this;
    
    //check if the password has been modified
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }  
     console.log('Just before saving');
     next();
 })

// create a middleware that delete task associated with a user
userSchema.pre('remove', async function (next){

    const user = this;
    await Task.deleteMany({owner : user._id});
    next();

})


const User = mongoose.model('User', userSchema );

 module.exports = User;