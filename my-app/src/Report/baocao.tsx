import { useState } from "react";
import { Link } from "react-router-dom";
export const BaoCao = () => {
    return (
        <>
            <div className="capso mt-[100px] ">
                <p className="text-[#FF7506] text-[24px] font-bold leading-[36px]">Quản lý cấp số</p>
                <div className="flex gap-[24px] items-center ">
                                        <div className=" w-[320px] h-[72px] flex flex-col gap-1 mt-[16px]">
                        <p className='text-[#282739] text-[16px] font-[600] leading-[24px]'>Chọn thời gian</p>
                        <div className='flex gap-1 items-center'>
                            <div className='date-1 bg-white rounded-lg'>
                                <input className='w-[150px] h-[44px] rounded-lg p-2 border-[1px]' type="date" />
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                            <div className='date-1 bg-white rounded-lg '>
                                <input className='w-[150px] h-[44px] rounded-lg p-2 border-[1px]' type="date" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[24px] mt-[16px]">
                    <div className="w-[1112px] h-[450px] ">
                    <table className="w-full rounded-xl bg-[#FF9138]">
                        <thead className=" h-[49px] text-[16px] text-white font-bold leading-[24px] text-left">
                            <tr className="">
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">STT</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tên khách hàng</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tên dịch vụ</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Thời gian cấp</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Hạn sử dụng</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Trạng thái</th>
                                <th className="p-2 border-r-[2px] border-[#FFE3CD]">Nguồn cấp</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-blue-500">
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">1</td>
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">Nguyễn Văn A</td>
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">Dịch vụ A</td>
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">08:00 AM</td>
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">09:00 AM</td>
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">Hoạt động</td>
                                <td className="p-2 border-r-[2px] border-[#FFE3CD]">Nguồn A</td>
                                <td className="p-2"><Link className="underline text-blue-500" to='#'>Chi tiết </Link></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className='flex flex-col'>
                    <div className='de-aside-btn'>
                        <Link to={`/capso/capsomoi`}>
                        <button className='de-add-btn'>
                            <div className='plus-icon'>
                            <i className="fa-solid fa-pen"></i>
                            </div>
                            <p>Cấp số mới</p>
                        </button>
                        </Link>
                    </div>
                    
                    </div>
                </div>
            </div>
        </>
    );
};
