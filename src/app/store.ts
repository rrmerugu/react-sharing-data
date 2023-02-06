import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import canvasReducer from "../components/canvas/canvasSlice";
// import eventsReducer from "../components/events/eventsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    graphCanvas: canvasReducer,
    // events : eventsReducer
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
