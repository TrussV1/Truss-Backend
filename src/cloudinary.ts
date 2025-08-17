import * as cloudinary from "cloudinary";
const cld = (cloudinary as any).v2;

(async function() {

    // Configuration
    cld.config({ 
        cloud_name: 'dsqrjfocx', 
        api_key: '492829637533588', 
        api_secret: 'IN2t7roN35vb_66aM6rsb9FOdHM' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cld.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch(() => {
           console.log();
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cld.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cld.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();