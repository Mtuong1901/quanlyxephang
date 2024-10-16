import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRoles } from "../../redux/slices/roleSlice";
import { FetchUser } from "../../redux/slices/userSlice";

export const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { users } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(FetchUser());
    }, [dispatch]);

    const handleButton = () => {
        navigate('/setting/account/addaccount');
    };

    return (
        <>
            <p className="text-[#FF7506] text-[24px] font-bold leading-[30px]">Danh sách vai trò</p>
            <div className="flex gap-[24px] mt-[16px]">
                <div className="w-[1112px] h-[450px] overflow-auto">
                    <table className="w-full rounded-xl bg-[#FF9138]">
                        <thead className="h-[49px] text-[16px] text-white font-bold leading-[24px] text-left">
                            <tr>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tên đăng nhập</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Họ tên</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Số điện thoại</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Email</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Vai trò</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Trạng thái hoạt động</th>
                                <th className="p-2 border-[#FFE3CD]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => {

                                return (
                                    <tr key={user.idUser} className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]">
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{user.username}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{user.fullname}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                                            {user.phone}
                                        </td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{user.email}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{user.role}</td>
                                        <td className="flex items-center p-2 border-r-[2px] border-[#FFE3CD]">
                                            <span className={`${user.status === "Hoạt động" ? "bg-green-500" : "bg-red-500"} w-[8px] h-[8px] rounded-2xl m-2`}></span>
                                            {user.status}
                                        </td>
                                        <td className="p-2 border-[#FFE3CD]">
                                            <button className="text-blue-500 hover:underline">
                                                <Link to={`/setting/role/updaterole/${user.idUser}`}>Cập nhật</Link>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
                <div className='flex flex-col'>
                    <div className='de-aside-btn'>
                        <button className='de-add-btn' onClick={handleButton}>
                            <div className='plus-icon'>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                            <p>Thêm vai trò</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
