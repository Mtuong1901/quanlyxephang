import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import { FetchService } from "../redux/slices/serviceSlice";

// Định nghĩa kiểu cho selectedStatus và searchTerm
interface ServiceListProps {
    selectedStatus?: string;
    searchTerm?: string;
    startDate: string;
    endDate: string;
}

export const ServiceList: React.FC<ServiceListProps> = ({ selectedStatus, searchTerm }) => {
    const dispatch: AppDispatch = useDispatch();
    const { services, status, error } = useSelector((state: RootState) => state.service);

    useEffect(() => {
        dispatch(FetchService());
    }, [dispatch]);

    // Lọc dịch vụ theo trạng thái và từ khóa tìm kiếm
    const filteredServices = services.filter(service => {
        const matchesStatus = selectedStatus === 'Tất cả'|| service.status === selectedStatus;
        const matchesSearchTerm = searchTerm
            ? service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        
        return matchesStatus && matchesSearchTerm;
    });

    return (
        <tbody>
            {status === 'loading' && <tr><td colSpan={8}>Loading...</td></tr>}
            {status === 'failed' && <tr><td colSpan={8}>Error: {error}</td></tr>}
            {status === 'succeeded' && (
                filteredServices.map((service) => (
                    <tr className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]" key={service.idService}>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{service.idService}</td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{service.name}</td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{service.description}</td>
                        <td className="flex items-center p-2 border-r-[2px] border-[#FFE3CD]">
                            <span className={`${service.status === "Hoạt động" ? "bg-green-500" : "bg-red-500"} w-[8px] h-[8px] rounded-2xl m-2`}></span>
                            {service.status}
                        </td>
                        <td className="underline text-[#4277FF] p-2 border-r-[2px] border-[#FFE3CD]">
                            <Link to={`/dichvu/chitiet/${service.idService}`}>Chi tiết</Link>
                        </td>
                        <td className="underline text-[#4277FF] p-2 border-r-[2px] border-[#FFE3CD]">
                            <Link to={`/dichvu/capnhat/${service.idService}`}>Cập nhật</Link>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    );
};
