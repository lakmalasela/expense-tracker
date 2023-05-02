const express = require('express');
const User = require('../models/user')
const router = express.Router();
const yup = require ('yup');


const userSchema = yup.object().shape({

    firstname: yup.string().trim().required("First Name is Required").max(8,"Maximum length for the name is 8"),
    lastname:yup.string().trim().required("Last Name is Required").max(8,"Maximum length for the name is 8"),
    email:yup.string().trim().required("Email is Required"),
    password:yup.string().trim().required("Password is Required").max(10,"Maximum length for the name is 8"),
    lastseen: yup.date('Invalid date format').required()
});

//post
const createUser = async(req,res)=>{

    try{
        const data = await userSchema.validate(req.body);
        const newUser = new User(data);
        await newUser.save();
        res.sendStatus(200);
    }catch(error){

        if(error.name === "ValidationError"){
            return res.status(400).json(error.errors)
        }
        res.sendStatus(500);
    }
}

router.post("/",createUser);

//get
const getUser = async(req,res)=>{

    try{
        const data =   await User.find();
        res.status(200).json(data);

    }catch(error){
        res.sendStatus(500);
    }

}
router.get('/',getUser)


module.exports = router;