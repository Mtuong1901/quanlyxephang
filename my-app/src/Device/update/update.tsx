import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { updateDevice } from "../../redux/slices/deviceSlice";
import { Idevice } from "../../Idevice";

export const Update = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
    const [type, setType] = useState('');
    const param = useParams<{ id: string | undefined }>();
    const id = param.id;
    const dispatch: AppDispatch = useDispatch();
    const { devices, status, error } = useSelector((state: RootState) => state.device);
    const device = devices.find(device => device.idDevice === id);
    const [formdata, setFormData] = useState<Partial<Idevice>>({
        idDevice: device?.idDevice || '',
        name: device?.name || '',
        username: device?.username || '',
        type: device?.type || '',
        ip: device?.ip || '',
        password: device?.password || '',
        services: device?.services || [],
    });
    console.log(formdata)
    useEffect(() => {
        if (device) {
            setFormData({
                idDevice: device.idDevice,
                name: device.name,
                username: device.username,
                type: device.type,
                ip: device.ip,
                password: device.password,
                services: device.services,
            });
        }
    }, [device]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleTypeChange = (selectedType: string) => {
        setType(selectedType);
        setFormData(prevForm => ({ ...prevForm, type: selectedType }));
        setDropdown(false); // Đóng dropdown
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            dispatch(updateDevice({ idDevice:id,deviceData:formdata }));
            alert("Updated device successfully");
            navigate('/thietbi');
        }
    };
    return (
        <>
            <div className="container">
                <p className="text-[24px] text-[#FF7506] font-bold leading-[30px]">Quản lý thiết bị</p>
                <div className="flex gap-[24px]">
                    <div className="bg-white w-[1232px] h-[550px] rounded-xl mt-[16px]">
                        <p className="text-[20px] text-[#FF7506] font-bold leading-[30px] pt-[16px] ml-[24px] mb-[20px]">Thông tin thiết bị</p>
                        <div className="">
                            <form action="" onSubmit={handleSubmit}>
                                <div className="flex gap-[100px] ml-[24px] mb-[16px]">
                                    <div className="w-[540px] h-[76px]">
                                        <label className="text-[16px] font-[600] text-[#282739]" htmlFor="">Mã thiết bị: <span className="text-[#FF4747]">*</span></label>
                                        <input className="w-full h-[44px] border-[1px] border-#D4D4D7] rounded-lg mt-2 p-2" type="text" name="idDevice" id="" value={formdata.idDevice} onChange={handleChange}/>
                                    </div>
                                    <div className="w-[540px] h-[76px]">
                                        <label className="text-[16px] font-[600] text-[#282739]" htmlFor="">Loại thiết bị: <span className="text-[#FF4747]">*</span></label>
                                        <div className={`w-[540px] h-[44px] border-[1px] rounded-lg mt-1 cursor-pointer relative ${dropdown ? "border-[#FFAC6A]" :""}`} onClick={() => setDropdown(!dropdown)}>
                                        <p className="text-[#282739] text-[16px] leading-[24px] font-[400] p-2">{formdata.type}</p>
                                    {dropdown && (
                                        <ul className="w-full bg-white border-[1px] absolute ml-0 rounded-lg pt-1 pb-1 mt-1">
                                            <li className={` h-[44px] p-2 text-[#282739] text-[16px] leading-[24px] font-[400] ${formdata.type === 'Kiosk' ? "bg-[#FFF2E7]" :""}`} onClick={() => handleTypeChange('Kiosk')}>Kiosk</li>
                                            <li className={` h-[44px] p-2 text-[#282739] text-[16px] leading-[24px] font-[400] ${formdata.type === 'Display Counter' ? "bg-[#FFF2E7]" :""}`} onClick={() => handleTypeChange('Display Counter')}>Display Counter</li>
                                        </ul>
                                    )}
                                </div>
                                    </div>
                                </div>
                                <div className="flex gap-[100px] ml-[24px]">
                                    <div className="w-[540px] h-[76px] mb-[16px]">
                                        <label className="text-[16px] font-[600] text-[#282739]" htmlFor="">Tên thiết bị: <span className="text-[#FF4747]">*</span></label>
                                        <input className="w-full h-[44px] border-[1px] border-#D4D4D7] rounded-lg mt-2 p-2" type="text" name="name" id=""  value={formdata.name}  onChange={handleChange} />
                                    </div>
                                    <div className="w-[540px] h-[76px]">
                                        <label className="text-[16px] font-[600] text-[#282739]" htmlFor="">Tên đăng nhập: <span className="text-[#FF4747]">*</span></label>
                                        <input className="w-full h-[44px] border-[1px] border-#D4D4D7] rounded-lg mt-2 p-2" type="text" name="username" id=""  value={formdata.username} onChange={handleChange} /> 
                                    </div>
                                </div>
                                <div className="flex gap-[100px] ml-[24px] mb-[16px] ">
                                    <div className="w-[540px] h-[76px]">
                                        <label className="text-[16px] font-[600] text-[#282739]" htmlFor="">Địa chỉ IP: <span className="text-[#FF4747]">*</span></label>
                                        <input className="w-full h-[44px] border-[1px] border-#D4D4D7] rounded-lg mt-2 p-2" type="text" name="ip" id=""  value={formdata.ip}  onChange={handleChange} />
                                    </div>
                                    <div className="w-[540px] h-[76px]">
                                        <label className="text-[16px] font-[600] text-[#282739]" htmlFor="">Mật khẩu: <span className="text-[#FF4747]">*</span></label>
                                        <input className="w-full h-[44px] border-[1px] border-#D4D4D7] rounded-lg mt-2 p-2" type="text" name="password" id=""  value={formdata.password}  onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="ml-[24px] w-[1180px] h-[112px]">
                                    <p className="text-[16px] font-[600] text-[#282739]">Dich vụ sử dụng:<span className="text-[#FF4747]">*</span></p>
                                    <div className="w-full h-full border-[1px] border-[#FFAC6A] rounded-xl mt-2 cursor-pointer">
                                        <ul className="flex p-2 gap-2 items-center">
                                            {device?.services.map((service) =>{
                                                return (
                                                    <>
                                                    <li className="w-[155px] h-[28px] bg-[#FFAC6A] text-white text-[14px] font-bold leading-[20px] p-1 rounded-lg" key={formdata.idDevice}>{service}</li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center gap-[32px] mt-[48px]">
                                    <Link to='/thietbi'>
                                        <button type="button" className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px] border-[#FF9138]">Hủy</button>
                                    </Link>
                                    <button type="submit" className="w-[147px] h-[48px] bg-[#FF7506] text-white rounded-lg text-[16px] font-bold">Cập nhật</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}