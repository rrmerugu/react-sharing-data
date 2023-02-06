import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import graphCanvasReducer from "../graphCanvas/graphCanvasSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    graphCanvas: graphCanvasReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
