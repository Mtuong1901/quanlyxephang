import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDevice } from "../../redux/slices/deviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Idevice } from "../../Idevice";
import { AppDispatch, RootState } from "../../redux/store";
import { addActivityLog, IActivityLog } from "../../redux/slices/activitiesSlice";

export const Add = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [dropdown, setDropdown] = useState(false);
    const user = useSelector((state:RootState) => state.auth.user)
    const [type, setType] = useState('');
    const [form, setForm] = useState<Idevice>({
        idDevice: '',
        name: '',
        username: '',
        password: '',
        type: '',
        ip: '',
        status: 'Hoạt động',
        connect_status: 'Kết nối',
        services: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "services") {

            const servicesArray = value.split(',');
            setForm({
                ...form,
                [name]: servicesArray,
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };
    const handleTypeChange = (selectedType: string) => {
        setType(selectedType);
        setForm(prevForm => ({ ...prevForm, type: selectedType })); // Cập nhật type vào form
        setDropdown(false); // Đóng dropdown
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const deviceData = { ...form };
        try {
            const formAction = await dispatch(addDevice(deviceData));
            if (addDevice.fulfilled.match(formAction)) {
                const logData: IActivityLog = {
                    id: '', 
                    userId: user?.idUser || '',
                    ip: '192.173.92',
                    action: 'Thêm thiết bị',
                    timestamp: new Date(),
                    details: ' Thêm thiết bị mới vào hệ thống.',
                };
                dispatch(addActivityLog(logData));
                console.log('Device added:', formAction.payload);
                alert('Thêm thiết bị thành công');
                navigate('/thietbi');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <p className="text-[24px] text-[#FF7506] font-bold leading-[30px]">Quản lý thiết bị</p>
            <div className="bg-white w-[1252px] h-[476px] mt-[16px] rounded-[16px]">
                <p className="text-[20px] text-[#FF7506] font-bold leading-[30px] pt-[16px] ml-[24px] mb-[20px]">Thông tin thiết bị</p>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="flex ml-[24px] gap-[104px] mb-[16px]">
                            <div className="w-[540px] h-[76px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="idDevice">Mã thiết bị: <span className="text-[#FF4747]">*</span></label><br />
                                <input
                                    className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1"
                                    type="text"
                                    name="idDevice"
                                    id="idDevice"
                                    placeholder="Nhập mã thiết bị"
                                    required
                                    value={form.idDevice}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-[540px] h-[76px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="deviceType">
                                    Loại thiết bị: <span className="text-[#FF4747]">*</span>
                                </label>
                                <br />
                                <div className={`w-[540px] h-[44px] border-[1px] rounded-lg mt-1 cursor-pointer relative ${dropdown ? "border-[#FFAC6A]" :""}`} onClick={() => setDropdown(!dropdown)}>
                                    {type ? (
                                        <p className="text-[#282739] text-[16px] leading-[24px] font-[400] p-2">{type}</p>
                                    ) : (
                                        <p className="text-[#282739] text-[16px] leading-[24px] font-[400] p-2" >Chọn loại thiết bị</p>
                                    )}
                                    {dropdown && (
                                        <ul className="w-full bg-white border-[1px] absolute ml-0 rounded-lg pt-1 pb-1 mt-1">
                                            <li className={` h-[44px] p-2 text-[#282739] text-[16px] leading-[24px] font-[400] ${type === 'Kiosk' ? "bg-[#FFF2E7]" :""}`} onClick={() => handleTypeChange('Kiosk')}>Kiosk</li>
                                            <li className={` h-[44px] p-2 text-[#282739] text-[16px] leading-[24px] font-[400] ${type === 'Display Counter' ? "bg-[#FFF2E7]" :""}`} onClick={() => handleTypeChange('Display Counter')}>Display Counter</li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex ml-[24px] gap-[104px] mb-[16px]">
                            <div className="w-[540px] h-[76px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="name">Tên thiết bị: <span className="text-[#FF4747]">*</span></label><br />
                                <input
                                    className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Nhập tên thiết bị"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-[540px] h-[76px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="username">Tên đăng nhập: <span className="text-[#FF4747]">*</span></label><br />
                                <input
                                    className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Nhập tài khoản"
                                    required
                                    value={form.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex ml-[24px] gap-[104px] mb-[16px]">
                            <div className="w-[540px] h-[76px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="ip">Địa chỉ IP: <span className="text-[#FF4747]">*</span></label><br />
                                <input
                                    className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1"
                                    type="text"
                                    name="ip"
                                    id="ip"
                                    placeholder="Nhập địa chỉ IP"
                                    required
                                    value={form.ip}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-[540px] h-[76px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="password">Mật khẩu: <span className="text-[#FF4747]">*</span></label><br />
                                <input
                                    className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="w-[1184px] h-[76px] ml-[24px]">
                            <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="services">Dịch vụ sử dụng: <span className="text-[#FF4747]">*</span></label><br />
                            <input
                                className="w-full h-[44px] border-[1px] rounded-lg p-2 mt-1"
                                type="text"
                                name="services"
                                id="services"
                                placeholder="Nhập dịch vụ sử dụng (cách nhau bằng dấu phẩy)"
                                required
                                value={form.services}
                                onChange={handleChange}
                            />
                        </div>
                        <p className="ml-[24px] mt-[16px] text-[#7E7D88] text-[14px] font-[400] leading-[21px]"><span className="text-[#FF4747]">*</span>Là trường bắt buộc</p>
                        <div className="flex justify-center items-center mt-[24px] gap-[32px]">
                            <Link to='/thietbi'>
                                <button type="button" className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px] border-[#FF9138]">Hủy</button>
                            </Link>
                            <button type="submit" className="w-[147px] h-[48px] bg-[#FF7506] text-white rounded-lg text-[16px] font-bold">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
