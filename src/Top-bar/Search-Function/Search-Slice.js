import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching Reddit posts
export const filterPosts = createAsyncThunk(
  'search/fetchFilteredPosts',
  async ({ searchTerm, subReddit, after }, { rejectWithValue }) => { // Add `after` parameter
    try {
      // Build the URL with optional subreddit and pagination
      const url = `https://www.reddit.com/${
        subReddit && subReddit !== 'Everything' ? subReddit : ''
      }search.json?q=${encodeURIComponent(searchTerm)}&limit=50${
        after ? `&after=${after}` : ''
      }`;

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Fateburn Mark/0.2 (by /u/GriimSoul)"
        }
      });

      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();

      return {
        posts: data.data.children.map(child => child.data),
        after: data.data.after // Pass the pagination token
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'searchTop',
  initialState: {
    postResults:[],
    loadingPost: false,
    errorPost: null,
    postSearchTerm: '',
    currentSearch: '',
    searchAfter: null
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.postSearchTerm = action.payload;
    },
    initiateSearch: (state, action) => {
      state.currentSearch = action.payload.searchTerm;
    },
    clearSearch: (state, action) => {
      state.postResults = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterPosts.pending, (state) => {
        state.loadingPost = true;
      })
      .addCase(filterPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Append new search results (instead of replacing)
        state.searchPosts = [...state.searchPosts, ...action.payload.posts];
        // Update the pagination token
        state.searchAfter = action.payload.after;
      })
      .addCase(filterPosts.rejected, (state, action) => {
        state.loadingPost = false;
        state.errorPost = action.error.message;
      })
  },
});

export const { setSearchTerm, initiateSearch, clearSearch} = searchSlice.actions;
export default searchSlice.reducer;
