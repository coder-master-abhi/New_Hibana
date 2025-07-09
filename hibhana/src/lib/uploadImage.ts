// lib/uploadImage.ts
export async function uploadImage(file: File): Promise<string> {


  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Hibana"); 

  const response = await fetch("https://api.cloudinary.com/v1_1/dkthq8qoy/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Upload did not return a secure URL.");
  }

  return data.secure_url;
}
// This function uploads an image file to Cloudinary and returns the secure URL.
// It uses FormData to send the file and upload preset, and handles errors if the upload fails.