import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addSubreddit } from '../Sub-List/List-Slice';

// Create Thunk for Subreddit Search

export const searchSubs = createAsyncThunk(
  'subSearch/fetchSubReddits',
  async (searchTerm) => {
    const response = await fetch(`https://www.reddit.com/subreddit/search.json?q=${searchTerm}`);
    const data = await response.json();
    return data.data.children.map(child => child.data);
  }
)


const subSearchSlice = createSlice({
  name: 'subSearch',
  initialState: {
    subSearchInput: '',
    subRedditResults: [],
    loading: false,
    error: null
  },
  reducers: {
    clearSubReddits: (state) => {
      state.subRedditResults = [];
    },
    setSearchInput: (state, action) => {
      state.subSearchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSubs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchSubs.fulfilled, (state, action) => {
        state.loading = false;
        state.subRedditResults = action.payload;
      })
      .addCase(searchSubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSubreddit, (state, action) => {
        state.subRedditResults.filter(sub => sub.id !== action.payload.id);
      })
  }
});

export const { clearSubReddits, setSearchInput } = subSearchSlice.actions;
export default subSearchSlice.reducer;
