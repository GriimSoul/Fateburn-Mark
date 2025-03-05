import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './Top-bar/Search-Function/Search-Slice';
import subSearchReducer from './Left-Bar/Sub-Search/Sub-Search-Slice';
import subListReducer from './Left-Bar/Sub-List/List-Slice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    subSearch: subSearchReducer,
    subList: subListReducer
  }
});

export default store;
