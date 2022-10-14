import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, avatarURL }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        name,
        email,
        password,
        avatarURL,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      console.log("Auth.jsx data: " + data.user);
      console.log("Auth.jsx user info: " + data.message);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/loginUser", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    // console.log("user get: " + data.user);
    return data;
  } catch (error) {
    console.log(error);
  }
});

// //all Users for admin panel
// export const getAllUsers = createAsyncThunk(
//   "auth/admin/getAllUsers",
//   async () => {
//     try {
//       const { data } = await axios.get("/auth/users");
//       const formEntries = Array.from(data.entries());
//       console.log("formEntries ", formEntries);
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    // register
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message; //message from backend
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },

    // Login
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      console.log("login " + action.payload.user._id);
      state.token = action.payload.token;
    },
    [loginUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // Get me (checking log in)
    [getMe.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      // console.log("getme "+ action.payload?.user._id)
      state.token = action.payload?.token;
    },
    [getMe.rejectWithValue]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    // // Get all users
    // [getAllUsers.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getAllUsers.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload.user;
    //   // const formEntries = Array.from(user.entries());
    //   console.log("formEntries slice ", action.payload.user);
    // },
    // [getAllUsers.rejected]: (state) => {
    //   state.loading = false;
    // },
  },
});

//verify if there is a token
export const checkIsAuth = (state) => Boolean(state.auth.token);
export const userData = (action) => Object(action.auth.user);

// export const LoginMessage = (state) => String(state.auth.message);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
