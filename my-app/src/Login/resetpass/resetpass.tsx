import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../forgotpass/forgotpass.css';
import { AppDispatch } from '../../redux/store';
import { ResetpasswordUser } from '../../redux/slices/userSlice';

const Resetpassword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false); // Thêm trạng thái để hiển thị mật khẩu
    const [message, setMessage] = useState(''); // Thông báo cho người dùng

    const handleShow = () => {
        setShow(!show); // Đảo ngược trạng thái hiển thị mật khẩu
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
            return;
        }
        dispatch(ResetpasswordUser({ email, password }))
            .unwrap() // Nhận kết quả từ dispatch
            .then((result) => {
                setMessage("Mật khẩu đã được cập nhật thành công!");
            })
            .catch((error) => {
                setMessage(error); // Hiển thị thông báo lỗi
            });
    };

    return (
        <div className='login-container' style={{ backgroundColor: '#F0F0F0' }}>
            <div className='login-section-1'>
                <div className='login-logo'>
                    <img src="../../images/Logo alta.png" alt="logoalta" />
                </div>
                <div className='login-form'>
                    <p className='text-[24px] text-[#282739] leading-[33px] font-bold flex justify-center mb-3'>Đặt lại mật khẩu mới</p>
                    {message && <p className='text-center text-red-500'>{message}</p>} {/* Thông báo cho người dùng */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password">Mật khẩu</label><br />
                            <input
                                className='relative'
                                type={show ? "text" : "password"} // Hiển thị mật khẩu hoặc ẩn
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
                                type={show ? "text" : "password"} // Hiển thị mật khẩu hoặc ẩn
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
                        <div className='flex justify-center'>
                            <button type="submit" className='w-[162px] h-[40px] bg-[#FF9138] text-white rounded-lg'>Xác nhận</button>
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
