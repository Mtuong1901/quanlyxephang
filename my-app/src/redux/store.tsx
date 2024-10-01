// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import DeviceReducer from './slices/deviceSlice'

const store = configureStore({
    reducer: {
        device : DeviceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
