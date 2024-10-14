import { useState } from "react";
import './capso.css';
import { Link } from "react-router-dom";
export const Capso = () => {
    // Trạng thái mở/đóng và lựa chọn cho từng dropdown
    const [showServiceStatus, setShowServiceStatus] = useState(false);
    const [selectedServiceStatus, setSelectedServiceStatus] = useState("Tất cả");

    const [showActivityStatus, setShowActivityStatus] = useState(false);
    const [selectedActivityStatus, setSelectedActivityStatus] = useState("Tất cả");

    const [showSourceStatus, setShowSourceStatus] = useState(false);
    const [selectedSourceStatus, setSelectedSourceStatus] = useState("Tất cả");

    return (
        <>
            <div className="capso mt-[100px] ">
                <p className="text-[#FF7506] text-[24px] font-bold leading-[36px]">Quản lý cấp số</p>
                <div className="flex gap-[24px] items-center ">
                    {/* Dropdown Tên Dịch Vụ */}
                    <div className="tendichvu w-[154px] h-[72px] flex flex-col gap-1 mt-[16px] relative">
                        <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Tên dịch vụ</p>
                        <div className="w-full h-[44px] bg-white border-[2px] border-[#D4D4D7] rounded-lg flex justify-between p-2 items-center cursor-pointer" onClick={() => setShowServiceStatus(!showServiceStatus)}>
                            <p className="sl-title text-[#535261] text-[16px]">{selectedServiceStatus}</p>
                            <i className={`fa-solid ${showServiceStatus ? 'fa-caret-up' : 'fa-caret-down'} text-[#FF7506]`}></i>
                        </div>
                        {showServiceStatus && (
                            <div className="w-full bg-white rounded-lg absolute mt-[74px]">
                                <ul className="mt-2 flex flex-col text-[14px] max-h-[200px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
                                    <li className={`${selectedServiceStatus === "Tất cả" ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedServiceStatus('Tất cả'); setShowServiceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Tất cả</p>
                                    </li>
                                    <li className={`${selectedServiceStatus === "Khám sản - Phụ khoa" ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedServiceStatus('Khám sản - Phụ khoa'); setShowServiceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Khám sản - Phụ khoa</p>
                                    </li>
                                    <li className={`${selectedServiceStatus === "Khám răng hàm mặt" ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedServiceStatus('Khám răng hàm mặt'); setShowServiceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Khám răng hàm mặt</p>
                                    </li>
                                    <li className={`${selectedServiceStatus === "Khám tai mũi họng" ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedServiceStatus('Khám tai mũi họng'); setShowServiceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Khám tai mũi họng</p>
                                    </li>
                                    <li className={`${selectedServiceStatus === "Khám tai mũi họng" ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedServiceStatus('Khám tai mũi họng'); setShowServiceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Khám tai mũi họng</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Dropdown Tình Trạng Hoạt Động */}
                    <div className="tinhtrang w-[154px] h-[72px] flex flex-col gap-1 mt-[16px] relative">
                        <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Tình trạng</p>
                        <div className="w-full h-[44px] bg-white border-[2px] border-[#D4D4D7] rounded-lg flex justify-between p-2 items-center cursor-pointer" onClick={() => setShowActivityStatus(!showActivityStatus)}>
                            <p className="sl-title text-[#535261] text-[16px]">{selectedActivityStatus}</p>
                            <i className={`fa-solid ${showActivityStatus ? 'fa-caret-up' : 'fa-caret-down'} text-[#FF7506]`}></i>
                        </div>
                        {showActivityStatus && (
                            <div className="w-full bg-white rounded-lg absolute mt-[74px]">
                                <ul className="mt-2 flex flex-col">
                                    <li onClick={() => { setSelectedActivityStatus('Tất cả'); setShowActivityStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Tất cả</p>
                                    </li>
                                    <li onClick={() => { setSelectedActivityStatus('Đang chờ'); setShowActivityStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Đang chờ</p>
                                    </li>
                                    <li onClick={() => { setSelectedActivityStatus('Đã sử dụng'); setShowActivityStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Đã sử dụng</p>
                                    </li>
                                    <li onClick={() => { setSelectedActivityStatus('Bỏ qua'); setShowActivityStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Bỏ qua</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Dropdown Nguồn Cấp */}
                    <div className="nguoncap w-[154px] h-[72px] flex flex-col gap-1 mt-[16px] relative">
                        <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Nguồn cấp</p>
                        <div className="w-full h-[44px] bg-white border-[2px] border-[#D4D4D7] rounded-lg flex justify-between p-2 items-center cursor-pointer" onClick={() => setShowSourceStatus(!showSourceStatus)}>
                            <p className="sl-title text-[#535261] text-[16px]">{selectedSourceStatus}</p>
                            <i className={`fa-solid ${showSourceStatus ? 'fa-caret-up' : 'fa-caret-down'} text-[#FF7506]`}></i>
                        </div>
                        {showSourceStatus && (
                            <div className="w-full bg-white rounded-lg cursor-pointer absolute mt-[74px]">
                                <ul className="mt-2 flex flex-col text-[14px]">
                                    <li onClick={() => { setSelectedSourceStatus('Tất cả'); setShowSourceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Tất cả</p>
                                    </li>
                                    <li onClick={() => { setSelectedSourceStatus('Kiosk'); setShowSourceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Kiosk</p>
                                    </li>
                                    <li onClick={() => { setSelectedSourceStatus('Hệ thống'); setShowSourceStatus(false); }}>
                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">Hệ thống</p>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* thoi gian */}
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
                    {/* Tim kiem */}
                    <div className="w-[240px] h-[72px] flex flex-col mt-[16px]">
                        <p className='text-[#282739] text-[16px] font-[600] leading-[24px] mb-1'>Từ khóa</p>
                        <div className='w-[240px] h-[44] relative'>
                            <input className="w-full h-[44px] border-[1px] rounded-lg p-2 " type="text" placeholder="nhập từ khóa" />
                            <i className="fa-solid fa-magnifying-glass absolute right-4 top-4 text-[#FF7506]"></i>
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
