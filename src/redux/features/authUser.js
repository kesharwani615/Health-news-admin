import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api.js";
import { toast } from 'react-toastify';

export const UserLoginSlice = createAsyncThunk(
  "admin/admin-login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.LoginUser(data);
      return response.data; // Return the response data if successful
    } catch (error) {
      console.error("API error:", error);
      // Pass the error response to rejected case
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const SendEmailToVerifySlice = createAsyncThunk(
  "admin/verifylinkshare",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.SendVerifyEmail(email);
      return response.data; // Return the response data if successful
    } catch (error) {
      console.error("API error:", error);
      // Pass the error response to rejected case
      return rejectWithValue(error.response?.data || { message: "An error occurred" });
    }
  }
);

export const ResetPasswordSlice = createAsyncThunk(
  "/admin/admin-passwordChange/:id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.ResetPasswordApi(data);
      return response.data; // Return the response data if successful
    } catch (error) {
      console.error("API error:", error);
      // Pass the error response to rejected case

      return rejectWithValue({message:error.response?.data?.errors[0]} || { message: "An error occurred" });
    }
  }
);



const authSlice = createSlice({
  name: 'UserLogin',
  initialState: {
    user_Data: [],
    userLogout: null,
    loading: false,
    error: null,
    validationErrors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UserLoginSlice.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
        state.validationErrors = []; // Clear previous validation errors
      })
      .addCase(UserLoginSlice.fulfilled, (state, action) => {
        state.user_Data = [action.payload]; // Update user data
        state.userLogout = null;
        localStorage.setItem("token", JSON.stringify(action?.payload?.token));
        localStorage.setItem("userDetails", JSON.stringify(action?.payload?.checkingAdmin));
        state.loading = false;
        toast.success(action?.payload?.message); // Show success toast
      })
      .addCase(UserLoginSlice.rejected, (state, action) => {
        console.log("action:",action);
        state.loading = false;
        state.error = action.payload?.message || "An error occurred"; // Extract error message
        state.validationErrors = action.payload?.errors || []; // Extract validation errors
        toast.error(state.error); // Show error toast
      })

      .addCase(SendEmailToVerifySlice.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
        state.validationErrors = []; // Clear previous validation errors
      })
      .addCase(SendEmailToVerifySlice.fulfilled, (state, action) => {
        state.VerifyEmail = action.payload; // Update user data
        state.loading = false;
        toast.success("Email sent Please check"); // Show success toast
      })
      .addCase(SendEmailToVerifySlice.rejected, (state, action) => {
        console.log("action:",action);
        state.loading = false;
        state.error = action.payload?.message || "An error occurred"; // Extract error message
        state.validationErrors = action.payload?.errors || []; // Extract validation errors
        toast.error(state.error); // Show error toast
      })

      .addCase(ResetPasswordSlice.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
        state.validationErrors = []; // Clear previous validation errors
      })
      .addCase(ResetPasswordSlice.fulfilled, (state, action) => {
        state.resetPassword = action.payload; // Update user data
        state.loading = false;
        toast.success("Password Updated successfully!"); // Show success toast
      })
      .addCase(ResetPasswordSlice.rejected, (state, action) => {
        // console.log("action:",action);
        state.loading = false;
        state.error = action.payload?.message || "An error occurred";
        state.validationErrors = action.payload?.errors || []; 
        toast.error(state.error);
      });
  },
});

export default authSlice.reducer;
