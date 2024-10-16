import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addRole } from "../../../redux/slices/roleSlice";
import { AppDispatch } from "../../../redux/store";

export const AddRole = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        
        // Lấy danh sách các feature từ checkbox
        const features: string[] = [];
        const featureCheckboxes = document.querySelectorAll('input[name="feature"]:checked');
        featureCheckboxes.forEach(checkbox => {
            if (checkbox instanceof HTMLInputElement) {
                features.push(checkbox.value);
            }
        });

        const newRole = {
            id: new Date().toISOString(), 
            role_name: formData.get("role")?.toString() || "",
            mota: formData.get("mota")?.toString() || "",
            feature: features,
        };

        dispatch(addRole(newRole));
        alert('Role added');
        navigate('/setting/role');
    };

    return (
        <>
            <div className="mt-0">
                <p className="text-[#FF7506] text-[24px] font-bold">Danh sách vai trò</p>
                <div className="w-[1192px] h-[520px] bg-white rounded-lg">
                    <p className="text-[#FF7506] text-[20px] font-bold leading-[30px] p-[16px]">Thông tin vai trò</p>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <div className="w-[550px] ml-[24px] h-full flex flex-col gap-3">
                                <label htmlFor="">Tên vai trò <span className="text-[#FF4747]">*</span></label>
                                <input className="w-[560px] h-[44px] border-[2px] border-[#D4D4D7] rounded-lg p-2" placeholder="Nhập tên vai trò" type="text" name="role" />
                                <label htmlFor="">Mô tả</label>
                                <textarea className="appearance-none resize-none w-[560px] h-[160px] border-[2px] border-[#D4D4D7] rounded-lg p-2" name="mota" placeholder="Nhập mô tả" />
                                <span> <span className="text-[#FF4747]">*</span> Là trường thông tin bắt buộc</span>
                            </div>
                            <div className="w-[550px] mr-[24px] h-full flex flex-col gap-1">
                                <label htmlFor="" className="">Phân quyền chức năng</label>
                                <div className="w-[560px] h-[420px] bg-[#FFF2E7] rounded-lg ">
                                    <div className="mt-[16px] flex flex-col">
                                        <label htmlFor="" className="text-[20px] text-[#FF7506] font-bold leading-[30px] ml-[24px]">Nhóm chức năng A</label>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="Tất cả" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Tất cả</label>
                                        </div>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="chức năng x" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">chức năng x</label>
                                        </div>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="chức năng y" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Chức năng y</label>
                                        </div>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px] mb-[24px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="Chức năng z" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Chức năng z</label>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-[20px] text-[#FF7506] font-bold leading-[30px] ml-[24px] mt-[12px]">Nhóm chức năng B</label>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="Tất cả" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Tất cả</label>
                                        </div>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="chức năng x" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Chức năng x</label>
                                        </div>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="chức năng y" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Chức năng y</label>
                                        </div>
                                        <div className="flex gap-[12px] ml-[24px] mt-[12px] mb-[24px]">
                                            <input
                                                type="checkbox"
                                                name="feature"
                                                value="function_z_b" // Thay đổi giá trị theo chức năng
                                                className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                            />
                                            <label htmlFor="">Chức năng z</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-[24px] gap-[32px]">
                            <Link to='/setting/role'>
                                <button type="button" className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px] border-[#FF9138]">Hủy</button>
                            </Link>
                            <button type="submit" className="w-[147px] h-[48px] bg-[#FF7506] text-white rounded-lg text-[16px] font-bold">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
