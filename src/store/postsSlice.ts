import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Post } from "@/app/page";

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state: PostState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions;

export const selectCount = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
