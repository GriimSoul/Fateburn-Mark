import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching Reddit posts
export const fetchRedditPosts = createAsyncThunk(
  'search/fetchRedditPosts',
  async (searchTerm) => {
    const response = await fetch(`https://www.reddit.com/search.json?q=${searchTerm}`);
    const data = await response.json();
    return data.data.children.map(child => child.data);
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedditPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRedditPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchRedditPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearPosts } = searchSlice.actions;
export default searchSlice.reducer;
