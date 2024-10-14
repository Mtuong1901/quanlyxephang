import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { FetchDevice } from "../redux/slices/deviceSlice";
import { Link } from "react-router-dom";

interface DeviceListProps {
    selectedStatus: string;
    selectedConnection: string;
    searchTerm: string;
    currentDevices: Array<any>; 
}

export const DeviceList: React.FC<DeviceListProps> = ({ selectedStatus, selectedConnection, searchTerm, currentDevices }) => {
    const dispatch: AppDispatch = useDispatch();
    const { status, error } = useSelector((state: RootState) => state.device);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    useEffect(() => {
        dispatch(FetchDevice());
    }, [dispatch]);

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const filteredDevices = currentDevices.filter((device) => {
        const matchStatus = selectedStatus === "Tất cả" || device.status === selectedStatus;
        const matchConnection = selectedConnection === "Tất cả" || device.connect_status === selectedConnection;
        const matchSearch = searchTerm === "" || device.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchConnection && matchSearch;
    });

    return (
        <tbody>
            {status === "loading" && <tr><td colSpan={8}>Loading...</td></tr>}
            {status === "failed" && <tr><td colSpan={8}>Error: {error}</td></tr>}
            {status === "succeeded" && (
                filteredDevices.map((device) => (
                    <tr className="text-[#535261] text-[14px] font-[400] leading-21 h-[49px] odd:bg-white even:bg-[#FFF2E7]" key={device.idDevice}>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{device.idDevice}</td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{device.name}</td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">{device.ip}</td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                            <button className={`w-[8px] h-[8px] ${device.status === "Hoạt động" ? "bg-[#34CD26]" : "bg-[#EC3740]"} rounded-lg mr-2`}></button>
                            {device.status}
                        </td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                            <button className={`w-[8px] h-[8px] ${device.connect_status === "Kết nối" ? "bg-[#34CD26]" : "bg-[#EC3740]"} rounded-lg mr-2`}></button>
                            {device.connect_status}
                        </td>
                        <td className="p-2 border-r-[2px] border-[#FFE3CD]">
                            {expandedIds.includes(device.idDevice) ? (
                                device.services.join(", ")
                            ) : (
                                device.services.join(", ").substring(0, 30) +
                                (device.services.join(", ").length > 30 ? "..." : "")
                            )}
                            {device.services.join(", ").length > 30 && (
                                <Link className="underline text-[#4277FF]" to="#" onClick={() => toggleExpand(device.idDevice)}>
                                    {expandedIds.includes(device.idDevice) ? "Xem ít" : "Xem thêm"}
                                </Link>
                            )}
                        </td>
                        <td className="underline text-[#4277FF] p-2 border-r-[2px] border-[#FFE3CD]">
                            <Link to={`/thietbi/chitiet/${device.idDevice}`}>Chi tiết</Link>
                        </td>
                        <td className="underline text-[#4277FF] p-2">
                            <Link to={`/thietbi/capnhat/${device.idDevice}`}>Cập nhật</Link>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    );
};
