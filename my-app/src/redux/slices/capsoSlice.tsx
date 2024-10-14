import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Iservice } from "../../Iservice";

interface Icapso {
    idNumber: string;
    service_name: string;
    number: number[];
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

export const addNewNumber = createAsyncThunk(
    'capso/capsomoi',
    async (data: Icapso, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, "capso"), data);
            return { id: docRef.id, ...data };
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
            .addCase(addNewNumber.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewNumber.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) { 
                    state.numbers.push(action.payload);
                }
            })
            .addCase(addNewNumber.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add service';
            });
    }
});

export default capsoSlice.reducer;
