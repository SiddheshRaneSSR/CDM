const express=require("express");
const app=express();
require("dotenv").config()
const cors = require('cors');
const cookieparser=require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())
const PORT=process.env.PORT || 4000;
const dbconnect=require("./config/database");
const session =require('express-session');

dbconnect();
app.use(express.static('frontend'));


app.use(cookieparser());
app.use(session({
  secret: "secretKey",
  resave:false,
  saveUninitialized:true
}));

app.get('/',(req,res)=>{

  res.sendFile(__dirname+"/frontend/home.html");
})
app.get('/index.html',(req,res)=>{
  res.sendFile(__dirname+"/frontend/home.html");
})
app.get('/login',(req,res)=>{
  res.sendFile(__dirname+"/frontend/login.html");
})
app.get('/plans',(req,res)=>{
  res.sendFile(__dirname+"/frontend/plans.html");
})
app.get('/features',(req,res)=>{
  res.sendFile(__dirname+"/frontend/features.html");
})
app.get('/dashboard',(req,res)=>{
  // res.sendFile(__dirname+"/frontend/dashboard.html");
  res.sendFile(__dirname+"/frontend/dashboard.html");

  
  // const checkAuthentication = (req, res) => {

    
  // if (!req.session.isLoggedIn) {
  //   // User is not signed in, redirect to login/signup page
  //   res.redirect('/login'); // Replace '/login' with the appropriate login/signup route
  // } else {
  //   // User is signed in, continue to the next middleware or route handler
    
  // }  }



})
app.get('/admin',(req,res)=>{
  res.sendFile(__dirname+"/frontend/admin.html");
})
app.get('/payment',(req,res)=>{
  res.sendFile(__dirname+"/frontend/payment.html");
})
app.get('/signup',(req,res)=>{
  res.sendFile(__dirname+"/frontend/signup.html");
})

app.get('/total-storage', async (req, res) => {
  try {
    const result = await cloudinary.api.usage();
    const totalStorage = result.total_usage;
    res.json({ totalStorage });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching total storage' });
  }
});





const router=require("./routes/route");
app.use("", router)
app.listen(PORT,()=>
{
    console.log("server started at " + PORT)
})

 