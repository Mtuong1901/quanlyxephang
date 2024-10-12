// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import DeviceReducer from './slices/deviceSlice'
import ServiceReducer from './slices/serviceSlice';
import UserReducer from './slices/userSlice';
import AuthReducer from './slices/authSlice';
const store = configureStore({
    reducer: {
        device : DeviceReducer,
        service : ServiceReducer,
        user : UserReducer,
        auth : AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
