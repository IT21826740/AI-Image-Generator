import axios from "axios";

// http://localhost:8080/api/
const API = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImageFromPrompt = async (data) => {
  try {
    const response = await API.post("/generateImage/", data);
    return response;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
