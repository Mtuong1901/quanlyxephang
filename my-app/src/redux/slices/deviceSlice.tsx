import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Idevice } from "../../Idevice";

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

// Fetch all devices
export const FetchDevice = createAsyncThunk('device/fetchDevice', async () => {
    const device_col = collection(db, 'devices');
    const deviceDoc = await getDocs(device_col);
    const deviceList = deviceDoc.docs.map((doc) => ({
        idDevice: doc.data().idDevice || '',
        name: doc.data().name,
        username: doc.data().username,
        password: doc.data().password,
        ip: doc.data().ip,
        status: doc.data().status,
        connect_status: doc.data().connect_status,
        services: doc.data().services || [], // Giữ services là mảng
    })) as Idevice[];
    return deviceList;
});

export const FetchOneDevice = createAsyncThunk(
    'device/fetchOneDevice',
    async (id: string) => {
        const deviceDoc = await getDoc(doc(db, 'devices', id));

        if (!deviceDoc.exists()) {
            throw new Error("Device not found");
        }
        
        return {
            idDevice: deviceDoc.data().idDevice || '',
            name: deviceDoc.data().name,
            username: deviceDoc.data().username,
            password: deviceDoc.data().password,
            ip: deviceDoc.data().ip,
            status: deviceDoc.data().status,
            connect_status: deviceDoc.data().connect_status,
            services: deviceDoc.data().services || [],
        } as Idevice;
    }
);

// Add a new device
export const addDevice = createAsyncThunk<{ idDoc: string } & Idevice, Idevice>(
    'device/addDevice',
    async (deviceData: Idevice) => {
        const docRef = await addDoc(collection(db, 'devices'), deviceData);
        return { idDoc: docRef.id, ...deviceData }; 
    }
);
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
            })
            .addCase(FetchOneDevice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(FetchOneDevice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const existingDeviceIndex = state.devices.findIndex(device => device.idDevice === action.payload.idDevice);
                if (existingDeviceIndex !== -1) {
                    state.devices[existingDeviceIndex] = action.payload; 
                } else {
                    state.devices.push(action.payload); 
                }
            })
            .addCase(FetchOneDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch device';
            })
            .addCase(addDevice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addDevice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const newDeviceWithId = { ...action.payload, id: action.payload.idDoc };
                state.devices.push(newDeviceWithId);
            })
            .addCase(addDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add device';
            });
    },
});

export default deviceSlice.reducer;
