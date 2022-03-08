import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersRecieved, usersRequestFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadUsersList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().users;
  if (isOutdated(lastFetch)) {
    dispatch(usersRequested());
    try {
      const { content } = await userService.get();
      dispatch(usersRecieved(content));
    } catch (error) {
      dispatch(usersRequestFailed(error.message));
    }
  }
};

export function getUsers() {
  return function (state) {
    return state.users.entities;
  };
}
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export default usersReducer;
