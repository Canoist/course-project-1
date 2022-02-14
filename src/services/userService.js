import httpService from "./httpService";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint);
    return data;
  },
  create: async (payLoad) => {
    const { data } = await httpService.put(userEndPoint + payLoad._id, payLoad);
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndPoint + localStorageService.getUserId()
    );
    return data;
  }
};

export default userService;
