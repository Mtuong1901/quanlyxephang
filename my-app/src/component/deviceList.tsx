// DeviceList.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { FetchDevice } from "../redux/slices/deviceSlice";
import { Link } from "react-router-dom";

export const DeviceList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { devices, status, error } = useSelector((state: RootState) => state.device);
    
    useEffect(() => {
        dispatch(FetchDevice());
    }, [dispatch]);
    
    const [expandedIds, setExpandedIds] = useState<string[]>([]); // Đổi thành mảng string
    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => 
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const MAX_LENGTH = 70; // Độ dài tối đa của văn bản hiển thị

    return (
        <tbody>
            {status === 'loading' && <tr><td colSpan={8}>Loading...</td></tr>}
            {status === 'failed' && <tr><td colSpan={8}>Error: {error}</td></tr>}
            {status === 'succeeded' && (
                devices.map((device) => (
                    <tr key={device.id}>
                        <td>{device.idDevice}</td>
                        <td>{device.name}</td>
                        <td>{device.ip}</td>
                        <td>{device.status}</td>
                        <td>{device.connect_status}</td>
                        <td>
                            {/* Hiển thị dịch vụ với chức năng "Xem thêm" */}
                            {expandedIds.includes(device.id) ? (
                                device.services.join(', ')
                            ) : (
                                device.services.join(', ').substring(0, MAX_LENGTH) + 
                                (device.services.join(', ').length > MAX_LENGTH ? '...' : '')
                            )}
                            {device.services.join(', ').length > MAX_LENGTH && (
                                <Link to='#' onClick={() => toggleExpand(device.id)}>
                                    {expandedIds.includes(device.id) ? 'Xem ít' : 'Xem thêm'}
                                </Link>
                            )}
                        </td>
                        <td>chi tiet</td>
                        <td>cap nhat</td>
                    </tr>
                ))
            )}
        </tbody>
    );
};
