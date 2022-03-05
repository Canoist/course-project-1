import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professionService";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecieved, professionsRequestFailed } =
  actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().professions;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsRecieved(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

export function getProfessions() {
  return function (state) {
    return state.professions.entities;
  };
}
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading;

export const getProfessionById = (professionId) => (state) => {
  if (state.professions.entities) {
    for (const profession of state.professions.entities) {
      if (professionId === profession._id) {
        return profession;
      }
    }
  }
  return false;
};

export default professionsReducer;
