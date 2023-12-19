const schema=require("../models/userschema");



exports.insert=async(req,res)=>{
    try{

        const {username,email,password,phone}=req.body;


        const valid=()=>{

            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              
                return emailRegex.test(email);
            }

            function validatePasswordAndConfirm(password, confirmpass) {
            // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
            
            const isPasswordValid = passwordRegex.test(password);
            const doPasswordsMatch = password === confirmpass;
            
            return isPasswordValid && doPasswordsMatch;
            }

            function validatePhoneNumbers(phone, altphone) {
                // Check if the phone numbers have 10 digits
                const phoneNumberRegex = /^\d{10}$/;
              
                // Check if the phone numbers are the same
                const areSameNumbers = phone === altphone;
              
                return phoneNumberRegex.test(phone) && phoneNumberRegex.test(altphone) && !areSameNumbers;
              }

            function validateUniqueValues(obj, property) {
            const values = obj[property];
            
            // Convert the values into a Set to remove duplicates
            const uniqueValues = [...new Set(values)];
            
            // Compare the length of the original values and the unique values
            return values.length === uniqueValues.length;
            }
            

            if(validateEmail(email) && validatePasswordAndConfirm(password, confirmpass) 
            && validatePhoneNumbers(phone, altphone) && validateUniqueValues(hobbies)){
              return true;
            }


            return false;


        }









        if(valid())
        {
            return res.status(404)
            .json({
                message:"please provide details"
            })
        }
        else{
            const response= schema.create({username,email,password,phone});
    
            return res.redirect("/dashboard");
        }
      
    }
    catch(error)
    {
        console.log(error);
        return res.status(404)
        .json({
            message:"unable to insert a details"
        })
    }
}



exports.deletedoc=async(req,res)=>{
    try{

        const email=req.body.email;


        if(!email)
        {
            return res.status(404)
            .json({
                message:"please provide username"
            })
        }

        const response=await schema.deleteOne({email})
        .then(()=>
        {
            console.log("deleted");

        })
        console.log(response);
        res.status(200)
        .json(
            {
                success:true
            }
        )

    }
    catch(error)
    {
        console.log(error);
         res.status(404)
        .json({
            message:"unable to delete a datav"
        })

    }
}

exports.update=async(req,res)=>{
    try{

        const {username, email, password}=req.body;


        if(!username || !email || !password)
        {
            return res.status(404)
            .json({
                success:true,
                message:"please provide a data "
            })
        }

        const response=await schema.updateOne({username},{email, password}, {new:true});
        
        res.status(200)
        .json({
            success:true,
            data:response,
            message:"data updated succesfully"
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(404)
       .json({
            success:false,
           message:"unable to delete a datav"
       })
    }
}


exports.readall=async(req,res)=>{
    try{

        const response=await schema.find()

        res.status(200)
        .json({
            success:true,
            message:"all data is fetched ",
            data:response
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(404)
       .json({
            success:false,
           message:"unable to fetch all the data"
       })
    }
}

exports.users=async(req,res)=>{
    try{

        const response=await schema.find()
        console.log(response);
        res.status(200)
        .json({
            response,
            success:true,
            message:"all data is fetched ",
            data:response
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(404)
       .json({
            success:false,
           message:"unable to fetch all the data"
       })
    }
}



exports.readbyemail=async(req,res)=>{
    try{

        const email=req.body.email;


        if(!email)
        {
            return res.status(404)
            .json({
                message:"please provide username"
            })
        }

        const response=await schema.findOne({email});
        
        console.log(response);


        res.status(200)
        .json(
            {
                success:true,
                message:"data found using username",
                data:response
            }
        )

    }
    catch(error)
    {
        console.log(error);
         res.status(404)
        .json({
            message:"unable to find data using username"
        })

    }
}
