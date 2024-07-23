import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice';
import starredReducer from './starredSlice';
import watchLaterReducer from './watchLaterSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        starred: starredReducer,
        watchLater: watchLaterReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;