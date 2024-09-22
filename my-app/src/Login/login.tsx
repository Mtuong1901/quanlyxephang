import { Link } from 'react-router-dom';
import './login.css'
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Login: React.FC = () => {
    const [show,setShow] = useState(false);
    const handleShow =() =>{
        setShow(!show);
    }
    const onSubmit = (data:any) => {
        console.log(data);
    }
    return (
        <>
            <div className='login-container' style={{backgroundColor: '#F0F0F0'}}>
                <div className='login-section-1'>
                    <div className='login-logo'>
                        <img src="../../images/Logo alta.png" alt="logoalta" />
                    </div>
                    <div className='login-form'>
                        <form>
                            <label htmlFor="username">Tên đăng nhập *</label> <br />
                            <input type="text" id='username'/> <br />
                            <div className="password-container">
                                <label htmlFor="">Mật khẩu *</label> <br />
                                <input type={show? 'text' : 'password'} id="password"></input>
                                <i className={`fa-regular ${show ? "fa-eye-slash" : " fa-eye"}`} onClick={handleShow} style={{cursor: 'pointer'}}></i>
                            </div>
                            <Link to="#" className='forgotpass'>Quên mật khẩu</Link> <br />
                            <button type='submit' className='btn-submit'>Đăng nhập</button>
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
        </>
    )
}
export default Login;