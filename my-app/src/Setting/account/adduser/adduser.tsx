import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";
import { Iuser } from "../../../Iuser";
import { addUser } from "../../../redux/slices/userSlice";
import { addActivityLog, IActivityLog } from "../../../redux/slices/activitiesSlice";

export const AddUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [showActivityStatus, setShowActivityStatus] = useState(false);
    const [selectedActivityStatus, setSelectedActivityStatus] = useState("");

    const [showRole, setShowRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kiểm tra mật khẩu
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

        // Tạo dữ liệu người dùng
        const userData: Iuser = {
            idUser: '',
            fullname: formData.fullname,
            phone: formData.phone,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            role: selectedRole,
            img: '',
            mota: '',
            status: selectedActivityStatus,
        };

        dispatch(addUser(userData)).then((resultAction) => {
            if (addUser.fulfilled.match(resultAction)) {
                const updatedUser = resultAction.payload;
                if (updatedUser.idUser) {
                    const logData: IActivityLog = {
                        id: '', // Để trống, có thể tạo ID trên Firestore hoặc tự động
                        ip: '192.167.32',
                        userId: updatedUser.idUser, // Sử dụng ID người dùng mới được thêm
                        action: 'Thêm người dùng',
                        timestamp: new Date(),
                        details: 'Người dùng mới đã được thêm vào hệ thống.',
                    };

                    dispatch(addActivityLog(logData));
                }
        
                // Chuyển hướng sau khi ghi nhật ký thành công
                navigate('/setting/account');
                console.log("ID User:", updatedUser.idUser); 
            } else {
                console.error(resultAction.error.message);
            }
        });
        
    };

    return (
        <>
            <p className="text-[24px] text-[#FF7506] font-bold leading-[30px] p-2">Quản lý tài khoản</p>
            <div className="w-[1192px] h-[520px] bg-white">
                <p className="text-[20px] text-[#FF7506] font-bold leading-[30px] ml-[24px] pt-[16px] mb-[16px]">Thông tin tài khoản</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex flex-col gap-2 ml-[24px] mb-[16px]">
                                <label htmlFor="" className="text-[#282739] text-[16px] font-[600] leading-[24px]">Họ tên <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="rounded-lg border-[2px] border-[#D4D4D7] w-[560px] h-[44px] p-2 text-[16px] text-[400] leading-[24px]"
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ml-[24px] mt-2 mb-[16px]">
                                <label htmlFor="" className="text-[#282739] text-[16px] font-[600] leading-[24px]">Số điện thoại <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="rounded-lg border-[2px] border-[#D4D4D7] w-[560px] h-[44px] p-2 text-[16px] text-[400] leading-[24px]"
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ml-[24px] mt-2 mb-[16px]">
                                <label htmlFor="" className="text-[#282739] text-[16px] font-[600] leading-[24px]">Email <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="rounded-lg border-[2px] border-[#D4D4D7] w-[560px] h-[44px] p-2 text-[16px] text-[400] leading-[24px]"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ml-[24px] mt-2 mb-[16px]">
                                <div className="tinhtrang w-[154px] h-[62px] flex flex-col gap-1 mt-[16px] relative">
                                    {showRole && (
                                        <div className="w-[560px] bg-white rounded-lg absolute bottom-9 text-left cursor-pointer border-[2px]" >
                                            <ul className="mt-2 flex flex-col text-[14px] max-h-[150px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
                                                {["Quản lý", "Kế toán", "Lễ tân", "Bác sĩ", "Superadmin", "Admin"].map(role => (
                                                    <li key={role} className={`${selectedRole === role ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedRole(role); setShowRole(false); }}>
                                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">{role}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Vai trò <span className="text-[#FF4747]">*</span></p>
                                    <div className="w-[560px] h-[44px] bg-white border-[2px] border-[#D4D4D7] rounded-lg flex justify-between p-2 items-center cursor-pointer" onClick={() => setShowRole(!showRole)}>
                                        <p className="sl-title text-[#535261] text-[16px]">{selectedRole || "chọn vai trò"}</p>
                                        <i className={`fa-solid ${showRole ? 'fa-caret-up' : 'fa-caret-down'} text-[#FF7506]`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <div className="flex flex-col gap-2 ml-[24px] mb-[16px]">
                                <label htmlFor="" className="text-[#282739] text-[16px] font-[600] leading-[24px]">Tên đăng nhập <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="rounded-lg border-[2px] border-[#D4D4D7] w-[560px] h-[44px] p-2 text-[16px] text-[400] leading-[24px]"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ml-[24px] mb-[16px]">
                                <label htmlFor="" className="text-[#282739] text-[16px] font-[600] leading-[24px]">Mật khẩu <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="rounded-lg border-[2px] border-[#D4D4D7] w-[560px] h-[44px] p-2 text-[16px] text-[400] leading-[24px]"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ml-[24px] mb-[16px]">
                                <label htmlFor="" className="text-[#282739] text-[16px] font-[600] leading-[24px]">Xác nhận mật khẩu <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="rounded-lg border-[2px] border-[#D4D4D7] w-[560px] h-[44px] p-2 text-[16px] text-[400] leading-[24px]"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ml-[24px] mb-[16px]">
                                <div className="tinhtrang w-[154px] h-[62px] flex flex-col gap-1 mt-[16px] relative">
                                    {showActivityStatus && (
                                        <div className="w-[560px] bg-white rounded-lg absolute bottom-9 text-left cursor-pointer border-[2px]">
                                            <ul className="mt-2 flex flex-col text-[14px] max-h-[150px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
                                                {["Hoạt động", "Ngưng hoạt động"].map(status => (
                                                    <li key={status} className={`${selectedActivityStatus === status ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedActivityStatus(status); setShowActivityStatus(false); }}>
                                                        <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">{status}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <p className="text-[#282739] text-[16px] leading-[24px] font-[600]">Trạng thái hoạt động <span className="text-[#FF4747]">*</span></p>
                                    <div className="w-[560px] h-[44px] bg-white border-[2px] border-[#D4D4D7] rounded-lg flex justify-between p-2 items-center cursor-pointer" onClick={() => setShowActivityStatus(!showActivityStatus)}>
                                        <p className="sl-title text-[#535261] text-[16px]">{selectedActivityStatus || "chọn trạng thái"}</p>
                                        <i className={`fa-solid ${showActivityStatus ? 'fa-caret-up' : 'fa-caret-down'} text-[#FF7506]`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-[20px] gap-[32px]">
                        <Link to='/setting/account'>
                            <button type="button" className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px] border-[#FF9138]">Hủy</button>
                        </Link>
                        <button type="submit" className="w-[147px] h-[48px] bg-[#FF7506] text-white rounded-lg text-[16px] font-bold">Thêm</button>
                    </div>
                </form>
            </div>
        </>
    );
}
