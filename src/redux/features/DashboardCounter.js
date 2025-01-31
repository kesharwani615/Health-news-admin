/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

// Fetch all articles asynchronously
export const DashboardCounterSlice = createAsyncThunk(
  "/article/getting-article",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCounter();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);


const CounterSlice = createSlice({
  name: 'CounterSlice',
  initialState: {
    CounterSlice_Data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      console.log("action:", action.payload?.errors[0]);
      state.loading = false;
      state.error = action.payload?.message || "An error occurred.";
      toast.error(state.error);
    };

    builder
      .addCase(DashboardCounterSlice.pending, handlePending)
      .addCase(DashboardCounterSlice.fulfilled, (state, action) => {
        state.CounterSlice_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(DashboardCounterSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
        // toast.error(state.error);
      })

  },
});

export default CounterSlice.reducer;
