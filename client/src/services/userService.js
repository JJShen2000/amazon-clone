import { request } from "@/utils";

const USER_API_PATH = `user/`;

const getMyInfo = () => {
  return request.get(`${USER_API_PATH}me`, {
    withCredentials: true,
  });
};

export { getMyInfo };
