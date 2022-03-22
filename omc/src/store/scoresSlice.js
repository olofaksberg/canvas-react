/** @format */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PROTECTED_GET, PROTECTED_POST, GET, POST } from "../utils/fetch";

// fetches
export const getAllScores = createAsyncThunk("getAllScores", async () => {
  const res = await GET(`/get_all_scores`);
  console.log(res);
  return res;
});

export const getTopScores = createAsyncThunk("getTopScores", async (query) => {
  const res = await GET(`/get_top_scores?${query}`);
  console.log(res);
  return res;
});

export const createScore = createAsyncThunk("createScore", async (newScore) => {
  const res = await POST(`/create_score`, newScore);
  return res;
});

export const deleteAllScores = createAsyncThunk(
  "deleteAllScores",
  async (authLevel) => {
    const res = await PROTECTED_GET(`/delete_all_scores`);
    return res;
  }
);

const initialState = {
  data: { scores: [] },
  status: "idle",
  error: null,
};

export const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // GET DATA
      // get all data
      .addCase(getAllScores.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllScores.fulfilled, (state, action) => {
        const { success, message, data } = action.payload;
        console.log(data);
        if (success) {
          state.status = "succeeded";
          state.data = data;
        } else {
          state.status = "failed";
          state.error = message;
        }
      })
      .addCase(getAllScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get paginated data
      .addCase(getTopScores.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTopScores.fulfilled, (state, action) => {
        const { success, message, data } = action.payload;
        console.log(data);
        if (success) {
          state.status = "succeeded";
          state.data = data;
        } else {
          state.status = "failed";
          state.error = message;
        }
      })
      .addCase(getTopScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ADD DATA
      .addCase(createScore.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createScore.fulfilled, (state, action) => {
        const { success, message, data } = action.payload;
        if (success) {
          state.status = "succeeded";
          state.data = state.data.concat(data);
        } else {
          state.status = "failed";
          state.error = message;
        }
      })
      .addCase(createScore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // DELETE ALL DATA
      .addCase(deleteAllScores.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteAllScores.fulfilled, (state, action) => {
        const { success, message, data } = action.payload;
        if (success) {
          state.status = "succeeded";
          state.data = state.data.filter((d) => d.id !== data);
          //   state.certainData = null;
        } else {
          state.status = "failed";
          state.error = message;
        }
      })
      .addCase(deleteAllScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export states
export const status = (state) => state.scores.status;
export const error = (state) => state.scores.error;

// export data
export const data = (state) => state.scores.data;

export const singleData = (state, id) =>
  state.scores.data.find((d) => d.id === id);
// export const certainData = (state) =>
//   state.users.certainData;

export default scoresSlice.reducer;
