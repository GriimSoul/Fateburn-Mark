import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.reddit.com${postId}.json`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      data.shift(); // remove the first element which corresponds to the Post itself.
      return data[0].data.children;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'comments/fetchUserProfile',
  async (authorNames, { rejectWithValue }) => {
    try {
      // Create an array of fetch promises for each user
      const fetchPromises = authorNames.map(user => 
        fetch(`https://www.reddit.com/user/${user}/about.json`)
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch user profile');
            return response.json();
          })
          .then(data => ({data}))
      );

      // Wait for all fetch promises to resolve
      const profiles = await Promise.all(fetchPromises);
      return profiles; // Return the array of profiles
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    themProfiles: [],
    loading: false,
    error: null
  },
  reducers: {
    clearUserP: (state, action) => {
      state.userProfiles = [];
    },
    clearAuthorP: (state, action) => {
      state.authorProfiles = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Comments handling
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = [];
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // User profiles handling
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        action.payload.forEach(newProfile => {
          const exists = state.themProfiles.some(oldProfile => oldProfile.data.data.name === newProfile.data.data.name);
          !exists && state.themProfiles.push(newProfile);
          }
        ) 
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  }
});

export const {clearAuthorP, clearComments, clearUserP} = commentsSlice.actions;
export default commentsSlice.reducer;