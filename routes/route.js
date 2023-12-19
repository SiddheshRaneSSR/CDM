const express=require("express");
const { insert, deletedoc, update, readall, readbyemail,users} = require("../controllers/CRUD");
const login = require("../controllers/login");
const { planinsert } = require("../controllers/planCRUD");
const  payment  =require("../controllers/payment");
const router=express.Router();



router.post("/insert",insert);
router.delete("/delete",deletedoc)
router.put("/update",update);
router.get("/get",readall)
router.post("/login",login.login)
router.get("/readbyemail", readbyemail)
router.get("/users",users)
router.post("/insertplan",planinsert) 
router.post("/initiatePayment",payment.initiatePayment)
router.post("/verifyPayment",payment.verifyPayment)

module.exports=router;

