const express = require('express');
const Record = require('../models/Record');
const router = express.Router();
const yup = require ('yup');

const checkAuth = require('../middleware/checkAuth');


const recordSchema = yup.object().shape({
    // categoryName: yup.string().trim().required('Name is required').max(15,"Maximum length for the name is 15"),
    // description: yup.string().trim().max(300,'Maximum length for the Description 300'),
    // categoryRef: yup.string().trim().matches(/^[0-9a-fA-F]{24}$/, { excludeEmptyString: true,message:"Invalid category ref" }).required(),
    // amount: yup.number().required('Amount is required').positive('Amount should be positive number'),
    // // userRef: yup.string().trim().matches(/^[0-9a-fA-F]{24}$/, { excludeEmptyString: true,message:"User ref" }).required(),
    // debitDate: yup.date('Invalid date format').required(),


    category: yup.string().required("Required"),
    description: yup.string().required("Required").max(10,"Must be 10 Characters or less"),
    amount: yup.number().required("Required").min(1,"Must be greater than 0"),
    debitDate: yup.date().required("Required"),


    // matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { excludeEmptyString: true,message:"Color Code is invalid" })
    // max(7,"Maximum length for the name is 7")
})

// create - POST

const createRecord = async(req,res)=>{

        try{

        const{categoryName,description,categoryRef,amount,debitDate} = req.body;
        await  Record.create({
          categoryName,
          description,
          categoryRef,
          amount,
          debitDate
          });
          res.sendStatus(200);
      

        }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}




// const createRecord= async(req,res)=>{
//     try{
   
//       const data =   await recordSchema.validate(req.body);
//       const newRecord = new Record(data);
//       await newRecord.save();
//       res.sendStatus(200);//status code ekak withrak yawanawanam
//         }catch(error){

//             if(error.name === "ValidationError"){
//                 return  res.status(400).json(error.errors);//400 enne front-end ekee krpu weraddak nisa-bad request
//                  // res.sendStatus(400);
//                  console.log("FFFFFFFFFF",error);
//              }

//              console.log("EEERRR",error);
//             res.sendStatus(500);
         
//             } 

        
// }



router.post("/",checkAuth,createRecord);

// router.post("/",async (req, res) => {
//     try{
   
//     const {name,colorCode} = req.body;
//     console.log("qdq");
//     const data = new Record({
//         name,
//         colorCode
//         });
//         await data.save();
//         res.sendStatus(200);//status code ekak withrak yawanawanam
//     }catch(error){
//         res.sendStatus(500);
//         }
// });


// read - GET

const getAllRecord = async(req,res)=>{
    try{
    
        // console.log("qdq");
        const data = await Record.find();//findall
      
            res.status(200).json(data); //create unu data ekak aai send krnne na,json wedihata output eka gnnwa
        }catch(error){
            res.sendStatus(500);
            }
}
router.get('/',checkAuth,getAllRecord);


// router.get("/",async (req, res) => {
//     try{
    
//     console.log("qdq");
//     const data = await Category.find();//findall
  
//         res.status(200).json(data); //create unu data ekak aai send krnne na,json wedihata output eka gnnwa
//     }catch(error){
//         res.sendStatus(500);
//         }
// });

// update - PUT
const updateRecord = async(req,res)=>{
    try{

        const {name,colorCode,_id} = req.body;
        console.log("qdq");
        await Record.updateOne({_id},{name,colorCode}); //_id eka equal wenna ooni,update wenna ooni name,colorCode
          
        res.sendStatus(200);//status code ekak withrak yawanawanam
        }catch(error){
            res.sendStatus(500);
            }

}
router.put('/',checkAuth,updateRecord);

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




// delete - PUT

const recordDelete = async(req,res)=>{
    try{

        const {id} = req.params;
       
        await Record.updateOne({_id:id},{isDelete:true}); //_id eka equal wenna ooni,update wenna ooni name,colorCode
          
        res.sendStatus(200);//status code ekak withrak yawanawanam
        }catch(error){
            res.sendStatus(500);
            }

}

router.delete('/:id',checkAuth,recordDelete);

// router.delete("/:id",async (req, res) => {
//     try{

//     const {id} = req.params;
   
//     await Category.updateOne({_id:id},{isDelete:true}); //_id eka equal wenna ooni,update wenna ooni name,colorCode
      
//     res.sendStatus(200);//status code ekak withrak yawanawanam
//     }catch(error){
//         res.sendStatus(500);
//         }
// });

// readById - GET 
const recordreadById = async()=>{
    try{
    
        const {id} = req.params;
        const data = await Record.findOne({_id:id});//id ekakin search krnwa nm
  
        res.status(200).json(data); //create unu data ekak aai send krnne na,json wedihata output eka gnnwa
    }catch(error){
        res.sendStatus(500);
        }

        
}

router.get('/:id',checkAuth,recordreadById);
// router.get("/:id",async (req, res) => {
//     try{
    
//         const {id} = req.params;
//         const data = await Category.findOne({_id:id});//id ekakin search krnwa nm
  
//         res.status(200).json(data); //create unu data ekak aai send krnne na,json wedihata output eka gnnwa
//     }catch(error){
//         res.sendStatus(500);
//         }
// });




module.exports = router;