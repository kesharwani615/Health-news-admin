import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const DeletArticleSlice = createAsyncThunk(
  "article/deleting-article/id",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.DeleteArticle(id);
      return response.data; // Return the response data if successful
    } catch (error) {
      console.error("API error:", error);
      // Pass the error response to rejected case
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

const DeletArticle = createSlice({ 
  name: 'deleteArticle',
  initialState: {
    deletedData:[],
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
      .addCase(DeletArticleSlice.pending, handlePending)
      .addCase(DeletArticleSlice.fulfilled, (state, action) => {
        state.deletedData = action.payload.data;
        state.loading = false;
        toast.success('Article Deleted Successfully')
      })
      .addCase(DeletArticleSlice.rejected,handleRejected)
    }
});


export default DeletArticle.reducer;
