import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Idevice {
    id: string;
    idDevice: string;
    name: string;
    ip: string;
    status: string;
    connect_status: string;
    services: string[];
}

interface DeviceState {
    devices: Idevice[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DeviceState = {
    devices: [],
    status: 'idle',
    error: null,
};

export const FetchDevice = createAsyncThunk('device/fetchDevice', async () => {
    const device_col = collection(db, 'devices');
    const deviceDoc = await getDocs(device_col);
    const deviceList = deviceDoc.docs.map((doc) => {
        return {
            id : doc.id,
            idDevice: doc.data().idDevice || '',
            name: doc.data().name,
            ip: doc.data().ip,
            status: doc.data().status,
            connect_status: doc.data().connect_status,
            services: doc.data().services || []
        } as Idevice;
    });
    return deviceList;
});

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchDevice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(FetchDevice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.devices = action.payload;
            })
            .addCase(FetchDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch devices';
            });
    },
});

export default deviceSlice.reducer;
