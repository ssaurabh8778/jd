import { HttpRequest } from "../helpers/services";
import { parseCookies } from "nookies";

export const useUserTools = () => {
  const { accessToken } = parseCookies();
  console.log("the access token", accessToken);
  const defaultHeader = { Authorization: `Bearer ${accessToken}` };

  const loginHttp = (data, headersData) =>
    new Promise((resolve, reject) => {
      HttpRequest("POST", "/users/authenticate", data)
        .then((res) => {
          resolve(res?.data);
        })
        .catch((err) => {
          reject(err?.response?.data.message);
        });
    });

  const registerHttp = (data, headersData) =>
    new Promise((resolve, reject) => {
      HttpRequest("POST", "/users/register", data)
        .then((res) => {
          resolve(res?.data);
        })
        .catch((err) => {
          reject(err?.response?.data.message);
        });
    });

  const fetchUserHttp = () =>
    new Promise((resolve, reject) => {
      HttpRequest("GET", "/users/current", {}, defaultHeader)
        .then((res) => {
          resolve(res?.data);
        })
        .catch((err) => {
          reject(err?.response?.data.message);
        });
    });

  const updateUserHttp = (data, id) =>
    new Promise((resolve, reject) => {
      HttpRequest("PUT", `/users/${id}`, data, defaultHeader)
        .then((res) => {
          resolve(res?.data);
        })
        .catch((err) => {
          reject(err?.response?.data.message);
        });
    });

  return {
    loginHttp,
    registerHttp,
    fetchUserHttp,
    updateUserHttp,
  };
};
