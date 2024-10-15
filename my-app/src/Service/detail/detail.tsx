import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FetchOneService } from "../../redux/slices/serviceSlice";
import { Link, useParams } from "react-router-dom";
export const ServiceDetail = () => {
    const dispatch: AppDispatch = useDispatch();
    const param = useParams<{ id: string | undefined }>();
    const id = param.id;
    const { services, status, error } = useSelector((state: RootState) => state.service);
    const service = services.find((service) => service.idService === id)
    useEffect(() => {
        if (id) {
            dispatch(FetchOneService(id));
            console.log('Fetched device:', services);
        }
    }, [dispatch, id]);
    const numberList = service?.sequentialNumbers || [];
    const [showStatus, setShowStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    return (
        <>
            <div className="container flex gap-[24px] w-full">
                <div className="w-[370px] h-[606px] bg-white">
                    <p className="text-[#FF7506] text-[20px] font-bold leading-[30px] mt-[16px] ml-[16px] mb-[12px]">Thông tin dịch vụ</p>
                    <div className="flex gap-[27px] ml-[16px] mb-[12px]">
                        <p className="text-[#282739] text-[16px] font-[600] leading-[24px]">Mã dịch vụ:</p>
                        <span className="text-[#535261] text-[16px] font-[400] leading-[24px]">{service?.idService}</span>
                    </div>
                    <div className="flex gap-[27px] ml-[16px] mb-[12px]">
                        <p className="text-[#282739] text-[16px] font-[600] leading-[24px]">Tên dịch vụ:</p>
                        <span className="text-[#535261] text-[16px] font-[400] leading-[24px]">{service?.name}</span>
                    </div>
                    <div className="flex gap-[27px] ml-[16px] mb-[12px]">
                        <p className="text-[#282739] text-[16px] font-[600] leading-[24px]">Mô tả:</p>
                        <span className="text-[#535261] text-[16px] font-[400] leading-[24px]">{service?.description}</span>
                    </div>
                    <p className="text-[#FF7506] text-[20px] font-bold leading-[30px] mt-[16px] ml-[16px] mb-[12px]">Quy tắc cấp số</p>
                    <div>
                        <p className=" flex items-center gap-2 text-[#282739] text-[16px] font-[600] leading-[24px] ml-[16px] mb-[12px]">Tăng tự động: <div className="text-[#535261] text-[16px] font-[400] leading-[24px] border-[1px] w-[61px] h-[44px] rounded-xl p-2"><span>0001</span></div> đến <div className="text-[#535261] text-[16px] font-[400] leading-[24px] border-[1px] w-[61px] h-[44px] rounded-xl p-2"><span>9999</span></div></p>
                        <p className=" flex items-center gap-2 text-[#282739] text-[16px] font-[600] leading-[24px] ml-[16px] mb-[12px]">Prefix: <div className="text-[#535261] text-[16px] font-[400] leading-[24px] border-[1px] w-[61px] h-[44px] rounded-xl p-2"><span>0001</span></div></p>
                        <p className=" flex items-center gap-2 text-[#282739] text-[16px] font-[600] leading-[24px] ml-[16px] mb-[12px]">Reset mỗi ngày</p>
                        <p className="text-[#535261] text-[16px] font-[400] leading-[24px] ml-[16px]" >Ví dụ: 201-2001</p>
                    </div>
                </div>
                {/* right page */}
                <div className="w-[718px] h-[606px] bg-white">
                    <div className="flex gap-[12px]">
                        <div className="ml-[24px]">
                            <p className='text-[#282739] text-[16px] font-[600] leading-[24px] mb-1'>Trạng thái</p>
                            <div className={`w-[160px] h-[44px] border-[2px] ${showStatus ? "border-[#FF7506]" : ""}  cursor-pointer flex items-center justify-between rounded-lg p-2`} onClick={() => setShowStatus(!showStatus)}>
                                <p className='sl-title text-[#535261] text-[16px]'>{selectedStatus}</p>
                                <i className={`fa-solid text-[#FF7506] ${showStatus ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                            </div>
                            {showStatus && (
                                <div className='w-[160px] rounded-lg border-[1px]'>
                                    <ul className='flex flex-col rounded-lg cursor-pointer'>
                                        <li onClick={() => { setSelectedStatus('Tất cả'); setShowStatus(false); }}><p className={`${selectedStatus === "Tất cả" ? "bg-[#FFF2E7]" : ""} text-[#535261] text-[16px] h-[44px] p-2`}>Tất cả</p></li>
                                        <li onClick={() => { setSelectedStatus('Đã hoàn thành'); setShowStatus(false); }}><p className={`${selectedStatus === "Đã hoàn thành" ? "bg-[#FFF2E7]" : ""} text-[#535261] text-[16px] h-[44px] p-2`}>Đã hoàn hiện</p></li>
                                        <li onClick={() => { setSelectedStatus('Đã thực hiện'); setShowStatus(false); }}><p className={`${selectedStatus === "Đã thực hiện" ? "bg-[#FFF2E7]" : ""} text-[#535261] text-[16px] h-[44px] p-2`}>Đã thực hiện</p></li>
                                        <li onClick={() => { setSelectedStatus('Vắng'); setShowStatus(false); }}><p className={`${selectedStatus === "Vắng" ? "bg-[#FFF2E7]" : ""} text-[#535261] text-[16px] h-[44px] p-2`}>Vắng</p></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="">
                            <p className='text-[#282739] text-[16px] font-[600] leading-[24px] mb-1'>Chọn thời gian</p>
                            <div className='flex gap-1 items-center'>
                                <div className='date-1 bg-white rounded-lg'>
                                    <input className='w-[130px] h-[44px] rounded-lg p-2 border-[1px]' type="date" />
                                </div>
                                <div>
                                    <i className="fa-solid fa-caret-right"></i>
                                </div>
                                <div className='date-1 bg-white rounded-lg '>
                                    <input className='w-[130px] h-[44px] rounded-lg p-2 border-[1px]' type="date" />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p className='text-[#282739] text-[16px] font-[600] leading-[24px] mb-1'>Từ khóa</p>
                            <div className='w-[205px] h-[44] relative'>
                                <input className="w-[205px] h-[44px] border-[1px] rounded-lg p-2 " type="text" placeholder="nhập từ khóa" />
                                <i className="fa-solid fa-magnifying-glass absolute right-4 top-4 text-[#FF7506]"></i>
                            </div>
                        </div>
                    </div>
                    <div className="w-[669px] ml-[24px] h-[441px] mt-2">
                        <table className="w-full rounded-lg border-separate ">
                            <thead className="bg-[#FF9138] h-[49px] text-[16px] text-white font-bold leading-[24px] text-left" >
                                <th className="p-2">Số thức tự</th>
                                <th className="p-2">Trạng thái</th>
                            </thead>
                            <tbody>
                                {numberList.map((num) => {
                                    return (
                                        <>
                                            <tr className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7] ">
                                                <td className="p-2">{num}</td>
                                                <td className="p-2 flex items-center gap-1">
                                                    <div className={`${service?.procress === "Đang thực hiện" ? "bg-[#34CD26]" : ""} w-[8px] h-[8px] rounded-lg `}></div>
                                                    {service?.procress}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col'>
                        <div className='de-aside-btn'>
                            <Link to={`/dichvu/capnhat`}>
                                <button className='de-add-btn'>
                                    <div className='plus-icon'>
                                        <i className="fa-solid fa-pen"></i>
                                    </div>
                                    <p>Cập nhật danh sách</p>
                                </button>
                            </Link>
                        </div>
                        <hr className='flex justify-center w-[60px] ml-[8px] text-[#FFF2E7]' />
                        <div className='de-aside-btn'>
                            <Link to="/dichvu">
                                <button className='de-add-btn'>
                                    <div className='plus-icon'>
                                        <i className="fa-solid fa-rotate-left"></i>
                                    </div>
                                    <p>Quay lại</p>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 