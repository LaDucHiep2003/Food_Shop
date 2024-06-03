// Upload Image
const uploadImage = document.querySelector("[upload-image]")

const cencelImage = document.querySelector("[cencel-upload]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")

    uploadImageInput.addEventListener("change", (e) =>{
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
        cencelImage.classList.remove("d-none")
    })

    cencelImage.addEventListener("click", () =>{
        uploadImageInput.value= "" 
        uploadImagePreview.src = ""
        cencelImage.classList.add("d-none")
    })
}



// End Upload Image