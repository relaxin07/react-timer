import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './reducers/reducer';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: tasksSlice,
  middleware: [thunk],
});

export default store;