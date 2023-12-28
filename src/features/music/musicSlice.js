import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/musics";

const initialState = {
  dark: true,
  musics: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: "",
};

export const fetchMusic = createAsyncThunk("music/fetch", async () => {
  const fetchedData = await axios.get(url);
  return fetchedData.data;
});

export const createMusic = createAsyncThunk(
  "music/create",
  async (musicData) => {
    const fetchedData = await axios.post(url, musicData);
    return fetchedData.data;
  }
);

export const updateMusic = createAsyncThunk(
  "music/update",
  async (musicData) => {
    const fetchedData = await axios.patch(`${url}/${musicData.id}`, musicData);
    return fetchedData.data;
  }
);

export const deleteMusic = createAsyncThunk("music/delete", async (id) => {
  await axios.delete(`${url}/${id}`);
  return id;
});

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.dark = !state.dark;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.musics = action.payload;
      })
      .addCase(fetchMusic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.error = "Error while fetching musics";
      })
      .addCase(createMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.musics.push(action.payload);
      })
      .addCase(createMusic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.error = "Error while creating music";
      })
      .addCase(updateMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { id } = action.payload;
        const filteredMusic = state.musics.filter((music) => music.id !== id);
        const updatedMusic = action.payload;
        state.musics = [updatedMusic, ...filteredMusic];
      })
      .addCase(updateMusic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.error = "Error while updating music";
      })
      .addCase(deleteMusic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMusic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.musics = state.musics.filter(
          (music) => music.id !== action.payload
        );
      })
      .addCase(deleteMusic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.error = "Error while deleting music";
      });
  },
});

export const { toggleDarkMode } = musicSlice.actions;

export default musicSlice.reducer;

export const selectAllMusic = (state) => state.music.musics;
export const selectDark = (state) => state.music.dark;

export const selectMusicById = (state, musicId) =>
  state.music.musics.find((music) => music.id === musicId);
