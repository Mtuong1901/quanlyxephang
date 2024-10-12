import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { FetchDevice } from "../redux/slices/deviceSlice";
import { Link } from "react-router-dom";

interface DeviceListProps {
    selectedStatus: string;
    selectedConnection: string;
    searchTerm: string;
}

export const DeviceList: React.FC<DeviceListProps> = ({ selectedStatus, selectedConnection, searchTerm }) => {
    const dispatch: AppDispatch = useDispatch();
    const { devices, status, error } = useSelector((state: RootState) => state.device);

    useEffect(() => {
        dispatch(FetchDevice());
    }, [dispatch]);

    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const toggleExpand = (id: string) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const MAX_LENGTH = 30;

    // Lọc thiết bị dựa vào trạng thái và từ khóa
    const filteredDevices = devices.filter((device) => {
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
                    <tr key={device.idDevice}>
                        <td>{device.idDevice}</td>
                        <td>{device.name}</td>
                        <td>{device.ip}</td>
                        <td >
                        <button className={`w-[8px] h-[8px] ${device.status==="Hoạt động" ? " bg-[#34CD26] " : "bg-[#EC3740]"} rounded-lg mr-2`}></button>
                            {device.status}
                        </td>
                        <td>
                        <button className={`w-[8px] h-[8px] ${device.connect_status==="Kết nối" ? " bg-[#34CD26] " : "bg-[#EC3740]"} rounded-lg mr-2`}></button>
                            {device.connect_status}</td>
                        <td>
                            {expandedIds.includes(device.idDevice) ? (
                                device.services.join(", ")
                            ) : (
                                device.services.join(", ").substring(0, MAX_LENGTH) +
                                (device.services.join(", ").length > MAX_LENGTH ? "..." : "")
                            )}
                            {device.services.join(", ").length > MAX_LENGTH && (
                                <Link className="underline text-[#4277FF]" to="#" onClick={() => toggleExpand(device.idDevice)}>
                                    {expandedIds.includes(device.idDevice) ? "Xem ít" : "Xem thêm"}
                                </Link>
                            )}
                        </td>
                        <td className="underline text-[#4277FF]"><Link to={`/thietbi/chitiet/${device.idDevice}`}>Chi tiết</Link></td>
                        <td className="underline text-[#4277FF]"><Link to={`/thietbi/capnhat/${device.idDevice}`}>Cập nhật</Link></td>
                    </tr>
                ))
            )}
        </tbody>
    );
};
