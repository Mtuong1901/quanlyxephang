// src/redux/slices/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Iuser } from "../../Iuser";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

interface UserState {
    users: Iuser[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentUser: Iuser | null; // Thêm trường để lưu thông tin người dùng đang đăng nhập
}

const initialState:UserState = {
    users: [],
    status: 'idle',
    error: null,
    currentUser: null,
};

// Fetch all users
export const FetchUser = createAsyncThunk('user/fetchUser', async () => {
    const user_col = collection(db, 'users');
    const userDoc = await getDocs(user_col);
    const userList = userDoc.docs.map((doc) => ({
        idUser: doc.data().idUser,
        fullname: doc.data().fullname,
        username: doc.data().username,
        password: doc.data().password,
        role: doc.data().role,
        email: doc.data().email,
        phone: doc.data().phone,
        img: doc.data().img,
    })) as Iuser[];
    return userList;
});


export const loginUser = createAsyncThunk<Iuser, { username: string; password: string }>(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const user_col = collection(db,'user');
            const user_doc = await getDocs(user_col);
            const userdata = user_doc.docs.find((doc) => doc.data().username === username);
            if (!userdata) {
                return rejectWithValue("User not found");
            }

            const userData = userdata.data();
            if (userData.password !== password) {
                return rejectWithValue("Invalid password");
            }
            const user: Iuser ={
                idUser: userData.idUser,
                fullname: userData.fullname,
                username: userData.username,
                password: userData.password,
                role: userData.role,
                email: userData.email,
                phone: userData.phone,
                img: userData.img,
            }
            return user;
        } catch (error) {
            return rejectWithValue("An error occurred during login");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(FetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(FetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(FetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Login failed';
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
