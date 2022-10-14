import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import singleNewsSlice from "./features/news/singleNewsSlice";
import commentSlice from "./features/comments/commentsSlice";
import adminSlice from "./features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    news: singleNewsSlice,
    comment: commentSlice,
    admin: adminSlice,
  },
});
