import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../config/FirebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc, getDocs } from 'firebase/firestore';

interface IRole {
    id?: string; // Đặt là optional
    role_name: string;
    mota: string;
    feature: string[];
}

interface RoleState {
    roles: IRole[];
    loading: boolean;
    error: string | null;
}

const initialState: RoleState = {
    roles: [],
    loading: false,
    error: null,
};

// Fetch all roles
export const fetchRoles = createAsyncThunk('role/fetchrole', async () => {
    const role_col = collection(db, 'role');
    const roleDoc = await getDocs(role_col);
    const roleList = roleDoc.docs.map((doc) => ({
        id: doc.id,
        role_name: doc.data().role_name,
        mota: doc.data().mota,
        feature: doc.data().feature,
    })) as IRole[];
    return roleList;
});

// Add a role
export const addRole = createAsyncThunk<IRole, IRole>(
    'roles/addRole',
    async (newRole) => {
        const docRef = await addDoc(collection(db, 'role'), newRole);
        return { ...newRole, id: docRef.id }; 
    }
);

// Update a role by ID
export const updateRole = createAsyncThunk<IRole, IRole>(
    'roles/updateRole',
    async (roleToUpdate) => {
        if (!roleToUpdate.id) {
            throw new Error("Role ID is undefined");
        }
        const roleRef = doc(db, 'role', roleToUpdate.id);
        await updateDoc(roleRef, {
            role_name: roleToUpdate.role_name,
            mota: roleToUpdate.mota,
            feature: roleToUpdate.feature,
        });
        return roleToUpdate;
    }
);

// Fetch a role by ID
export const fetchRoleById = createAsyncThunk<IRole, string>(
    'roles/fetchRoleById',
    async (id) => {
        const roleRef = doc(db, 'role', id);
        const roleSnap = await getDoc(roleRef);
        if (!roleSnap.exists()) {
            throw new Error('Role not found');
        }
        return { id: roleSnap.id, ...roleSnap.data() } as IRole;
    }
);

// Tạo slice cho vai trò
const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(addRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles.push(action.payload);
            })
            .addCase(addRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.roles.findIndex(role => role.id === action.payload.id);
                if (index !== -1) {
                    state.roles[index] = action.payload; // Cập nhật vai trò trong danh sách
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchRoleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoleById.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.roles.findIndex(role => role.id === action.payload.id);
                if (index === -1) {
                    state.roles.push(action.payload); // Thêm vai trò mới nếu chưa có
                } else {
                    state.roles[index] = action.payload; // Cập nhật vai trò nếu đã tồn tại
                }
            })
            .addCase(fetchRoleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            });
            
    },
});

// Xuất các reducer và action
export default roleSlice.reducer;
