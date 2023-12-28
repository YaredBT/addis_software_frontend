import { configureStore } from "@reduxjs/toolkit";
import MusicReducer from "../features/music/musicSlice";

export const store = configureStore({
  reducer: {
    music: MusicReducer,
  },
});
