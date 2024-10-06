import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { FetchOneDevice } from "../../redux/slices/deviceSlice";

export const Detail = () => {
    const param = useParams<{ id: string | undefined }>();
    const id = param.id;
    const dispatch: AppDispatch = useDispatch();
    const { devices, status, error } = useSelector((state: RootState) => state.device);
    const device = devices.find(device => device.idDevice === id);
    useEffect(() => {
        if (id) {
            dispatch(FetchOneDevice(id));
        }
    }, [dispatch, id]);

    return (
        <>
            <div className="container">
                <p className="text-[24px] text-[#FF7506] font-bold leading-[30px]">Quản lý thiết bị</p>
                <div className="flex gap-[24px]">
                    <div className="bg-white w-[1232px] h-[550px] rounded-xl mt-[16px]">
                        <p className="text-[20px] text-[#FF7506] font-bold leading-[30px] pt-[16px] ml-[24px] mb-[20px]">Thông tin thiết bị</p>
                        <div>
                            <div className=" ml-[24px] flex gap-[366px] mb-[16px]">
                                <div className="w-[220px] h-[24px]">
                                    <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >
                                        Mã thiết bị: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">{device?.idDevice}</span>
                                    </p>
                                </div>
                                {/* <div>
                                    <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >
                                        Loại thiết bị: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">{device?.type}</span>
                                    </p>
                                </div> */}
                            </div>
                            <div className=" ml-[24px] flex gap-[366px] mb-[16px]">
                                <div className="w-[220px] h-[24px]">
                                    <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >
                                        Tên thiết bị: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">{device?.name}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >
                                        Tên đăng nhập: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">{device?.username}</span>
                                    </p>
                                </div>
                            </div>
                            <div className=" ml-[24px] flex gap-[366px] mb-[16px]">
                                <div className="w-[220px] h-[24px]">
                                    <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >
                                        Địa chỉ IP: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">{device?.ip}</span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >
                                        Mật khẩu: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">{device?.password}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="ml-[24px]">
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px] mb-1" >
                                    Dịch vụ sử dụng: <br /> <br />
                                    <span className="text-[#535261] text-[16px] font-[400] leading-[24px]">
                                        {device?.services}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link className="w-[80px] h-[94px] flex flex-col items-center bg-[#FFF2E7] rounded-xl justify-center" to='/thietbi/capnhat'>
                        <i className="fa-solid fa-pen bg-[#FF9138] text-white w-[24px] h-[24px] p-1 rounded-lg mb-[4px]"></i>
                        <p className="text-[#FF7506] text-[14px] font-[600] text-center">Cập nhật thiết bị</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
