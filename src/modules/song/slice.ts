import { createSlice } from "@reduxjs/toolkit";
import api from "./api";
import { SongState } from "./types";

const initialState: SongState = {
  songs: [],
};

const roleSlice = createSlice({
  initialState,
  name: "role",
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getSongs.matchFulfilled,
      (state, { payload }) => {
        state.songs = payload;
      }
    );
  },
});

export default roleSlice.reducer;
