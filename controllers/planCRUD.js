const planschema=require("../models/plansschema")
const userschema=require("../models/userschema")



exports.planinsert=async(req,res)=>
{
    try{

        const {userid,planname,imagestorage, videostorage,description,price}=req.body;

        if(!userid || !planname || !imagestorage || !videostorage || !description || !price)
        {
            return res.status(404)
            .json({
                message:"plesse provide all details"
            })
        }

        const response1=await planschema.create({planname,imagestorage, videostorage,description,price});

        const response2=await userschema.findByIdAndUpdate({_id:userid},{$push:{planspurchased:response1._id}},{new:true}).populate("planspurchased").exec()

        console.log(response1._id);
        console.log(response2)
        res.status(200)
        .json({
            success:true,
            message:"plan purchased and updated in users doc",
            data:response2
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(404)
        .json({
            message:"unable to insert a plan"
        })

    }
}