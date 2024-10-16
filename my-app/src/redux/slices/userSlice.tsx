// src/redux/slices/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Iuser } from "../../Iuser";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { getAuth, verifyPasswordResetCode } from "firebase/auth";

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
    const user_col = collection(db, 'user');
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
        mota: doc.data().mota,
        status : doc.data().status
    })) as Iuser[];
    return userList;
});
export const fetchUserByEmail = createAsyncThunk<Iuser, string>(
    'user/fetchUserByEmail',
    async (email, { rejectWithValue }) => {
        try {
            const user_col = collection(db, 'user');
            const q = query(user_col, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return rejectWithValue("Email không tồn tại trong hệ thống");
            }

            const userData = querySnapshot.docs[0].data() as Iuser;
            return userData;
        } catch (error) {
            return rejectWithValue("Đã xảy ra lỗi trong quá trình tìm kiếm email");
        }
    }
);
// login
export const loginUser = createAsyncThunk<Iuser, { username: string; password: string }>(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const user_col = collection(db,'user');
            const user_doc = await getDocs(user_col);
            const userdata = user_doc.docs.find((doc) => doc.data().username === username);
            if (!userdata) {
                return rejectWithValue("Sai mật khẩu hoặc tên đăng nhập");
            }

            const userData = userdata.data();
            if (userData.password !== password) {
                return rejectWithValue("Sai mật khẩu hoặc tên đăng nhập");
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
                mota: userData.mota,
                status : userData.status,
            }
            return user;
        } catch (error) {
            return rejectWithValue("An error occurred during login");
        }
    }
);

export const ResetpasswordUser = createAsyncThunk<Iuser, { email: string; password: string; code: string }, { rejectValue: string }>(
    'user/resetPassword',
    async ({ email, password, code }, { rejectWithValue }) => {
        const auth = getAuth();
        
        try {
            // Xác minh mã reset
            await verifyPasswordResetCode(auth, code); // Chỉ xác minh, không cần gán giá trị
            
            // Kiểm tra sự tồn tại của email trong cơ sở dữ liệu
            const user_col = collection(db, 'user');
            const q = query(user_col, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return rejectWithValue("Email không tồn tại trong hệ thống");
            }

            const userDoc = querySnapshot.docs[0];
            const userId = userDoc.id; // Lấy ID của document người dùng

            // Cập nhật mật khẩu
            const userRef = doc(db, 'user', userId);
            await updateDoc(userRef, {
                password: password, // Cập nhật mật khẩu mới
            });

            const updatedUser: Iuser = {
                idUser: userId,
                email: email, // Gán email đã kiểm tra
                password: password,
                fullname: userDoc.data().fullname, 
                username: userDoc.data().username,
                role: userDoc.data().role,
                phone: userDoc.data().phone,
                img: userDoc.data().img,
                mota: userDoc.data().mota,
                status : userDoc.data().status,
            };

            return updatedUser; // Trả về người dùng đã được cập nhật
        } catch (error) {
            return rejectWithValue("Cập nhật mật khẩu thất bại!");
        }
    }
);
export const addUser = createAsyncThunk<Iuser, Iuser, { rejectValue: string }>(
    'user/addUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const userRef = doc(collection(db, 'user'));
            await setDoc(userRef, newUser);
                        return { ...newUser, idUser: userRef.id }; 
        } catch (error) {
            return rejectWithValue("Cập nhật thông tin người dùng thất bại");
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
            })
            .addCase(fetchUserByEmail.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserByEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentUser = action.payload
            })
            .addCase(fetchUserByEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Không tìm thấy email';
            })
            .addCase(ResetpasswordUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(ResetpasswordUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Có thể cập nhật thông tin người dùng ở đây nếu cần
            })
            .addCase(ResetpasswordUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Cập nhật mật khẩu thất bại';
            })
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload); 
            })
            
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Cập nhật mật khẩu thất bại';
            });
            
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; 