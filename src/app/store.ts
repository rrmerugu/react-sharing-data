import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import canvasDataReducer from "../components/canvas/canvasDataSlice";
import graphNetworkReducer from "../components/canvas/networkSlice";
// import eventsReducer from "../components/events/eventsSlice"

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    counter: counterReducer,
    graphCanvas: canvasDataReducer,
    graphNetwork : graphNetworkReducer
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
