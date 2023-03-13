//Library
import axios from "axios";
import { Bundles, PurchaseRequest, PurchaseResponse, User } from "../types/common";

const axiosClient = axios.create({
    // baseURL: process.env.API_URL,
    // baseURL: process.env.API_URL,
    baseURL: "http://localhost:5018/api",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });


//Bundle Packages
export const getBundlePackages= async(bundleId:number)=>{
    return await axiosClient.post<Array<Bundles>>("/Bundles/bundleList", {bundleId:bundleId})
}


//Validate
export const validateUserPin = async(userId:number, pin:number)=>{
  return await axiosClient.post<Array<User>>("/Auth/validatePin",{userId:userId, pin:pin})
}

//Purchase Bundle Package
export const buyBundlePackage=async(request:PurchaseRequest)=>{
    return await axiosClient.post<Array<PurchaseResponse>>("/Bundles/purchase", {...request})
}

