import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching Reddit posts
export const filterPosts = createAsyncThunk(
  'searchTop/fetchRedditPosts',
  async ({searchTerm, subReddit}) => {
    const response = await fetch(`https://www.reddit.com${ subReddit ? subReddit : "/"}search.json?q=${searchTerm}`);
    const data = await response.json();
    return data.data.children.map(child => child.data);
  }
);

const searchSlice = createSlice({
  name: 'searchTop',
  initialState: {
    postResults:[],
    loadingPost: false,
    errorPost: null,
    postSearchTerm: '',
    backupPosts:[],
    currentSearch: ''
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.postSearchTerm = action.payload;
    },
    initiateSearch: (state, action) => {
      state.backupPosts = action.payload.currentPosts;
      state.currentSearch = action.payload.searchTerm;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.postResults = action.payload;
      })
      .addCase(filterPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { setSearchTerm, initiateSearch} = searchSlice.actions;
export default searchSlice.reducer;
