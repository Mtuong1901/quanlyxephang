// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import DeviceReducer from './slices/deviceSlice'
import ServiceReducer from './slices/serviceSlice';
import UserReducer from './slices/userSlice';
import AuthReducer from './slices/authSlice';
import CapsoReducer from './slices/capsoSlice';
import RoleReducer from './slices/roleSlice';
import ActivityReducer from './slices/activitiesSlice';
const store = configureStore({
    reducer: {
        device : DeviceReducer,
        service : ServiceReducer,
        user : UserReducer,
        auth : AuthReducer,
        capso: CapsoReducer,
        role: RoleReducer,
        activities : ActivityReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
