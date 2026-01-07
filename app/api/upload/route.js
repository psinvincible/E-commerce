export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");


    if(!file){
        return Respone.json({error: "No file uploaded!"});
    };

    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    const result = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: cloudForm,
    }
    )

    const data = await result.json();

    if(!result.ok){
        return Response.json({error: "Upload failed"});
    }

    return Response.json({url: data.secure_url});
    
}