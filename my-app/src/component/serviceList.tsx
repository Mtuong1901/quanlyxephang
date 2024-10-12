// DeviceList.tsx
import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import { FetchService } from "../redux/slices/serviceSlice";

export const ServiceList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { services, status, error } = useSelector((state: RootState) => state.service);
    
    useEffect(() => {
        dispatch(FetchService());
    }, [dispatch]);
    
    return (
        <tbody>
            {status === 'loading' && <tr><td colSpan={8}>Loading...</td></tr>}
            {status === 'failed' && <tr><td colSpan={8}>Error: {error}</td></tr>}
            {status === 'succeeded' && (
                services.map((service) => (
                    <tr key={service.idService}>
                        <td>{service.idService}</td>
                        <td>{service.name}</td>
                        <td>{service.description}</td>
                        <td className="flex items-center">
                        <span className={`${service.status === "Hoạt động" ? "bg-green-500":"bg-red-500"} w-[8px] h-[8px] rounded-2xl m-2`}></span>
                        {service.status}
                        </td>
                        <td className="underline text-[#4277FF]"><Link to={`/dichvu/chitiet/${service.idService}`}>Chi tiết</Link></td>
                        <td className="underline text-[#4277FF]"><Link to={`/dichvu/capnhat/${service.idService}`}>Cập nhật</Link></td>
                    </tr>
                ))
            )}
        </tbody>
    );
};
