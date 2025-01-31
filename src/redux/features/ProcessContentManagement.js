/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

// Fetch all articles asynchronously
export const proccessContentManagement = createAsyncThunk(
  "/article/getting-article",
  async (page , { rejectWithValue }) => {
    try {
      const response = await api.GteProcessContentManagement(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const UpdateStatus_ProccessContentManagement = createAsyncThunk(
  "article/updationpublished-articles/",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.PutProcessContentManagement(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update article status." });
    }
  }
);

export const GetApproved_ProccessContentManagement = createAsyncThunk(
  "article/approved-article",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetApprovedProcessContentManagement(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch approved articles." });
    }
  }
);

export const GetRejected_ProccessContentManagement = createAsyncThunk(
  "article/rejected-article",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.GetRejectedProcessContentManagement(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch rejected articles." });
    }
  }
);

export const GetArticleUsingID_ProccessContentManagement = createAsyncThunk(
  "/article/single-article/",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.GetArticleOnIdBasisProcessContentManagement(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: `Failed to fetch article with ID ${id}.` });
    }
  }
);

export const UpdateArticleID_ProccessContentManagement = createAsyncThunk(
  "/article/updatesingle-article/",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.UpdateContent(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update the article." });
    }
  }
);

export const CreateArticleArticleSlice = createAsyncThunk(
  "/article/sending-article",
  async (data , { rejectWithValue }) => {
    console.log("dataaa:",data);
    try {
      const response = await api.CreateArtcle(data);
      console.log("response:",response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const GetImportedArticleSlice = createAsyncThunk(
  "admin/firstpromptdata",
  async (param, { rejectWithValue }) => {
    try {
      const response = await api.GetImportArticle(param);
      return response.data;
    } catch (error) {
      console.log("error:",error);
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const SearchArticleSlice = createAsyncThunk(
  "admin/searchbar",
  async (search, { rejectWithValue }) => {
    try {
      const response = await api.SearchAPIArticle(search);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

const proccessContentManagementSlice = createSlice({
  name: 'proccessContentManagement',
  initialState: {
    proccessContentManagement_Data: [],
    UpdateStatus_ProccessContentManagement_Data: [],
    GetApproved_ProccessContentManagement_Data: [],
    GetRejected_ProccessContentManagement_Data: [],
    CreatedArticle:[],
    GetArticleUsingID_ProccessContentManagement_Data: [],
    UpdateArticleID_ProccessContentManagement_Data: [],
    proccessContentManagement_ImportedData: [],
    searchApiForDifferentTab:{
      name: "",
      search: "",
    },
    selectedTab:'',
    selectedRoute:'/Processed_Content_Management',
    loading: false,
    Importloading: false,
    error: null,
  },
  reducers: {
     NavigateLocatedRoute:(state,action)=>{
      state.selectedTab = action.payload; 
     },
     NavigateMainRoute:(state,action)=>{
     state.selectedRoute = action.payload;
     },
     SearchApiForProcess:(state,action)=>{
      state.searchApiForDifferentTab = action.payload
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
      .addCase(proccessContentManagement.pending, handlePending)
      .addCase(proccessContentManagement.fulfilled, (state, action) => {
        state.proccessContentManagement_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(proccessContentManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
        // toast.error(state.error);
      })

      .addCase(UpdateStatus_ProccessContentManagement.pending, handlePending)
      .addCase(UpdateStatus_ProccessContentManagement.fulfilled, (state, action) => {
        state.UpdateStatus_ProccessContentManagement_Data = action.payload.data;
        state.loading = false;
        toast.success("Article status changed");
      })
      .addCase(UpdateStatus_ProccessContentManagement.rejected, handleRejected)

      .addCase(GetApproved_ProccessContentManagement.pending, handlePending)
      .addCase(GetApproved_ProccessContentManagement.fulfilled, (state, action) => {
        state.GetApproved_ProccessContentManagement_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(GetApproved_ProccessContentManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
        // toast.error(state.error);
      })

      .addCase(GetRejected_ProccessContentManagement.pending, handlePending)
      .addCase(GetRejected_ProccessContentManagement.fulfilled, (state, action) => {
        state.GetRejected_ProccessContentManagement_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(GetRejected_ProccessContentManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
        // toast.error(state.error);
      })

      .addCase(GetArticleUsingID_ProccessContentManagement.pending, handlePending)
      .addCase(GetArticleUsingID_ProccessContentManagement.fulfilled, (state, action) => {
        console.log("action:",action.payload)
        state.GetArticleUsingID_ProccessContentManagement_Data = action.payload.gettingData;
        state.loading = false;
      })
      .addCase(GetArticleUsingID_ProccessContentManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
        // toast.error(state.error);
      })

      .addCase(CreateArticleArticleSlice.pending, handlePending)
      .addCase(CreateArticleArticleSlice.fulfilled, (state, action) => {
        state.CreatedArticle = action.payload.data;
        state.loading = false;
        toast.success('Article Created successfully!'); 
      })
      .addCase(CreateArticleArticleSlice.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.message || "An error occurred.";
        toast.error(state.error);
      })

      .addCase(UpdateArticleID_ProccessContentManagement.pending, handlePending)
      .addCase(UpdateArticleID_ProccessContentManagement.fulfilled, (state, action) => {
        state.UpdateArticleID_ProccessContentManagement_Data = action.payload.data;
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(UpdateArticleID_ProccessContentManagement.rejected, (state, action) => {
        console.log("action:", action.payload?.errors[0]);
        state.loading = false;
        state.error = action.payload?.errors[0]|| "An error occurred.";
        toast.error(state.error);
      })

      .addCase(GetImportedArticleSlice.pending, (state,action)=>{
       state.Importloading = true
      })
      .addCase(GetImportedArticleSlice.fulfilled, (state, action) => {
        console.log("action.payload.data:",action?.payload?.data);
        state.proccessContentManagement_ImportedData = action?.payload?.data;
        state.Importloading = false;
        toast.success(`${action.payload?.totalDocumentsInserted} Article inserted!`);
      })
      .addCase(GetImportedArticleSlice.rejected, (state, action) => {
        console.log("action?.payload:",action?.payload);
        state.loading = false;
        state.error = action?.payload?.error || "An error occurred.";
        toast.error(state.error);
      }
  )
      .addCase(SearchArticleSlice.pending, handlePending)
      .addCase(SearchArticleSlice.fulfilled, (state, action) => {
        state.proccessContentManagement_Data=action.payload.data;
        state.loading = false;
        // toast.success(action.payload.message);
      })
      .addCase(SearchArticleSlice.rejected, handleRejected);
  },
});

  export const {NavigateLocatedRoute,NavigateMainRoute,SearchApiForProcess} = proccessContentManagementSlice.actions;


export default proccessContentManagementSlice.reducer;
