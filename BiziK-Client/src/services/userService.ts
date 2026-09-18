import axios from "axios";
import jwt_decode from "jwt-decode";
import { User } from "../interfaces/User";

const api: string = process.env.REACT_APP_API || "";

// Add New User
export const signup = (newUser: User): Promise<any> => {
  return axios.post(`${api}register`, newUser);
};

// Signin
export const signin = (values: User): Promise<any> => {
  return axios.post(`${api}login`, values);
};

// Get User Details
export const getUser = (): Promise<any> => {
  return axios.get(`${api}profile`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

// Get "Biz" payload from token
export const getBiz = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return false;
  try {
    return Boolean((jwt_decode(token) as any).biz);
  } catch {
    return false;
  }
};

// Get "UserId" payload from token
export const getUserId = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return "";
  try {
    return (jwt_decode(token) as any)._id as string;
  } catch {
    return "";
  }
};
