import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { FetchOneNumbers } from "../../redux/slices/capsoSlice";

export const CapsoDetail = () => {
    const param = useParams<{ id: string | undefined }>();
    const dispatch: AppDispatch = useDispatch();
    const { numbers } = useSelector((state: RootState) => state.capso)
    const user = useSelector((state: RootState) =>state.auth.user)
    const id = param.id;
    const number = numbers.find((num) => num.idNumber === id);
    console.log(number)
    useEffect(() => {
        if (id) {
            dispatch(FetchOneNumbers(id));
        }
    }, [dispatch, id])
    return (
        <>
            <div className="w-[1112px] h-[604px] bg-white ">
                <p className="text-[#FF7506] text-[20px] leading-[30px] font-bold pt-[16px] ml-[24px]">Thông tin cấp số</p>
                <div className="flex gap-[275px] ml-[24px] mt-[16px]">
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Họ tên:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{number?.cus_name}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Tên dịch vụ:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{number?.service_name}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Số thứ tự:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{number?.number}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Thời gian cấp:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]" >{number?.ngaycap.toDateString()}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Hạn sử dụng:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]" >{number?.hethan.toDateString()}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[16px] ">
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Nguồn cấp:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{number?.nguoncap}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Trạng thái:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{number?.status}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Số điện thoại:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{user?.phone}</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Email:</p>
                            <p className="text-[#535261] text-[16px] font-[400] leading-[14px]">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}