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



// export const  fetchPingtest = async () => {
//   try {
//     const response = await axiosInstance.get("/ping-test"); 
//     return response.data;
//   } catch (error) {
//     console.log("Error fetching ping test:", error.message);
//     throw error;
//   }
// };

export const postPingtest = async (data) => {
  try {
    const response = await axiosInstance.post("/ping-test", data);
    return response.data;
  } catch (error) {
    console.error("Error posting ping test:", error.message);
    throw error;
  }
};


// export const fetchTracerttest = async ()=>{
//   try{
//     const response = await axiosInstance.get("/tracert-test");
//     return response.data;
//   } catch (error){
//     console.error(" Error fatching tracert test:", error.message);
//     throw error;
//   }
// };

export const postTracerttest = async (data) => {
  try {
    const response = await axiosInstance.post("/tracert-test", data);
    return response.data;
  } catch (error) {
    console.error("Error posting tracert test:", error.message);
    throw error;
  }
};


export const fetchNetwork = async ()=>{
  try{
    const response = await axiosInstance.get("/get-network-settings");
    return response.data;
  }catch (error){
    console.log("Error fatching Network", error.message);
    throw error;
  }
};


export const resetNetworkSettings = async () => {
  try {
    const response = await axiosInstance.get("/reset-network-settings");
    return response.data;
  } catch (error) {
    console.log("Error resetting network settings", error.message);
    throw error;
  }
};


export const saveNetworkSettings = async (data)=>{
  try{
    const response = await axiosInstance.post("/save-network-settings", data);
    return response.data;
  }catch (error){
    console.log("Error saving network settings", error.message);
    throw error;
  }
};

  export const fetchLogin = async (data)=>{
  try{
    const response = await axiosInstance.post ("/login", data);
    return response.data;
  }catch (error){
    console.log("Login Failed.... Please check your username and password", error.message);
    throw error;
  }
};

export const fetchChangePassword = async (data) => {
  try {
    console.log('🔐 Changing password with data:', data);
    const response = await axiosInstance.post('/change-password', data);
    console.log('🔐 Change password response:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error Changing Password', error.message);
    throw error;
  }
};

export const systemRestart = async ()=>{
  try{
    const response = await axiosInstance.get ("/system-restart");
    return response.data;
  }catch (error){
    console.log("Error restarting system", error.message);
    throw error;
  }
};


export const serviceRestart = async () => {
  try {
    const response = await axiosInstance.get("/service-restart");
    return response.data;
  } catch (error) {
    console.log("Error restarting service", error.message);
    throw error;
  }
};

export const servicePing = async ()=>{
  try{
  const response = await axiosInstance.get ("/service-ping");
    return response.data;
  }catch (error){
    console.log("Error pinging service", error.message);
    throw error;
  }
};

export const fetchManagementParameters = async () => {
  try {
    const response = await axiosInstance.get('/get-management-parameters');
    console.log('🔍 Fetch management parameters response:', response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching management parameters", error.message);
    throw error;
  } 
};

export const saveManagementParameters = async (data) => {
  try {
    console.log('💾 Saving management parameters:', data);
    const response = await axiosInstance.post('/save-management-parameters', data);
    console.log('💾 Save management parameters response:', response.data);
    return response.data;
  } catch (error) {
    console.log("Error saving management parameters", error.message);
    throw error;
  }
};

export const resetManagementParameters = async ()=>{
  try {
    const response = await axiosInstance.get('/reset-management-parameters')
    return response.data;
  } catch(error){
    console.log('Error resetting management parameters', error.message);
    throw error;
  }
};

export const fetchAccountManageRegister= async (data)=>{
  try{
    const response = await axiosInstance.post('/register-user', data);
    return response.data;
  }catch(error){
    console.log('Error registering user', error.message);
    throw error;
  }
};

export const fetchAccountManageDelete= async (data)=>{
  try{
    const response = await axiosInstance.post('/delete-user', data);
    return response.data;
  }catch(error){
    console.log('Error deleting user', error.message);
    throw error;
  }
};  

export const fetchAccountManageGetAll= async ()=>{
  try {
    const response = await axiosInstance.get('/get-all-user');
    return response.data;
  }catch(error){
    console.log('Error getting all user', error.message);
    throw error;
  }
};


export const fetchAccountManageUpdate= async (data)=>{
  try{
      const response = await axiosInstance.post('/delete-user', data);
    return response.data;
  }catch(error){          
    console.log('Error updating user', error.message);
    throw error;
  }
};


export const fetchDhcpSettings = async()=>{
  try{
    const response = await axiosInstance.get('/fetch-dhcp-settings');
    return response.data;

  }catch(error){
    console.log('Error fetching dhcp settings', error.message);
    throw error;
  }
};

// Dhcp Server Settings
export const fetchSaveDhcpSettings = async(data)=>{
  try{
    const response = await axiosInstance.post('/save-dhcp-settings', data);
    return response.data;
  }catch(error){
    console.log('Error saving dhcp settings', error.message);
    throw error;
  }
};


export const fetchResetDhcpSettings = async()=>{
  try{
    const response = await axiosInstance.get('/reset-dhcp-settings');
    return response.data;
  }catch(error){
    console.log('Error resetting dhcp settings', error.message);
    throw error;
  }
};


// export const fetchWhiteList = async()=>{
//   try {
//     const response = await axiosInstance.get ('/fetch-whitelist') ;
//     return response.data;
//   }catch (error){
//     console.log('Error fetching Whitelist',error.message);
//     throw error;
//   }
// };


// export const fetchSaveWhiteList = async(data)=>{
//   try{
//     const response = await axiosInstance.post('/save-whitelist',data);
//     return response.data;

//   }catch (error){
//     console.log('Error saving WhiteList',error.message);
//     throw error;
//   }
// };
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
