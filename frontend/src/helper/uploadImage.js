const url = `https://api.cloudinary.com/v1_1/dzvspes2v/image/upload`;
//dzvspes2v la cloud_name
const uploadImage = async (image) => {
    const formData = new FormData()
    formData.append("file",image)
  formData.append("upload_preset", "coffee_product");

  const dataResponse = await fetch(url,{
    method : "post",
    body : formData
})

return dataResponse.json()
};

export default uploadImage;
