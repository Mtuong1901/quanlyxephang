import { Link } from "react-router-dom"

export const Add = () => {
    return (
        <>
            <div className="container">
                <p className="text-[24px] text-[#FF7506] font-bold leading-[30px]">Quản lý thiết bị</p>
                <div className="bg-white w-[1252px] h-[476px] mt-[16px] rounded-[16px]">
                    <p className="text-[20px] text-[#FF7506] font-bold leading-[30px] pt-[16px] ml-[24px] mb-[20px]">Thông tin thiết bị</p>
                    <div className="form">
                        <form action="">
                            <div className="flex ml-[24px] gap-[104px] mb-[16px]">
                                <div className=" w-[540px] h-[76px]">
                                    <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Mã thiết bị: <span className="text-[#FF4747]">*</span></label> <br />
                                    <input className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1" type="text" id="ma-thiet-bi" placeholder="Nhập mã thiết bị" required />
                                </div>
                                <div className=" w-[540px] h-[76px] ">
                                    <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Loại thiết bị: <span className="text-[#FF4747]">*</span></label> <br />
                                    <select className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex ml-[24px] gap-[104px] mb-[16px]">
                                <div className=" w-[540px] h-[76px]">
                                    <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Tên thiết bị: <span className="text-[#FF4747]">*</span></label> <br />
                                    <input className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1" type="text" id="ma-thiet-bi" placeholder="Nhập tên thiết bị" required />
                                </div>
                                <div className=" w-[540px] h-[76px]">
                                    <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Tên đăng nhập: <span className="text-[#FF4747]">*</span></label> <br />
                                    <input className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1" type="text" id="ma-thiet-bi" placeholder="Nhập tài khoản" required />
                                </div>
                            </div>
                            <div className="flex ml-[24px] gap-[104px] mb-[16px]">
                                <div className=" w-[540px] h-[76px]">
                                    <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Địa chỉ IP: <span className="text-[#FF4747]">*</span></label> <br />
                                    <input className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1" type="text" id="ma-thiet-bi" placeholder="Nhập địa chỉ IP" required />
                                </div>
                                <div className=" w-[540px] h-[76px]">
                                    <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Mật khẩu: <span className="text-[#FF4747]">*</span></label> <br />
                                    <input className="w-[540px] h-[44px] border-[1px] rounded-lg p-2 mt-1" type="text" id="ma-thiet-bi" placeholder="Nhập mật khẩu" required />
                                </div>
                            </div>
                            <div className=" w-[1184px] h-[76px] ml-[24px]">
                                <label className="text-[#282739] text-[16px] font-[600] leading-[24px]" htmlFor="">Dịch vụ sử dụng: <span className="text-[#FF4747]">*</span></label> <br />
                                <input className="w-full h-[44px] border-[1px] rounded-lg p-2 mt-1" type="text" id="ma-thiet-bi" placeholder="Nhập dịch vụ sử dụng" required />
                            </div>
                        </form>
                        <p className="ml-[24px] mt-[16px] text-[#7E7D88] text-[14px] font-[400] leading-[21px]"><span className="text-[#FF4747]">*</span>Là trường bắt buộc</p>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-[24px] gap-[32px]">
                    <Link to='/thietbi'> 
                        <button className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px]  border-[#FF9138]">Hủy</button>
                    </Link>
                    <button className="w-[147px] h-[48px] bg-[#FF9138] text-white text-[16px] font-bold rounded-lg">Thêm thiết bị</button>
                </div>
            </div>
        </>
    )
}