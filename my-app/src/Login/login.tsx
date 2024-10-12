import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import { loginUser } from '../redux/slices/userSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { login } from '../redux/slices/authSlice';

interface FormData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const resultAction = await dispatch(loginUser({ username: data.username, password: data.password }));
            console.log(resultAction)
            
            if (loginUser.fulfilled.match(resultAction)) {
                const user = resultAction.payload;
                dispatch(login(user));
                alert('Login successful');
                navigate('/dashboard');
            } else {
                throw new Error(resultAction.payload as string);
            }
        } catch (err: any) {
            setLoginError(err.message || "An unknown error occurred");
        }
    };
    return (
        <div className='login-container' style={{ backgroundColor: '#F0F0F0' }}>
            <div className='login-section-1'>
                <div className='login-logo'>
                    <img src="../../images/Logo alta.png" alt="logoalta" />
                </div>
                <div className='login-form'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="username">Tên đăng nhập *</label><br />
                        <input
                            type="text"
                            id='username'
                            className={errors.username || loginError ? 'input-error' : ''}
                            style={{
                                borderColor: errors.username ? 'red' : loginError ? 'red' : undefined,
                                borderWidth: errors.username ? '1px' : undefined,
                            }}
                            {...register('username', { required: 'Tên đăng nhập là bắt buộc' })}
                        /><br />
                        <div className="password-container">
                            <label htmlFor="password">Mật khẩu *</label><br />
                            <input
                                type={show ? 'text' : 'password'}
                                id="password"
                                className={errors.password || loginError ? 'input-error' : ''}
                                style={{
                                    borderColor: errors.password ? 'red' : loginError ? 'red' : undefined,
                                    borderWidth: errors.password ? '1px' : undefined,
                                }}
                                {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                            />
                            <i
                                className={`fa-regular ${show ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={handleShow}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>
                        <div>
                            {!loginError && <Link to="/login/quenmatkhau" className='forgotpass'>Quên mật khẩu?</Link>}
                            {loginError && <p className="error-message" style={{ color: '#E73F3F', fontSize: "14px" }}>
                                <i className="fa-solid fa-circle-exclamation" style={{ marginRight: "5px" }}></i>
                                {loginError}
                            </p>}
                        </div>
                        <button type='submit' className='btn-submit'>Đăng nhập</button><br />
                        {loginError && <Link to="/login/quenmatkhau" className='forgotpass2'>Quên mật khẩu?</Link>}
                    </form>
                </div>
            </div>
            <div className='login-section-2'>
                <div className='login-img-background'>
                    <h3>Hệ thống</h3>
                    <span>Quản lý xếp hàng</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
