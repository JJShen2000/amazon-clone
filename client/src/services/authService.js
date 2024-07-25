import { request } from "@/utils";

const AUTH_API_PATH = `auth/`;

const register = (registerForm) => {
  return request.post(`${AUTH_API_PATH}register`, registerForm);
};

const signin = (signinForm) => {
  // return request.post(`${AUTH_API_PATH}signin`, signinForm, {
  //   withCredentials: true,
  // });
  return request.post(`${AUTH_API_PATH}signin`, signinForm);
};

const signout = () => {
  localStorage.removeItem("user");
};

export { register, signin, signout };
