import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, query, Query, updateDoc, where } from "firebase/firestore";
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
        type: doc.data().type,
        ip: doc.data().ip,
        status: doc.data().status,
        connect_status: doc.data().connect_status,
        services: doc.data().services || [],
    })) as Idevice[];
    return deviceList;
});

export const FetchOneDevice = createAsyncThunk(
    'device/fetchOneDevice',
    async (id: string) => {
        try {
            const deviceDoc = await getDoc(doc(db, 'devices', id));
            if (!deviceDoc.exists()) {
                throw new Error("Device not found");
            }
            const data = deviceDoc.data();
            return {
                idDevice: data?.idDevice || '',
                name: data?.name || '',
                username: data?.username || '',
                password: data?.password || '',
                type: data?.type || '',
                ip: data?.ip || '',
                status: data?.status || 'Unknown',
                connect_status: data?.connect_status || 'Unknown',
                services: data?.services || [],
            } as Idevice;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
        }
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

export const updateDevice = createAsyncThunk<
    { id: string },
    { idDevice: string; deviceData: Partial<Idevice> }
>(
    'device/updateDevice',
    async ({ idDevice, deviceData }, thunkAPI) => {
        try {
            const devicecol = collection(db, 'devices');
            const deviceQuery = query(devicecol, where("idDevice", "==", idDevice));
            const docref = await getDocs(deviceQuery);
            if (!deviceQuery) {
                console.log('thiet bi khong ton tai');
            }
            const idDoc = docref.docs[0].ref;
            await updateDoc(idDoc, deviceData);
            return { id: idDoc.id };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            console.error("Error updating device:", errorMessage);
            return thunkAPI.rejectWithValue({ error: errorMessage });
        }
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
            })
            .addCase(updateDevice.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedDeviceId = action.payload.id;
                const index = state.devices.findIndex(device => device.idDevice === updatedDeviceId);
                if (index !== -1) {
                    state.devices[index] = { ...state.devices[index], ...action.meta.arg.deviceData };
                }
            })
            .addCase(updateDevice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update device';
            });

    },
});

export default deviceSlice.reducer;
