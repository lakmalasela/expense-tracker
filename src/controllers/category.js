const express = require('express');
const Category = require('../models/category');
const router = express.Router();
const yup = require ('yup');
const checkAuth = require('../middleware/checkAuth');


/*
create - POST
read - GET
readById - GET
update - PUT
delete - PUT

 */

const categorySchema = yup.object().shape({
    name: yup.string().trim().required('Name is required').max(15,"Maximum length for the name is 15"),
    colorCode: yup.string('Color code is required').required().
    matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { excludeEmptyString: true,message:"Color Code is invalid" })
    // max(7,"Maximum length for the name is 7")
})

//

// create - POST
router.post("/",checkAuth,async (req, res) => {
    try{
    
     await categorySchema.validate(req.body);
    console.log("BODYY",req.body);
    const {name,colorCode} = req.body;


    //check record already exists
    const categoryObj = await Category.findOne({name: new RegExp(`^${name}$`,"i")});//case insensitive wedihata ynne
    console.log("DdDD",categoryObj);
    if(categoryObj){
        return  res.status(400).json(`Category ${name} already exists`);
    }

    const data = new Category({
        name,
        colorCode
        });
        await data.save();
        res.sendStatus(200);//status code ekak withrak yawanawanam
    }catch(error){
        if(error.name === "ValidationError"){
           return  res.status(400).json(error.errors);//400 enne front-end ekee krpu weraddak nisa-bad request
            // res.sendStatus(400);
        }
      return  res.sendStatus(500);
        console.log("ERROR ",error);
        }
});


// read - GET
router.get("/",checkAuth,async (req, res) => {
    try{
    
    console.log("qdq");
    const data = await Category.find();//findall
  
        res.status(200).json(data); //create unu data ekak aai send krnne na,json wedihata output eka gnnwa
    }catch(error){
        res.sendStatus(500);
        }
});

// update - PUT
// router.put("/",async (req, res) => {
//     try{

//     const {name,colorCode,_id} = req.body;
//     console.log("qdq");
//     await Category.updateOne({_id},{name,colorCode}); //_id eka equal wenna ooni,update wenna ooni name,colorCode
      
//     res.sendStatus(200);//status code ekak withrak yawanawanam
//     }catch(error){
//         res.sendStatus(500);
//         }
// });
router.put("/:id",checkAuth,async (req, res) => {
    try{

        await categorySchema.validate(req.body);
    const {id} = req.params;
    console.log("ID IS",id);
   
    const {name,colorCode} = req.body;
    console.log("qdq");
    await Category.updateOne({_id:id},{name,colorCode}); //_id eka equal wenna ooni,update wenna ooni name,colorCode
      
        return  res.sendStatus(200);//status code ekak withrak yawanawanam
    }catch(error){
        return res.sendStatus(500);
        }
});





// delete - PUT
router.delete("/:id",checkAuth,async (req, res) => {
    try{

    const {id} = req.params;
    console.log("DEEE",id);
   
    await Category.updateOne({_id:id},{isDelete:true}); //_id eka equal wenna ooni,update wenna ooni name,colorCode
      
    res.sendStatus(200);//status code ekak withrak yawanawanam
    }catch(error){
        res.sendStatus(500);
        }
});

// readById - GET 
router.get("/:id",checkAuth,async (req, res) => {
    try{
    
        const {id} = req.params;
        const data = await Category.findOne({_id:id});//id ekakin search krnwa nm
  
        res.status(200).json(data); //create unu data ekak aai send krnne na,json wedihata output eka gnnwa
    }catch(error){
        res.sendStatus(500);
        }
});



module.exports = router;