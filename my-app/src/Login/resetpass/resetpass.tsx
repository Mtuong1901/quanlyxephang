import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../forgotpass/forgotpass.css';
import { AppDispatch } from '../../redux/store';
import { ResetpasswordUser } from '../../redux/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Resetpassword = () => {
    const navigate= useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const handleShow = () => {
        setShow(!show);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }

        if (!code) {
            setMessage("Mã reset không hợp lệ.");
            return;
        }
        setLoading(true); 
        try {
            await dispatch(ResetpasswordUser({ email, password, code }));
            alert("Mật khẩu đã được cập nhật thành công!")
        } catch (error) {
            setMessage("Lỗi cập nhật mật khẩu"); 
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className='login-container' style={{ backgroundColor: '#F0F0F0' }}>
            <div className='login-section-1'>
                <div className='login-logo'>
                    <img src="../../images/Logo alta.png" alt="logoalta" />
                </div>
                <div className='login-form'>
                    <p className='text-[24px] text-[#282739] leading-[33px] font-bold flex justify-center mb-3'>Đặt lại mật khẩu mới</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password">Mật khẩu</label><br />
                            <input
                                className='relative'
                                type={show ? "text" : "password"}
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                className={`fa-regular ${show ? "fa-eye-slash" : "fa-eye"} absolute mt-2 top-[75px] right-5`}
                                onClick={handleShow}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label><br />
                            <input
                                className='relative'
                                type={show ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <i
                                className={`fa-regular ${show ? "fa-eye-slash" : "fa-eye"} mt-2 absolute top-[160px] right-5`}
                                onClick={handleShow}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>
                        {message && <p className='text-left text-red-500 mb-3'>{message}</p>}
                        <div className='flex justify-center'>
                            <button 
                                type="submit" 
                                className='w-[162px] h-[40px] bg-[#FF9138] text-white rounded-lg' 
                                disabled={loading} // Vô hiệu hóa nút khi đang xử lý
                            >
                                {loading ? 'Đang xử lý...' : 'Xác nhận'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='for-section-2'>
                <div className='for-img-background'>
                    {/* Hình nền có thể thêm ở đây */}
                </div>
            </div>
        </div>
    );
}

export default Resetpassword;
