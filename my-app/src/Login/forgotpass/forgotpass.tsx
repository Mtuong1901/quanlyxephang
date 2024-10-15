import { useState, useEffect } from 'react';
import './forgotpass.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchUserByEmail } from '../../redux/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/FirebaseConfig';

const Forgotpass = () => {
    const navigate= useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEmail, setisEmail] = useState(false);
    console.log(email)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setisEmail(true);
            setMessage('Email không được để trống.');
            return;
        }

        setisEmail(false);
        try {
            const result = await dispatch(fetchUserByEmail(email)).unwrap();
            if (result) {
                await sendPasswordResetEmail(auth, email);
                setMessage('Email đã được gửi! Vui lòng kiểm tra hộp thư để đặt lại mật khẩu.');
            }
        }catch (error) {
            console.error("Lỗi:", error);
            setMessage('Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng kiểm tra lại.');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setisEmail(!e.target.value);
    }
    const handleBack = () => {
        navigate('/login');
    }
    return (
        <div className='login-container' style={{ backgroundColor: '#F0F0F0' }}>
            <div className='login-section-1'>
                <div className='login-logo'>
                    <img src="../../images/Logo alta.png" alt="logoalta" />
                </div>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Vui lòng nhập email để đặt lại mật khẩu của bạn <span className='text-red-500'>*</span></label><br />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleEmailChange}
                            className={`${isEmail} ? ' ' : '' border-red-200`}
                        />
                        {message && <p>{message}</p>}
                        <div className='form-btn'>
                            <button onClick={handleBack} className='w-[162px] h-[40px] bg-[#FFF2E7] text-[#FF9138] rounded-lg ml-[12px] text-[16px] font-bold leading-[24px] border-[2px] border-[#FF9138]'>Hủy</button>
                            <button type='submit' className='btn-continue'>Tiếp tục</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='for-section-2'>
                <div className='for-img-background'></div>
            </div>
        </div>
    );
}

export default Forgotpass;
