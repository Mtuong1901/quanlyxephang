import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { FetchCapsoData } from "../redux/slices/capsoSlice";

interface CapsoListProps {
    selectedServiceStatus: string;
    selectedActivityStatus: string;
    selectedSourceStatus: string;
    startDate: string | null;
    endDate: string | null;
    searchTerm: string;
}

export const CapsoList: React.FC<CapsoListProps> = ({
    selectedServiceStatus,
    selectedActivityStatus,
    selectedSourceStatus,
    startDate,
    endDate,
    searchTerm,
}) => {
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(FetchCapsoData());
    }, [dispatch]);

    const { numbers, status, error } = useSelector((state: RootState) => state.capso);

    const filteredNumbers = numbers.filter((number) => {
        const matchesServiceStatus = selectedServiceStatus === 'Tất cả' || number.service_name === selectedServiceStatus;
        const matchesActivityStatus = selectedActivityStatus === 'Tất cả' || number.status === selectedActivityStatus;
        const matchesSourceStatus = selectedSourceStatus === 'Tất cả' || number.nguoncap === selectedSourceStatus;
        const matchSearch = searchTerm === "" || number.service_name.toLowerCase().includes(searchTerm.toLowerCase());
        const ngaycapDate = new Date(number.ngaycap);
        const isWithinDateRange = (startDate && endDate)
            ? ngaycapDate >= new Date(startDate) && ngaycapDate <= new Date(endDate)
            : true;

        return matchesServiceStatus && matchesActivityStatus && matchesSourceStatus && isWithinDateRange && matchSearch;
    });
    console.log(filteredNumbers)
    return (
        <tbody>
            {status === 'loading' && <tr><td colSpan={8}>Loading...</td></tr>}
            {status === 'failed' && <tr><td colSpan={8}>Error: {error}</td></tr>}
            {status === 'succeeded' && filteredNumbers.map((number) => (
                <tr key={number.number} className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]">
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">{number.number}</td>
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">{number.cus_name}</td>
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">{number.service_name}</td>
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">{number.ngaycap.toLocaleDateString()}</td>
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">{number.hethan.toLocaleDateString()}</td>
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                        <button className={`w-[8px] h-[8px] ${number.status === "Đang chờ" ? "bg-[#4277FF]" : "bg-[#7E7D88]"} rounded-lg mr-2`}></button>
                        {number.status}
                    </td>
                    <td className="p-2 border-r-[2px] border-[#FFE3CD]">{number.nguoncap}</td>
                    <td className="p-2"><Link className="underline text-blue-500" to='#'>Chi tiết</Link></td>
                </tr>
            ))}
        </tbody>
    );
};
