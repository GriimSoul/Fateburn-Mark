import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './Top-bar/Search-Function/Search-Slice';
import subSearchReducer from './Left-Bar/Sub-Search/Sub-Search-Slice';
import subListReducer from './Left-Bar/Sub-List/List-Slice';
import postsReducer from './Main-Area/Post-List/Post-List-Slice';
import commentsReducer from './Main-Area/Comments/Comments-Slice';

const store = configureStore({
  reducer: {
    searchTop: searchReducer,
    subSearch: subSearchReducer,
    subList: subListReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
});

export default store;
