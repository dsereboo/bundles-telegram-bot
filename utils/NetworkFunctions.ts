//Library
import axios from "axios";
// import { Bundles, CheckExistence, PurchaseRequest, PurchaseResponse, RegisterRequest, User } from "../types/common";

const axiosClient = axios.create({
    // baseURL: process.env.API_URL,
    // baseURL: process.env.API_URL,
    baseURL: "https://localhost:7018/api",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

//API user login
export const getToken = async () => {
  // return await axiosClient.post<string>("/Auth/apiuserlogin", {username:process.env.BOTUSER, password:process.env.PASSWORD})
 let token = await axiosClient.post<string>("/Auth/apiuserlogin", {username:process.env.BOTUSER, password:process.env.PASSWORD})
  if(token.status === 200){
    return token.data
  }else{
    return "error"
  }
}

export const postReq = async <T,S> (url:string, token:string, payload:T) => {
  return axiosClient.post<S>(url, {...payload}, {headers:{Authorization:`Bearer ${token}`}})
}

//Check existence
// export const checkUserExistence = async (telegramUserId:string, token:string) => {

//   return await axiosClient.post<CheckExistence>("/Auth/checkuser", {telegramUserId:telegramUserId}, {headers:{Authorization:`Bearer ${token}`}})
// }

//Register user
// export const registerUser = async (newUser:RegisterRequest,token:string) => {
//   return await axiosClient.post("/Auth/registeruser", {...newUser}, {headers:{Authorization:`Bearer ${token}`}})
// }


//Bundle Packages
// export const getBundlePackages= async(bundleId:number, token:string)=>{
//     return await axiosClient.post<Array<Bundles>>("/Bundles/bundleList", {bundleId:bundleId}, {headers:{
//       Authorization:`Bearer ${token}`
//     }})
// }

//Purchase Bundle Package
// export const buyBundlePackage=async(request:PurchaseRequest, token:string)=>{
//   //type request
//   return await axiosClient.post("/Bundles/purchase", {...request},{headers:{
//     Authorization:`Bearer ${token}`
//   }})
// }

//Validate
// export const validateUserPin = async(userId:number, pin:number, token:string)=>{
//   return await axiosClient.post<Array<User>>("/Auth/validatePin",{userId:userId, pin:pin},{headers:{
//     Authorization:`Bearer ${token}`
//   }})
// }

//Suspend User
export const suspendUser = async(userId:number,token:string)=>{
  return await axiosClient.post("/Auth/suspenduser", {userId:userId}, {headers:{
    Authorization:`Bearer ${token}`
  }}) 
}

