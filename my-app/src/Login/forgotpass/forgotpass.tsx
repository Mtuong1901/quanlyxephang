import { useState, useEffect } from 'react';
import './forgotpass.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchUserByEmail } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';

const Forgotpass = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [ isEmail, setisEmail] = useState(false);

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
                setMessage('Email đã được tìm thấy! Vui lòng kiểm tra hộp thư để đặt lại mật khẩu.');
            }
        } catch (error) {
            setMessage('Email không tồn tại trong hệ thống.');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setisEmail(!e.target.value);
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
                            <Link to='/login' type='button' className='btn-cancel'>Hủy</Link>
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
