import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/slices/authSlice"; // Đảm bảo import action login

export const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [router, setRouter] = useState<string | React.ReactNode | null>(null);

    const formatRouterPath = (pathname: string) => {
        if (pathname.includes("/dashboard")) {
            return "Dashboard";
        } else if (pathname === "/thietbi") {
            return (
                <p className='text-[#7E7D88] text-[20px] font-bold leading-[30px]'>
                    Thiết bị <i className="fa-solid fa-chevron-right text-[20px]"></i> <span className="text-[#FF7506] text-[20px] font-bold leading-[30px]">Danh sách thiết bị</span>
                </p>
            );
        } else if (pathname.includes("/thietbi/themthietbi")) {
            return (
                <p className='text-[#7E7D88] text-[20px] font-bold leading-[30px]'>
                    Thiết bị <i className="fa-solid fa-chevron-right text-[20px]"></i> <span className="text-[#7E7D88] text-[20px] font-bold leading-[30px]">Danh sách thiết bị</span>
                    <i className="fa-solid fa-chevron-right text-[20px]"></i> <span className="text-[#FF7506] text-[20px] font-bold leading-[30px]">Thêm thiết bị</span>
                </p>
            );
        }
        return pathname;
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            dispatch(login(userData));
        }

        setRouter(formatRouterPath(location.pathname));
    }, [location, dispatch]);
    return (
        <div className="header h-[88px] flex items-center justify-between w-[1336px] fixed">
            <div className="router ml-[24px] text-[20px] font-bold text-[#FF9138]">
                {router}
            </div>
            <div className="note flex justify-center items-center mr-[64px] cursor-pointer">
                <div className="bg-[#FFF2E7] w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer">
                    <i className="fa-solid fa-bell text-[#FFAC6A]"></i>
                </div>
                <Link to={`/thongtincanhan/${user?.idUser}`}>
                    <img
                        className="avt rounded-full w-[40px] ml-[24px] h-[40px] cursor-pointer "
                        src={`../../images/${user?.img}`}
                        alt="Ảnh đại diện người dùng"

                    /></Link>
                <div className="p-0 ml-[8px] cursor-pointer">
                    <p className="text-[#7E7D88] font-[12px] font-normal">Xin chào</p>
                    <p className="text-[#535261] font-[16px] font-bold">{user?.username}</p>
                </div>
            </div>
        </div>
    );
};
