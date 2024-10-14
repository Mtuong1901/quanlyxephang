import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

interface Icapso {
    idNumber?: string; // Thêm idNumber để dễ dàng quản lý
    number: number;
    cus_name?: string;
    status: string;
    ngaycap: Date; // Ngày cấp
    hethan: Date; // Ngày hết hạn
    nguoncap: string; // Nguồn cấp
    service_name: string; // Tên dịch vụ
}

interface CapsoState {
    numbers: Icapso[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CapsoState = {
    numbers: [],
    status: 'idle',
    error: null,
};

// Fetch Capso Data
export const FetchCapsoData = createAsyncThunk<Icapso[]>(
    'capso/getcapso',
    async () => {
        const capsoCol = collection(db, 'capso');
        const capsoDoc = await getDocs(capsoCol);
        const capsoList = capsoDoc.docs.map((doc) => ({
            idNumber: doc.id,
            service_name: doc.data().service_name,
            number: doc.data().number,
            cus_name: doc.data().cus_name || '',
            status: doc.data().status,
            ngaycap: doc.data().ngaycap.toDate(),
            hethan: doc.data().hethan.toDate(),
            nguoncap: doc.data().nguoncap,
        })) as Icapso[];
        return capsoList;
    }
);

// Add New Number
export const addNewNumber = createAsyncThunk(
    'capso/capsomoi',
    async (data: Icapso, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, "capso"), data);
            return { idNumber: docRef.id, ...data }; // Đảm bảo trả về idNumber
        } catch (error: any) {
            console.error(error);
            return rejectWithValue(error.message);
        }
    }
);

const capsoSlice = createSlice({
    name: 'capso',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchCapsoData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(FetchCapsoData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.numbers = action.payload;
            })
            .addCase(FetchCapsoData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch capso data';
            })
            .addCase(addNewNumber.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewNumber.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) { 
                    state.numbers.push(action.payload);
                    state.numbers.sort((a, b) => a.number - b.number);
                    localStorage.setItem('capsoNumbers', JSON.stringify(state.numbers));
                }
            })
            .addCase(addNewNumber.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add new number';
            });
    }
});

export default capsoSlice.reducer;
