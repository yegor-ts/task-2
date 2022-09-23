import { configureStore } from '@reduxjs/toolkit';

import formSlice from './reducers/form';
import notesReducer from './reducers/notes';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    form: formSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
