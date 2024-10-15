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
        sequentialNumbers: doc.data().sequentialNumbers,
    })) as Iservice[];
    return serviceList;
});

// add new services
export const addService = createAsyncThunk<{ idDoc: string } & Iservice, Iservice>(
    'service/addService',
    async (serviceData: Iservice, { rejectWithValue }) => {
        try {
            const serviceCol = collection(db, 'services');
            const q = query(serviceCol, where('idService', '==', serviceData.idService));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                return rejectWithValue("Service with this idService already exists.");
            }

            const docRef = await addDoc(serviceCol, serviceData);

            // Tạo mảng số tự động
            const sequentialNumbers = [];
            for (let i = 1; i <= 8; i++) {
                sequentialNumbers.push(`${serviceData.idService}${String(i).padStart(4, '0')}`);
            }

            // Bạn có thể lưu mảng này vào Firestore nếu cần
            await updateDoc(docRef, { sequentialNumbers }); 

            return { idDoc: docRef.id, ...serviceData };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

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
                number : data?.number || null,
                sequentialNumbers: data?.sequentialNumbers,
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
                state.error = action.error.message || 'Failed to fetch services';
            })
            .addCase(FetchOneService.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(FetchOneService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const existingServiceIndex = state.services.findIndex(service => service.idService === action.payload.idService);
                if (existingServiceIndex !== -1) {
                    state.services[existingServiceIndex] = action.payload;
                } else {
                    state.services.push(action.payload);
                }
            })
            .addCase(FetchOneService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch service';
            })
            .addCase(addService.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.services.push(action.payload);
            })
            .addCase(addService.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add service';

            });
    },
});

export default serviceSlice.reducer;
