import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './Top bar/Search Function/Search Slice';
import subSearchReducer from './Left Bar/SubSearch/Sub Search Slice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    subSearch: subSearchReducer,
  }
});

export default store;
