import { createSlice} from '@reduxjs/toolkit';


const subListSlice = createSlice({
  name: 'subList',
  initialState: {
    subReddits: [{title:"/r/Homestuck",
      id:12345
    }],
    selectedSubreddit: '/r/Homestuck',
    loading: false,
    error: null
  },
  reducers: {
    addSubreddit: (state, action) => {
      state.subReddits.push(action.payload);
    },
    removeSubreddit: (state, action) => {
      state.subReddits = state.subReddits.filter(sub => sub.id !== action.payload.id);
    },
    selectSubReddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    }
  }
});

export const { addSubreddit, removeSubreddit, selectSubReddit } = subListSlice.actions;
export default subListSlice.reducer;
