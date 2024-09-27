import '../forgotpass/forgotpass.css'
const Resetpassword = () => {
    return (
        <>
        helo
            <div className='login-container' style={{ backgroundColor: '#F0F0F0' }}>
                <div className='login-section-1'>
                    <div className='login-logo'>
                        <img src="../../images/Logo alta.png" alt="logoalta" />
                    </div>
                    <div className='login-form'>
                        <form >
                            <label htmlFor="email">Vui lòng nhập email để đặt lại mật khẩu của bạn *</label><br />

                        <div className='form-btn'>
                            <button type="submit">Xác nhận</button>
                        </div>
                        </form>
                    </div>
                </div>
                <div className='for-section-2'>
                    <div className='for-img-background'>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Resetpassword;