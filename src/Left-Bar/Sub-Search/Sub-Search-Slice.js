import { createSlice } from '@reduxjs/toolkit';

const subSearchSlice = createSlice({
  name: 'subSearch',
  initialState: {
    subreddits: [],
  },
  reducers: {
    addSubreddit: (state, action) => {
      state.subreddits.push(action.payload);
    },
    removeSubreddit: (state, action) => {
      state.subreddits = state.subreddits.filter(sub => sub !== action.payload);
    },
    clearSubreddits: (state) => {
      state.subreddits = [];
    },
  },
});

export const { addSubreddit, removeSubreddit, clearSubreddits } = subSearchSlice.actions;
export default subSearchSlice.reducer;
