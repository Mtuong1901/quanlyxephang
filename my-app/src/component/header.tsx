
export const Header = () => {
    return (
        <>
            <div className=" header h-[88px] flex items-center justify-between w-[1336px] fixed">
                <div className=' router ml-[24px] text-[20px] font-bold text-[#FF9138]'>Dashboard</div>
                <div className="note flex justify-center items-center mr-[64px]">
                    <div className='bg-[#FFF2E7] w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer'>
                        <i className="fa-solid fa-bell text-[#FFAC6A]"></i>
                    </div>
                    <img className='avt rounded-full mt-[55px] w-[40px] ml-[24px] h-[40px]' src="./images/avt-1.jpg" alt="User Avatar" />
                    <div className=" p-0 ml-[8px]">
                        <p className='text-[#7E7D88] font-[12px] font-normal'>Xin chào</p>
                        <p className="text-[#535261] font-[16px] font-bold">Lê Quỳnh Ái Vân</p>
                    </div>
                </div>
            </div>
        </>
    )
}