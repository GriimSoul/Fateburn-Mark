import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const homePosts = createAsyncThunk(
  'posts/fetchHomePosts',
  async ({ subReddits, after }, { rejectWithValue }) => { // Accept `after`
    try {
      // handle incorrect / problematic parameter values.
      if (!subReddits || (Array.isArray(subReddits) && subReddits.length === 0)) {
        return rejectWithValue('Invalid subReddits parameter');
      }
      const response = await fetch(
        `https://www.reddit.com/r/${Array.isArray(subReddits) ? subReddits.join('+') : subReddits}/new.json?limit=5${after ? `&after=${after}` : ''}`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      return {
        posts: data.data.children, // New posts
        after: data.data.after // Pagination token for next batch
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name:'posts',
  initialState: {
    posts: [],
    after:null,
    loading: false,
    error: null,
    currentPost: null,
    inPost: false,
  },
  reducers: {
    enterPost: (state, action) => {
      state.inPost = true;
      state.currentPost = action.payload;
    },
    exitPost: (state, action) => {
      state.inPost = false;
      state.currentPost = null;
    },
    clearPosts: (state, action) => {
      state.posts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(homePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(homePosts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.after && action.payload.after !== state.after) {
          state.posts = [...state.posts, ...action.payload.posts];
        }
        else {
          state.posts = action.payload.posts;
        }
        // In case of duplicates, clean them
        state.posts = state.posts.filter((obj, index, self) =>
          index === self.findIndex((t) => t.data.id === obj.data.id)
        );
        state.after = action.payload.after;
      })
      .addCase(homePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
  }
);

export const { enterPost, exitPost, clearPosts} = postsSlice.actions;
export default postsSlice.reducer;
