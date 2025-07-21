import axiosInstance from "./axiosInstance";
import axios from "axios";
export const  fetchSystemInfo = async () => {
  try {
    const response = await axiosInstance.get("/system-info"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching system info:", error.message);
    throw error;
  }
};



export const  fetchPingtest = async () => {
  try {
    const response = await axiosInstance.get("/ping-test"); 
    return response.data;
  } catch (error) {
    console.error("Error fetching ping test:", error.message);
    throw error;
  }
};


export const fetchTracerttest = async ()=>{
  try{
    const response = await axiosInstance.get("/tracert-test");
    return response.data;
  } catch (error){
    console.error(" Error fatching tracert test:", error.message);
    throw error;
  }
}


export const fetchExample = async ()=>{
  try{
    const response = await axiosInstance.get("/example");
    return response.data;
  }catch (error){
    console.log("Error fatching Example", error.message);
    throw error;
  }
}



export const fetchExample2 = async ()=>{
  try{
    const response = await axiosInstance.get ("/example2");
    return response.data;
  }catch (eror){
    console.log("error fatching Example2", error.message);
    throw error;
  }
}



// export const fetchDummyJson = async () => {
//   try {
//     const response = await axios.get("https://dummyjson.com/test");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching dummyjson:", error.message);
//     throw error;
//   }
// };

// export const postLogin = async (data) => {
//   try {
//     const response = await axiosInstance.post("/login", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
