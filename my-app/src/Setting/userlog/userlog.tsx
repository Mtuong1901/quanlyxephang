import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchLogs } from "../../redux/slices/activitiesSlice";

export const UserLog = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const { logs } = useSelector((state: RootState) => state.activities);

    useEffect(() => {
        dispatch(fetchLogs());
    }, [dispatch]);

    console.log(logs);

    return (
        <>
            <p className="text-[#FF7506] text-[24px] font-bold leading-[30px]">Danh sách nhật ký hoạt động</p>
            <div className="flex gap-[24px] mt-[16px]">
                <div className="w-[1112px] h-[450px] overflow-auto">
                    <table className="w-full rounded-xl bg-[#FF9138]">
                        <thead className="h-[49px] text-[16px] text-white font-bold leading-[24px] text-left">
                            <tr>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tên đăng nhập</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Thời gian tác động</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">IP thực hiện</th>
                                <th className="p-2 border-[#FFE3CD]">Thao tác thực hiện</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? (
                                logs.map((log) => (
                                    <tr key={log.id} className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]">
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{user?.username}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{log.timestamp.toLocaleDateString()}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{log.ip}</td>
                                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{log.details || 'Không có thông tin'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">Không có nhật ký hoạt động nào để hiển thị.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
