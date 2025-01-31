/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

// Fetch all articles asynchronously
export const publishArticleManagement = createAsyncThunk(
  "/article/getting-article",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetPublishArticleManagement(page); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);
export const ActiveArticleManagement = createAsyncThunk(
  "article/active-article",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetPublishActiveArticle(page); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);
export const GetPublishHiddenArticleSlice = createAsyncThunk(
  "article/hidden-article",
  async (page , { rejectWithValue }) => {
    try {
      const response = await api.GetPublishHiddenArticle(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const ChangePublishArticleStatusSlice = createAsyncThunk(
  "article/published-articleupdate/",
  async (data , { rejectWithValue }) => {
    try {
      const response = await api.ChangePublishArticleStatus(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const MoveToTrendingArticleSlice = createAsyncThunk(
  "/article/published-trendingarticles",
  async (data , { rejectWithValue }) => {
    console.log("dataaa:",data);
    try {
      const response = await api.MoveToTrendingArticle(data);
      console.log("response:",response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const CategoryListSlice = createAsyncThunk(
  "article/published-categorylist",
  async (_ , { rejectWithValue }) => {
    try {
      const response = await api.CategoryList();
      console.log("response:",response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

const publishArticleManagementSlice = createSlice({
  name: 'PublishedArticleManagement',
  initialState: {
    PublishArticleManagement_Data: [],
    GetPublishHiddenArticleSlice_Data:[],
    GetActiveArticleSlice_Data:[],
    ChangeStatusArticleSlice_Data:[],
    TrendingArticleSlice_Data:[],
    CreateArticleArticleSlice:[],


    
    CategoryListData:[],
    selectedPublishTab:'total_published_article',
    loading: false,
    error: null,
  },
  reducers: {
    NavigateLocatedTabPublish(state,action){
      console.log("NavigateLocatedTabPublish:",action.payload);
      state.selectedPublishTab= action.payload;
     }
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred.";
      toast.error(state.error);
    };

    builder
      .addCase(publishArticleManagement.pending, handlePending)
      .addCase(publishArticleManagement.fulfilled, (state, action) => {
        state.PublishArticleManagement_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(publishArticleManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
      })

      .addCase(GetPublishHiddenArticleSlice.pending, handlePending)
      .addCase(GetPublishHiddenArticleSlice.fulfilled, (state, action) => {
        state.GetPublishHiddenArticleSlice_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(GetPublishHiddenArticleSlice.rejected, handleRejected)

      .addCase(ActiveArticleManagement.pending, handlePending)
      .addCase(ActiveArticleManagement.fulfilled, (state, action) => {
        state.GetActiveArticleSlice_Data = action.payload.data.articles;
        state.loading = false;
      })
      .addCase(ActiveArticleManagement.rejected, handleRejected)

      .addCase(ChangePublishArticleStatusSlice.pending, handlePending)
      .addCase(ChangePublishArticleStatusSlice.fulfilled, (state, action) => {
        state.ChangeStatusArticleSlice_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(ChangePublishArticleStatusSlice.rejected, handleRejected)
      
      .addCase(MoveToTrendingArticleSlice.pending, handlePending)
      .addCase(MoveToTrendingArticleSlice.fulfilled, (state, action) => {
        state.TrendingArticleSlice_Data = action.payload.data;
        state.loading = false;
        toast.success('Article Moved to trending successfully!'); 
      })
      .addCase(MoveToTrendingArticleSlice.rejected, handleRejected)

  
      .addCase(CategoryListSlice.pending, handlePending)
      .addCase(CategoryListSlice.fulfilled, (state, action) => {
        state.CategoryListData = action.payload.data;
        state.loading = false;
      })
      .addCase(CategoryListSlice.rejected, handleRejected)
  },
});

export const { NavigateLocatedTabPublish } = publishArticleManagementSlice.actions;

export default publishArticleManagementSlice.reducer;
