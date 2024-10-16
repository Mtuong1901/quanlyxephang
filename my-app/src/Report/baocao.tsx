import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { FetchCapsoData } from "../redux/slices/capsoSlice";
import * as XLSX from 'xlsx';

export const BaoCao = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { numbers } = useSelector((state: RootState) => state.capso);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 8; // Number of items to display per page
    const { services } = useSelector((state: RootState) => state.service);
    useEffect(() => {
        dispatch(FetchCapsoData());
    }, [dispatch]);

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(numbers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Báo cáo');
        XLSX.writeFile(workbook, 'Baocao.xlsx');
    };

    const filteredNumbers = numbers.filter(num => {
        const ngaycapDate = new Date(num.ngaycap).toISOString().split('T')[0];
        const isWithinDateRange = (startDate && endDate)
            ? ngaycapDate >= startDate && ngaycapDate <= endDate
            : true;
        return isWithinDateRange;
    });
    const sortedNumbers = filteredNumbers.sort((a, b) => a.number - b.number);
    // Calculate total pages
    const totalPages = Math.ceil(filteredNumbers.length / itemsPerPage);

    // Get current items based on page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedNumbers.slice(indexOfFirstItem, indexOfLastItem);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
        setCurrentPage(1); // Reset to first page on date change
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="baocao">
                <p className="text-[rgb(255,117,6)] text-[24px] font-bold">Quản lý cấp số</p>
                <div className="flex gap-[24px] items-center ">
                    <div className=" w-[320px] h-[72px] flex flex-col gap-1 mt-[10px]">
                        <p className='text-[#282739] text-[16px] font-[600] leading-[24px]'>Chọn thời gian</p>
                        <div className='flex gap-1 items-center'>
                            <div className='date-1 bg-white rounded-lg'>
                                <input
                                    className='w-[150px] h-[44px] rounded-lg p-2 border-[1px]'
                                    type="date"
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div>
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                            <div className='date-1 bg-white rounded-lg '>
                                <input
                                    className='w-[150px] h-[44px] rounded-lg p-2 border-[1px]'
                                    type="date"
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[24px] mt-[16px]">
                    <div className="w-[1112px] h-[450px] ">
                        <table className="w-full rounded-xl bg-[#FF9138]">
                            <thead className=" h-[49px] text-[16px] text-white font-bold leading-[24px] text-left">
                                <tr>
                                    <th className="p-2 border-r-[2px] border-[#FFE3CD]">STT</th>
                                    <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tên dịch vụ</th>
                                    <th className="p-2 border-r-[2px] border-[#FFE3CD]">Thời gian cấp</th>
                                    <th className="p-2 border-r-[2px] border-[#FFE3CD]">Tình trạng</th>
                                    <th className="p-2 border-r-[2px] border-[#FFE3CD]">Nguồn cấp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((num, index) => {
                                    return (
                                        <tr key={index} className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]">
                                            <td className="p-2 border-r-[2px] border-[#FFE3CD]">{num.number}</td>
                                            <td className="p-2 border-r-[2px] border-[#FFE3CD]">{num.service_name}</td>
                                            <td className="p-2 border-r-[2px] border-[#FFE3CD]">{new Date(num.ngaycap).toLocaleDateString()}</td>
                                            <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                                                <button className={`w-[8px] h-[8px] ${num.status === "Đang chờ" ? "bg-[#4277FF]" :
                                                    num.status === "Đã sử dụng" ? "bg-[#535261]" :
                                                        num.status === "Bỏ qua" ? "bg-[#DC3545]" :
                                                            "bg-[#7E7D88]" // mặc định
                                                    } rounded-lg mr-2`}></button>

                                                {num.status}
                                            </td>
                                            <td className="p-2 border-r-[2px] border-[#FFE3CD]">{num.nguoncap}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col'>
                        <div className='de-aside-btn'>
                            <button className='de-add-btn' onClick={handleDownloadExcel}>
                                <div className='plus-icon'>
                                    <i className="fa-solid fa-download"></i>
                                </div>
                                <p>Tải về</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='phanpage flex justify-end mr-[200px] gap-2 '>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`page-button h-[32px] ${currentPage === 1 ? "text-[#A9A9B0]" : ""} `}
                    >
                        <i className="fa-solid fa-caret-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`page-button ${currentPage === index + 1 ? 'active bg-[#FF7506] text-white rounded-md' : ''} w-[32px] h-[32px]`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`page-button h-[32px] ${currentPage === totalPages ? "text-[#A9A9B0]" : ""} `}
                    >
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
};
