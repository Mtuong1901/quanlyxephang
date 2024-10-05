import { Link } from "react-router-dom"

export const Detail = () => {
    return (
        <>
            <div className="container">
                <p className="text-[24px] text-[#FF7506] font-bold leading-[30px]">Quản lý thiết bị</p>
                <div className="flex gap-[24px]">
                    <div className="bg-white w-[1232px] h-[550px] rounded-xl mt-[16px]">
                        <p className="text-[20px] text-[#FF7506] font-bold leading-[30px] pt-[16px] ml-[24px] mb-[20px]">Thông tin thiết bị</p>
                        <div className=" ml-[24px] flex gap-[366px] mb-[16px]">
                            <div className="w-[178px] h-[24px]">
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >Mã thiết bị: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span> </p>
                            </div>
                            <div>
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >Loại thiết bị: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span>  </p>
                            </div>
                        </div>
                        <div className=" ml-[24px] flex gap-[366px] mb-[16px]">
                            <div className="w-[178px] h-[24px]">
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >Tên thiết bị: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span> </p>
                            </div>
                            <div>
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >Tên đăng nhập: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span>  </p>
                            </div>
                        </div>
                        <div className=" ml-[24px] flex gap-[366px] mb-[16px]">
                            <div className="w-[178px] h-[24px]">
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >Địa chỉ IP: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span> </p>
                            </div>
                            <div>
                                <p className="text-[#282739] text-[16px] font-[600] leading-[24px]" >Mật khẩu: <span className="ml-[43px] text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span>  </p>
                            </div>
                        </div>
                        <div className="ml-[24px]">
                            <p className="text-[#282739] text-[16px] font-[600] leading-[24px] mb-1" >Dịch vụ sử dụng: <br /> <span className="text-[#535261] text-[16px] font-[400] leading-[24px]">kios1</span>  </p>
                        </div>
                    </div>

                    <Link className="w-[80px] h-[94px] flex flex-col items-center bg-[#FFF2E7] rounded-xl justify-center" to='/thietbi/capnhat'>
                        <i className="fa-solid fa-pen bg-[#FF9138] text-white w-[24px] h-[24px] p-1 rounded-lg mb-[4px]"></i>
                        <p className="text-[#FF7506] text-[14px] font-[600] text-center">Cập nhật thiết bị</p>
                    </Link>
                </div>
            </div>
        </>
    )
}