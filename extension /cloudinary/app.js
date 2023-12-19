const express = require('express');
const app = express();

const cloudinary = require('cloudinary').v2;
const fileupload=require("express-fileupload");

app.use(fileupload(
  {
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }
))
const cloudconnect = require("./cloudinary");
cloudconnect()

app.use(express.static('public'));



app.get('/app.js', (req, res) => {
  res.type('application/javascript');
  // Code to send the app.js file
});



// Cloudinary configuration
// cloudinary.config({
//   cloud_name,
//   api_key,
//   api_secret,
// });

// Multer configuration for file upload


app.get('/',(req,res)=>{
    res.redirect('index.html');
})



// app.post('/upload', upload.single('image'), async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file provided' });
//     }
  
//     try {
//       const result = await cloudinary.uploader.upload(req.file.path);
  
//       // Save the result.public_id and result.secure_url in your database if needed
//       const public_id = result.public_id;
//       const secure_url = result.secure_url;
  
//       return res.redirect('/index.html');
//     } catch (err) {
//       console.error('Error uploading image:', err.message);
//       return res.status(500).json({ error: 'Error uploading image' });
//     }

//   });

app.post("/uploadimage",async(req,res)=>
{
  try{

    const file=req.files.image;

    console.log("file came", file)

    if(!file)
    {
      return res.status(404)
      .json(
        {
          success:false,
          message:"please provide all details"
        }
      )
    }

    const folder="siddhesh";
    const option={
      folder
    }

    option.resource_type="auto";


    const response=await cloudinary.uploader.upload(file.tempFilePath,option );



    
    

    console.log(response);
    res.status(200)
    .json(
      {
        success:true,
        message:"file uploaded succesfully",
        imageUrl:response.secure_url
        
      }
    )
  }
  catch(error)
{
  console.log(error);
  res.status(404)
  .json(
    {
      success:false,
      message:"unable to upload a file"
    }
  )
}
})

  

app.get('/images', async (req, res) => {
  try {
    const images = await cloudinary.api.resources();
    res.json(images.resources);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching images' });
  }
});

app.delete('/delete/:public_id', async (req, res) => {
  const { public_id } = req.params;
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    // If result.result === 'ok', the image was successfully deleted
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting image' });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
