import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch } from "../../redux/store"
import { addService } from "../../redux/slices/serviceSlice";
import { useState } from "react";
import { Iservice } from "../../Iservice";

export const AddService = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [formdata, setFormData] = useState<Iservice>({
        idService: '',
        name: '',
        description: '',
        status: 'Hoạt động',
        sequentialNumbers:[],
        procress: 'đang thực hiện',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(addService(formdata))
            .unwrap().then(
                () => {
                    alert('Thêm dịch vụ thành công');
                    navigate('/dichvu');
                }
            )
            .catch((error) => {
                if (error === "Service with this idService already exists.") {
                    alert("ID dịch vụ đã tồn tại. Vui lòng sử dụng ID khác.");
                }
            });
    };

    return (
        <>
            <div >
                <form action="" onSubmit={handleSubmit}>
                    <div className="w-[1178px] h-[534px] bg-white rounded-lg pt-2">
                        <p className=" mt-2 text-[24px] text-[#FF7506] font-bold leading-[30px] ml-[24px] mb-[16px]">Thông tin dịch vụ</p>
                        <div className="flex ml-[24px] gap-[24px]">
                            <div className="flex w flex-col gap-[12px]">
                                <div className="w-[553px] h-[76px]">
                                    <label htmlFor="">Mã dịch vụ: <span className="text-[#FF4747] mb-[8px]">*</span></label>
                                    <input type="text" name="idService" className="w-full h-[44px] border-[2px] rounded-lg" onChange={handleChange} />
                                </div>
                                <div className="w-[553px] h-[76px]">
                                    <label htmlFor="">Tên dịch vụ: <span className="text-[#FF4747] ">*</span></label>
                                    <input type="text" name="name" className="w-full h-[44px] border-[2px] rounded-lg" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="w-[553px] h-[164px] flex flex-col">
                                <label htmlFor="">Mô tả: <span className="text-[#FF4747]">*</span></label>
                                <textarea className=" appearance-none  resize-none w-full h-[132px] p-1 border-[1px] border-[#D4D4D7] rounded-lg p-2 " onChange={handleChange} name="description" id="mota" placeholder="Mô tả dịch vụ"></textarea>
                            </div>
                        </div>
                        <div className="ml-[24px]">
                            <p className=" mt-2 text-[24px] text-[#FF7506] font-bold leading-[30px] mb-[12px]">Quy tắc cấp số</p>
                            <div className="flex gap-2 items-center mb-[16px]">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent checked:relative checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:left-[2px] checked:before:top-[-1px]"
                                />
                                <p >Tăng tự động từ</p>
                                <div className="w-[61px] h-[44px] border-[2px] rounded-lg p-2 ml-[15px]"><span>0001</span></div>
                                <p>đến</p>
                                <div className="w-[61px] h-[44px] border-[2px] rounded-lg p-2"><span>9999</span></div>
                            </div>
                            <div className="flex gap-2 items-center mb-[16px]">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent checked:relative checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:left-[2px] checked:before:top-[-1px]"
                                />
                                <p >Prefix</p>
                                <div className="w-[61px] ml-[89px] h-[44px] border-[2px] rounded-lg p-2"><span>0001</span></div>
                            </div>
                            <div className="flex gap-2 items-center mb-[16px]">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent checked:relative checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:left-[2px] checked:before:top-[-1px]"
                                />
                                <p >Surfix</p>
                                <div className="w-[61px] ml-[89px] h-[44px] border-[2px] rounded-lg p-2"><span>0001</span></div>
                            </div>
                            <div className="flex gap-2 items-center mb-[16px]">
                                <input
                                    type="checkbox"
                                    className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent checked:relative checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:left-[2px] checked:before:top-[-1px]"
                                />
                                <p >Reset mỗi ngày</p>
                            </div>
                            <p className="text-[#7E7D88] text-[14px] font-[400] leading-[21px]"><span className="text-[#FF4747]">*</span>Là trường thông tin bắt buộc</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-[24px] gap-[32px]">
                        <Link to='/dichvu'>
                            <button type="button" className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px] border-[#FF9138]">Hủy</button>
                        </Link>
                        <button type="submit" className="w-[147px] h-[48px] bg-[#FF7506] text-white rounded-lg text-[16px] font-bold">Thêm</button>
                    </div>
                </form>
            </div>
        </>
    )
}