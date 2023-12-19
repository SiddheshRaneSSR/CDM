import axios from 'axios';
import react ,  {useState} from 'react';

cloudinary.config({

    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


function uploadFiles(){

    const [image,setImage]=useState();

   function handleFiles(event){
    const file=event.target.files[0];
    const formData=new FormData();
    formData.append('file',file);
    formData.append("upload_present",api_key);
    axios.post(`https://api.cloudniary.com/v1_1/${cloud_name}/image/upload`,formData)
    .then(res => setImage(res.data.secure_url))
    .catch(err=> console.log(err));
   

    }

    return (
        
            <div className='d-flex justify-content-center bg-dark vh-100'>
                <div className='w-25 bg-white mt-5 p-5' >
                    <input type="file" name="image" onChange={handleFiles}></input>
        
                </div>
            </div>
           
    )
}


export default uploadFiles;