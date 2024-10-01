// DeviceList.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { FetchDevice } from "../redux/slices/deviceSlice";

export const DeviceList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { devices, status, error } = useSelector((state: RootState) => state.device);
    console.log(devices);
    useEffect(() => {
        dispatch(FetchDevice());
    }, [dispatch]);

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
                            <td>{device.services.join(',')}</td>
                            <td>chi tiet</td>
                            <td>cap nhat</td>
                        </tr>
                    ))
                )}
            </tbody>
    );
};
