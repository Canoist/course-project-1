import { createSlice } from "@reduxjs/toolkit";
import qualitiesService from "../services/quallityService";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      console.log(state);
      state.isLoading = true;
    },
    qualitiesRecieved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesRecieved, qualitiesRequestFailed } =
  actions;

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested());
  try {
    const { content } = await qualitiesService.get();
    dispatch(qualitiesRecieved(content));
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message));
  }
};

export default qualitiesReducer;
