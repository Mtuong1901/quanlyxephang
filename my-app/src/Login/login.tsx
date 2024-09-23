import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import { loginUser } from '../component/loginUser';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loginerror, setLoginError] =  useState<string | null>(null);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const message = await loginUser(data.username, data.password);
            if (message) {
                alert('Login successful');
                navigate('/dashboard');
            }
        } catch (err: any) {
            setLoginError(err.message);
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
                        <label htmlFor="username">Tên đăng nhập *</label> <br />
                        <input
                            type="text"
                            id='username'
                            className={errors.username || loginerror ? 'input-error' : ''}
                            style={{
                                borderColor: errors.username ? 'red': loginerror ? 'red' : undefined,
                                borderWidth: errors.username ? '1px' : undefined,
                            }}
                            {...register('username', { required: 'Tên đăng nhập là bắt buộc' })}
                        /> <br />
                        <div className="password-container">
                            <label htmlFor="password">Mật khẩu *</label> <br />
                            <input
                                type={show ? 'text' : 'password'}
                                id="password"
                                className={errors.password || loginerror ? 'input-error' : ''}
                                style={{
                                    borderColor: errors.password ? 'red': loginerror ? 'red' : undefined,
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
                        {!loginerror && <Link to="/login/quenmatkhau" className='forgotpass'>Quên mật khẩu?</Link>}
                        {loginerror && <p className="error-message" style={{ color: '#E73F3F', fontSize:"14px"}}><i className="fa-solid fa-circle-exclamation" style={{marginRight: "5px"}}></i>{loginerror}</p>} 
                        </div>
                        <button type='submit' className='btn-submit'>Đăng nhập</button> <br />
                        {loginerror && <Link to="/login/quenmatkhau" className='forgotpass2'>Quên mật khẩu?</Link>} 
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
