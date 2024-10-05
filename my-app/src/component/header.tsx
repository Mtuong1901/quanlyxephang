import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Header = () => {
    const location = useLocation();
    const [router, setRouter] = useState<string | React.ReactNode | null>(null);
    const formatRouterPath = (pathname: string) => {
        if (pathname.includes("/dashboard")) {
            return "Dashboard";
        } else if (pathname===("/thietbi")) {
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
        
        setRouter(formatRouterPath(location.pathname));
    }, [location]);

    return (
        <>
            <div className="header h-[88px] flex items-center justify-between w-[1336px] fixed">
                <div className="router ml-[24px] text-[20px] font-bold text-[#FF9138]">
                    {router}
                </div>
                <div className="note flex justify-center items-center mr-[64px]">
                    <div className="bg-[#FFF2E7] w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer">
                        <i className="fa-solid fa-bell text-[#FFAC6A]"></i>
                    </div>
                    <img
                        className="avt rounded-full w-[40px] ml-[24px] h-[40px]"
                        src="./images/avt-1.jpg"
                        alt="Ảnh đại diện người dùng"
                    />
                    <div className="p-0 ml-[8px]">
                        <p className="text-[#7E7D88] font-[12px] font-normal">Xin chào</p>
                        <p className="text-[#535261] font-[16px] font-bold">Lê Quỳnh Ái Vân</p>
                    </div>
                </div>
            </div>
        </>
    );
};
