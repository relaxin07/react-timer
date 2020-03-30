import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from '../store/modules/tasks/index';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: tasksSlice,
  middleware: [thunk],
});

export default store;