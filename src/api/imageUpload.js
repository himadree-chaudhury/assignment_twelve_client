import axios from "axios";
import toast from "react-hot-toast";

export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  console.log(formData);
  
  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData,
    );
    return data.data.display_url;
  } catch (error) {
    toast.error("Image upload failed: " + error.message);
  }
};
