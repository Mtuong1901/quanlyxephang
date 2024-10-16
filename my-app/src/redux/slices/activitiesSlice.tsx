import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/FirebaseConfig'; // Đường dẫn tới cấu hình Firebase
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Định nghĩa interface cho nhật ký hoạt động
export interface IActivityLog {
    id: string; // ID của nhật ký
    userId: string | null; // ID người dùng thực hiện thao tác
    action: string; // Hành động thực hiện
    ip: string; // Địa chỉ IP (nếu cần)
    timestamp: Date; // Thời gian thực hiện
    details?: string; // Thông tin chi tiết (tuỳ chọn)
}

// Định nghĩa kiểu cho state của ActivitiesSlice
interface ActivitiesState {
    logs: IActivityLog[]; // Mảng chứa nhật ký hoạt động
}

// Khởi tạo state ban đầu
const initialState: ActivitiesState = {
    logs: [],
};

// Tạo thunk để fetch logs
export const fetchLogs = createAsyncThunk<IActivityLog[], void, { rejectValue: string }>(
    'activities/fetchLogs',
    async (_, { rejectWithValue }) => {
        try {
            const logsCollectionRef = collection(db, 'activities');
            const querySnapshot = await getDocs(logsCollectionRef);
            const logs: IActivityLog[] = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Omit<IActivityLog, 'id'>, // Đảm bảo dữ liệu phù hợp với IActivityLog
                timestamp: doc.data().timestamp.toDate(), // Chuyển đổi timestamp nếu cần
            }));

            return logs;
        } catch (error) {
            return rejectWithValue("Không thể lấy nhật ký hoạt động.");
        }
    }
);

// Tạo tác vụ bất đồng bộ để thêm nhật ký hoạt động
export const addActivityLog = createAsyncThunk<IActivityLog, IActivityLog>(
    'activities/addActivityLog',
    async (logData) => {
        const docRef = await addDoc(collection(db, 'activities'), logData);
        return { ...logData, id: docRef.id }; // Thêm ID từ Firestore vào logData
    }
);

// Tạo slice cho nhật ký hoạt động
const ActivitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.logs = action.payload; // Cập nhật logs với dữ liệu mới
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                console.error("Lỗi khi fetch logs:", action.payload); // Xử lý lỗi nếu cần
            })
            .addCase(addActivityLog.fulfilled, (state, action) => {
                state.logs.push(action.payload); // Thêm nhật ký hoạt động vào state
            })
            .addCase(addActivityLog.rejected, (state, action) => {
                console.error("Lỗi khi thêm nhật ký:", action.payload); // Xử lý lỗi nếu cần
            });
    },
});

// Xuất các reducer và action
export default ActivitiesSlice.reducer; // Xuất reducer
