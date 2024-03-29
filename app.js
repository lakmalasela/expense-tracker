const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const checkAuth = require('./src/middleware/checkAuth');

const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

const routes = require('./src/controllers/index');
routes.forEach(([name,handler]) => app.use(`/${name}`,handler)); //handler kiynne functions,controllers tika loop krla arn thiynne


app.use(bodyParser.urlencoded({ extended: false }))
const jwt = require('jsonwebtoken');
const port = 4000;


const connectionURI = 'mongodb+srv://lakmalasela95:lakmal160@cluster0.y6orkp7.mongodb.net/expense-tracker?retryWrites=true&w=majority';

mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //established the connection

//check the if have any error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB Connected');

});
//test
// app.get("/",(req,res)=>{
//     res.send("HELLOOO")
// })

const users = [];
let items = [];

//register user
// app.post("/register",async(req,res)=>{
//     try{
//         //STEP 1 get user data email,password,firstname,lastname
//         const { email,password,firstname,lastname } = req.body;
//         console.log("email",email);
//         console.log("firstname",firstname);
//         console.log("password",password);
//         console.log("lastname",lastname);
   
//         //STEP 2 check email already exists
//         const isExists = users.find(el=>el.email === email);
//         if(isExists){
//            return res.sendStatus(409);
//         }

//         //STEP 3 password hashing
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(password, salt);
//         console.log("Hashed password",hash);

//         users.push( {email,
//             password:hash,
//             firstname,
//             lastname} );

//         console.log(users);

//         res.sendStatus(200);
//     }catch(error){
//         res.sendStatus(500);
//     }
// });

//login
// app.post("/login",async(req,res)=>{

   
//     try{
//     //STEP 1 get the email and password
//     const {email,password} = req.body;
    
//     //STEP 2 CHECK email exist
//     const isEmailExist = users.find((e)=>e.email === email);

//     console.log("svsvs",isEmailExist);
   

// // console.log("cwcwscwscwcw",users[0].email );

//     if(!isEmailExist){
//         return res.sendStatus(401);
    
//     }

//     //STEP 3 Password check
//     const validPassword = await bcrypt.compare( //compare function eken apita balaa gnna puluwan password eka equal da kiyla
//         password,//api insert krna password eka
//         isEmailExist.password
//     );



//     //console.log("Valid Password ",validPassword);

//     if(!validPassword){
//         return res.sendStatus(401);
//     }

//     //STEP 4 generate the jwt access token
//     const accessToken = await jwt.sign({
//         data: isEmailExist.email
//       }, 'MY_TOP_SECRET_KEY');

//     res.status(200).json(accessToken);

//     }catch(error){

//     }
// });

app.post("/itemadd",checkAuth,(req,res)=>{ //item api eka block krnwa authorize nethi users lata
    try{
        items.push(req.body)
        res.sendStatus(200);
    }catch(error){
        res.sendStatus(500);
    }
})

app.listen(port,()=>{
    console.log("HI Express");
})