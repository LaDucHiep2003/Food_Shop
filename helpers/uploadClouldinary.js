const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


cloudinary.config({ 
    cloud_name: "dsxkwbfyq", 
    api_key: "729674232279543", 
    api_secret: "03MYXH6G60zod9FKLWSv7R4Adu0"
});

let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = async (buffer) => {
  let result = await streamUpload(buffer);
  return result.secure_url
  
}