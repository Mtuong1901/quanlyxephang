import { useState, useEffect } from 'react';
import './forgotpass.css';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Link } from 'react-router-dom';

const Forgotpass = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const checkEmail = async (email: string) => {
        const emailCollection = collection(db,'user');
        const userDoc = await getDocs(emailCollection);
        const usernap = userDoc.docs.find((doc) => doc.data().email === email);
        if(usernap !== undefined){
            const userdata = usernap.data();
            const userEmail = userdata.email;
            if(userEmail === email){
                setMessage('Email đã được đăng ký. Vui lòng kiểm tra email để đặt lại mật khẩu.');
            }else{
                setMessage('Email này không tồn tại trong hệ thống.');
            }
        }
    };

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (email) {
            const id = setTimeout(() => {
                checkEmail(email);
            }, 2000);

            setTimeoutId(id);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [email]);
    const handleSubmit = (e:any) =>{
        e.preventDefault();
        
    }
    return (
        <div className='login-container' style={{ backgroundColor: '#F0F0F0' }}>
            <div className='login-section-1'>
                <div className='login-logo'>
                    <img src="../../images/Logo alta.png" alt="logoalta" />
                </div>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Vui lòng nhập email để đặt lại mật khẩu của bạn *</label><br />
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        {message && <p className='message'>{message}</p>}
                    </form>
                    <div className='form-btn'>
                            <Link to='/login' type='button' className='btn-cancel'>Hủy</Link>
                            <Link to={`/login/resetpassword&email=${email}`} type='submit'  className='btn-continue'>Tiếp tục</Link>
                        </div>
                </div>
            </div>
            <div className='for-section-2'>
                <div className='for-img-background'>
                    
                </div>
            </div>
        </div>
    );
}

export default Forgotpass;
