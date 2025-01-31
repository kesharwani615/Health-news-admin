/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const GetAboutUsSlice = createAsyncThunk(
  "article/aboutget",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetAboutUs();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const EditAboutUsSlice = createAsyncThunk(
  "article/aboutupdate/id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.EditAboutUs(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const GetTermsconditionSlice = createAsyncThunk(
  "article/termscondition",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetTermscondition();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const EditTermsconditionSlice = createAsyncThunk(
  "article/termscondition/Edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.EditTermscondition(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const GetPrivacyPolicySlice = createAsyncThunk(
  "article/privacypolicy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GetPrivacypolicy();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);

export const EditPrivacyPolicySlice = createAsyncThunk(
  "article/privacypolicy/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.EditPrivacyPolicy(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch articles." });
    }
  }
);


const StatiContentSlice = createSlice({
  name: 'AboutUs',
  initialState: {
    AboutUs_Data: [],
    EditAboutUs_Data: [],
    Termscondition_Data:[],
    PrivacyPolicyData:[],
    selectedTabForEdit:'',
    OpenTextAreaForEdit:{
      'About Us':false,
      'Terms & Conditions':false,
      'Privacy & policy':false,
    },
    loading: false,
    error: null,
  },
  reducers: {
    handleStaticContentTabForEdit:(state,action)=>{
      state.selectedTabForEdit = action.payload;
    },
    HandleOpenTextAreaForEdit:(state,action)=>{
      state.OpenTextAreaForEdit = action.payload;
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
      .addCase(GetAboutUsSlice.pending, handlePending)
      .addCase(GetAboutUsSlice.fulfilled, (state, action) => {
        state.AboutUs_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(GetAboutUsSlice.rejected, handleRejected)

      .addCase(GetTermsconditionSlice.pending, handlePending)
      .addCase(GetTermsconditionSlice.fulfilled, (state, action) => {
        state.Termscondition_Data = action.payload.data;
        state.loading = false;
      })
      .addCase(GetTermsconditionSlice.rejected, handleRejected)

      .addCase(GetPrivacyPolicySlice.pending, handlePending)
      .addCase(GetPrivacyPolicySlice.fulfilled, (state, action) => {
        state.PrivacyPolicyData = action.payload.data;
        state.loading = false;
      })
      .addCase(GetPrivacyPolicySlice.rejected, handleRejected)

      .addCase(EditAboutUsSlice.pending, handlePending)
      .addCase(EditAboutUsSlice.fulfilled, (state, action) => {
        // state.EditAboutUs_Data = action.payload.data;
        state.loading = false;
        toast.success('About us Content updated successfully')
      })
      .addCase(EditAboutUsSlice.rejected, handleRejected)

      .addCase(EditTermsconditionSlice.pending, handlePending)
      .addCase(EditTermsconditionSlice.fulfilled, (state, action) => {
        // state.EditAboutUs_Data = action.payload.data;
        state.loading = false;
        toast.success('Term & Condition Content updated successfully')
      })
      .addCase(EditTermsconditionSlice.rejected, handleRejected)
    
      .addCase(EditPrivacyPolicySlice.pending, handlePending)
      .addCase(EditPrivacyPolicySlice.fulfilled, (state, action) => {
        // state.EditAboutUs_Data = action.payload.data;
        state.loading = false;
        toast.success('Privacy & Policy Content updated successfully')
      })
      .addCase(EditPrivacyPolicySlice.rejected, handleRejected)

  },
});
export const {handleStaticContentTabForEdit,HandleOpenTextAreaForEdit} = StatiContentSlice.actions;
export default StatiContentSlice.reducer;
