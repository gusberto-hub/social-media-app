import { createSlice } from "@reduxjs/toolkit";

export const postsFilter = createSlice({
  name: "postsFilter",
  initialState: 'All',
  reducers: {
    setPostsFilter: (state, action) => {
      return state = action.payload;
    },
  },
});
export const { setPostsFilter } = postsFilter.actions;
export default postsFilter.reducer;