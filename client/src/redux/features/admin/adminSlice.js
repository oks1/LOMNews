import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  users: [],
  loading: false,
};

//all Users for admin panel
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  try {
    const { data } = await axios.get("/auth/users");
    const formEntries = Array.from(data.entries());
    console.log("formEntries ", formEntries);
    console.log("formEntries2 ", data[0].role);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "admin/editUser",
  async (updatedUser) => {
    try {
      const { data } = await axios.put(
        `/users/edit/${updatedUser.id}`,
        updatedUser
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    // Get all users
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      // const formEntries = Array.from(state.users.entries());
      console.log("formEntries slice ", action.payload.users);
    },
    [getAllUsers.rejected]: (state) => {
      state.loading = false;
    },
    // Update user
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      state.users[index] = action.payload;
    },
    [updateUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

//export const users = (state) => state.admin.users;

export default adminSlice.reducer;
