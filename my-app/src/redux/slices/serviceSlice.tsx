import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Iservice } from "../../Iservice";

interface ServiceState {
    services: Iservice[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ServiceState = {
    services: [],
    status: 'idle',
    error: null,
};

// Fetch all devices
export const FetchService = createAsyncThunk('service/fetchService', async () => {
    const service_col = collection(db, 'services');
    const serviceDoc = await getDocs(service_col);
    const serviceList = serviceDoc.docs.map((doc) => ({
        idService: doc.data().idService,
        name: doc.data().name,
        description: doc.data().description,
        status: doc.data().status,
        procress: doc.data().procress,
        number: doc.data().number,
    })) as Iservice[];
    return serviceList;
});

// Add a new device
// export const addDevice = createAsyncThunk<{ idDoc: string } & Idevice, Idevice>(
//     'device/addDevice',
//     async (deviceData: Idevice) => {
//         const docRef = await addDoc(collection(db, 'devices'), deviceData);
//         return { idDoc: docRef.id, ...deviceData };
//     }
// );

// export const updateDevice = createAsyncThunk<
//     { id: string },
//     { idDevice: string; deviceData: Partial<Idevice> }
// >(
//     'device/updateDevice',
//     async ({ idDevice, deviceData }, thunkAPI) => {
//         try {
//             const devicecol = collection(db, 'devices');
//             const deviceQuery = query(devicecol, where("idDevice", "==", idDevice));
//             const docref = await getDocs(deviceQuery);
//             if (!deviceQuery) {
//                 console.log('thiet bi khong ton tai');
//             }
//             const idDoc = docref.docs[0].ref;
//             await updateDoc(idDoc, deviceData);
//             return { id: idDoc.id };
//         } catch (error) {
//             const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//             console.error("Error updating device:", errorMessage);
//             return thunkAPI.rejectWithValue({ error: errorMessage });
//         }
//     }
// );

export const FetchOneService = createAsyncThunk(
    'service/fetchOneService',
    async (id: string) => {
        try {
            const serviceDoc = await getDoc(doc(db, 'services', id));
            if (!serviceDoc.exists()) {
                throw new Error("Service not found");
            }
            const data = serviceDoc.data();
            return {
                idService: data?.idService || '',
                name: data?.name || '',
                description: data?.description || '',
                status: data?.status || 'Unknown',
                procress : data?.procress || '',
                number : data?.number || null
            } as Iservice;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);
const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchService.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(FetchService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.services = action.payload;
            })
            .addCase(FetchService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch devices';
            })
            .addCase(FetchOneService.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(FetchOneService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const existingServiceIndex = state.services.findIndex(device => device.idService === action.payload.idService);
                if (existingServiceIndex !== -1) {
                    state.services[existingServiceIndex] = action.payload;
                } else {
                    state.services.push(action.payload);
                }
            })
            .addCase(FetchOneService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch device';
            })
    },
});

export default serviceSlice.reducer;
