import { request } from "@/utils";

const AUTH_API_PATH = `auth/`;

const register = (registerForm) => {
  return request.post(`${AUTH_API_PATH}register`, registerForm);
};

const signin = (signinForm) => {
  return request.post(`${AUTH_API_PATH}signin`, signinForm);
};

const signout = () => {
  localStorage.removeItem("user");
};

// export const authHeader = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user && user.accessToken) {
//     return { Authorization: "Bearer " + user.accessToken };
//   } else {
//     return {};
//   }
// };

export {
  register,
  signin,
  signout,
};
