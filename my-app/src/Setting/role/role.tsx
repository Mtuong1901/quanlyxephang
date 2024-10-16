import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRoles } from "../../redux/slices/roleSlice";

export const Role = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { roles } = useSelector((state: RootState) => state.role);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    // Đếm số lượng từng role_name độc nhất
    const roleCounts = roles.reduce((acc: Record<string, number>, role) => {
        acc[role.role_name] = (acc[role.role_name] || 0) + 1;
        return acc;
    }, {});

    const handleButton = () => {
        navigate('/setting/role/addrole');
    };

    return (
        <>
            <p className="text-[#FF7506] text-[24px] font-bold leading-[30px]">Danh sách vai trò</p>
            <div className="flex gap-[24px] mt-[16px]">
                <div className="w-[1112px] h-[450px] overflow-auto">
                    <table className="w-full rounded-xl bg-[#FF9138]">
                        <thead className="h-[49px] text-[16px] text-white font-bold leading-[24px] text-left">
                            <tr>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tên vai trò</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Số lượng</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Mô tả</th>
                                <th className="p-2 border-[#FFE3CD]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(roleCounts).map(([roleName, count], index) => {
                                const roleData = roles.find(role => role.role_name === roleName); // Tìm vai trò đầu tiên có tên roleName

                                return (
                                    <tr key={index} className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]">
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{roleName}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{count}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                                            {roleData?.mota || "Mô tả chưa có"}
                                        </td>
                                        <td className="p-2 border-[#FFE3CD]">
                                            {roleData && (
                                                <button className="text-blue-500 hover:underline">
                                                    <Link to={`/setting/role/updaterole/${roleData.id}`}>Cập nhật</Link>
                                                </button>
                                            )}
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
