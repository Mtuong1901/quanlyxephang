// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import DeviceReducer from './slices/deviceSlice'
import ServiceReducer from './slices/serviceSlice';
import UserReducer from './slices/userSlice';
import AuthReducer from './slices/authSlice';
import CapsoReducer from './slices/capsoSlice';
const store = configureStore({
    reducer: {
        device : DeviceReducer,
        service : ServiceReducer,
        user : UserReducer,
        auth : AuthReducer,
        capso: CapsoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
