const cloudinary=require("cloudinary").v2;



const imageupload= async(req,res)=>
{
    try
    {
        const file=req.files.imageFile;

        console.log(file);
        const folder="siddhesh";
        const options={folder};
        

        const response= await cloudinary.uploader.upload(file.tempFilePath, options);

        console.log(response);
        res.json({
            success:true
        })

    }
    catch(error)
    {
        console.log(error)
        res.json({
            success:false
        })

    }
}

module.exports={
    imageupload
}