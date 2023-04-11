import axios from "axios";

export const uploadOne = async (file: File) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "karentstatic");
    data.append(`api_key`, process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? "");
    data.append("tags", "eclipse");
    data.append("folder", "eclipse");
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dpnbddror/upload`,
      data
    );

    const obj = {
      url: res.data.secure_url as string,
      public_id: res.data.public_id as string,
    };

    return res.data.secure_url as string;
  } catch (error) {
    console.log(error);
    return "";
  }
};
