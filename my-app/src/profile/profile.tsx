
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <>
            <div className="w-[1112px] h-[379px] rounded-lg bg-white mt-[150px] pt-[40px]">
                <div className="flex gap-2 justify-around">
                    <div className="img flex flex-col w-[248px] relative items-center gap-2">
                        <div className="h-[251px] ">
                        <img className="w-[248px] h-[248px] ml-0 mt-0 rounded-[500px] " src={`../../images/${user?.img}`} alt="" />
                        <i className="fa-solid fa-camera w-[45px] h-[45px] absolute right-5 top-[200px] bg-[#FF9138] rounded-[50px] text-white text-[30px] p-[7px] border-[1px] border-white"></i>
                        </div>
                        <p className="text-[#282739] text-[24px] font-bold">{user?.fullname}</p>
                    </div>
                    <div className="flex flex-col gap-2 w-[382px]">
                        <div>
                            <p>Tên người dùng</p>
                            <input type="text" value={user?.fullname} className=" w-full h-[44px] border-[2px] bg-[#EAEAEC] rounded-md p-2 text-[#6C7585] text-[16px] font-[400] leading-[21px]" readOnly disabled />
                        </div>
                        <div>
                            <p>Số điện thoại</p>
                            <input type="text" value={user?.phone} className=" w-full h-[44px] border-[2px] bg-[#EAEAEC] rounded-md p-2 text-[#6C7585] text-[16px] font-[400] leading-[21px]" readOnly disabled />
                        </div>
                        <div>
                            <p>Email</p>
                            <input type="text" value={user?.email} className=" w-full h-[44px] border-[2px] bg-[#EAEAEC] rounded-md p-2 text-[#6C7585] text-[16px] font-[400] leading-[21px]" readOnly disabled />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-[382px]">
                        <div>
                            <p>Tên đăng nhập</p>
                            <input type="text" value={user?.username} className=" w-full h-[44px] border-[2px] bg-[#EAEAEC] rounded-md p-2 text-[#6C7585] text-[16px] font-[400] leading-[21px]" readOnly disabled />
                        </div>
                        <div>
                            <p>Mật khẩu</p>
                            <input type="text" value={user?.password} className=" w-full h-[44px] border-[2px] bg-[#EAEAEC] rounded-md p-2 text-[#6C7585] text-[16px] font-[400] leading-[21px]" readOnly disabled />
                        </div>
                        <div>
                            <p>Vai trò</p>
                            <input type="text" value={user?.role} className=" w-full h-[44px] border-[2px] bg-[#EAEAEC] rounded-md p-2 text-[#6C7585] text-[16px] font-[400] leading-[21px]" readOnly disabled />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}