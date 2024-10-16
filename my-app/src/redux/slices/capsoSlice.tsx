import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

interface Icapso {
    idNumber?: string; 
    number: number;
    cus_name?: string;
    status: string;
    ngaycap: Date; 
    hethan: Date; 
    nguoncap: string; 
    service_name: string; 
}

interface CapsoState {
    numbers: Icapso[];
    selectedNumber?: Icapso;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CapsoState = {
    numbers: [],
    selectedNumber: undefined,
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

export const FetchOneNumbers = createAsyncThunk<Icapso, string>(
    'capso/getonecapso',
    async (id: string) => {
        const capsoDoc = await getDoc(doc(db, 'capso', id));
        if (!capsoDoc.exists()) {
            throw new Error("Capso not found");
        }
        const data = capsoDoc.data();
        return {
            idNumber: id,
            service_name: data.service_name,
            number: data.number,
            cus_name: data.cus_name || '',
            status: data.status,
            ngaycap: data.ngaycap.toDate(),
            hethan: data.hethan.toDate(),
            nguoncap: data.nguoncap,
        } as Icapso;
    }
);

export const addNewNumber = createAsyncThunk(
    'capso/capsomoi',
    async (data: Omit<Icapso, 'number'>, { rejectWithValue }) => {
        try {
            // Lấy số lớn nhất từ Firestore
            const querySnapshot = await getDocs(collection(db, "capso"));
            let maxNumber = 2010001; 

            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                if (docData.number > maxNumber) {
                    maxNumber = docData.number; // Cập nhật maxNumber nếu số hiện tại lớn hơn
                }
            });

            const newNumber = maxNumber + 1; // Tạo số mới

            // Thêm tài liệu mới vào Firestore
            const docRef = await addDoc(collection(db, "capso"), { ...data, number: newNumber });
            return { idNumber: docRef.id, number: newNumber, ...data };
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
            .addCase(FetchOneNumbers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(FetchOneNumbers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedNumber = action.payload;
            })
            .addCase(FetchOneNumbers.rejected, (state, action) => {
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
                }
            })
            .addCase(addNewNumber.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to add new number';
            });
    }
});

export default capsoSlice.reducer;
