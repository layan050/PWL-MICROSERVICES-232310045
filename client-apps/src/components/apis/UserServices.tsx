import { RequestAPI } from "@/hooks/request-api";

const API_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const GET_ALL_USERS = async () => {
  return await RequestAPI("GET", `${API_URL}/api/users`);
};

export const CREATE_USER = async (data: any) => {
  return await RequestAPI("POST", `${API_URL}/api/users`, {}, data);
};

export const UPDATE_USER = async (id: number, data: any) => {
  return await RequestAPI("PUT", `${API_URL}/api/users/${id}`, {}, data);
};

export const DELETE_USER = async (id: number) => {
  return await RequestAPI("DELETE", `${API_URL}/api/users/${id}`);
};