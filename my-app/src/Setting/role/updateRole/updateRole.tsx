import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchRoleById, updateRole } from "../../../redux/slices/roleSlice";

export const UpdateRole = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { roles } = useSelector((state: RootState) => state.role);
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState<string[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            dispatch(fetchRoleById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        const role = roles.find(role => role.id === id);
        if (role) {
            setRoleName(role.role_name);
            setDescription(role.mota);
            setFeatures(role.feature);
        }
    }, [roles, id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedRole = {
            id,
            role_name: roleName,
            mota: description,
            feature: features,
        };
        dispatch(updateRole(updatedRole));
        alert('Cập nhật thành công');
        navigate('/setting/role')
    };

    const handleFeatureChange = (value: string) => {
        setFeatures(prevFeatures =>
            prevFeatures.includes(value) 
                ? prevFeatures.filter(f => f !== value) 
                : [...prevFeatures, value]
        );
    };

    return (
        <>
            <div className="mt-0">
                <p className="text-[#FF7506] text-[24px] font-bold">Danh sách vai trò</p>
                <div className="w-[1192px] h-[520px] bg-white rounded-lg">
                    <p className="text-[#FF7506] text-[20px] font-bold leading-[30px] p-[16px]">Thông tin vai trò</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between">
                            <div className="w-[550px] ml-[24px] h-full flex flex-col gap-3">
                                <label htmlFor="">Tên vai trò <span className="text-[#FF4747]">*</span></label>
                                <input
                                    className="w-[560px] h-[44px] border-[2px] border-[#D4D4D7] rounded-lg p-2"
                                    placeholder="Nhập tên vai trò"
                                    type="text"
                                    name="role"
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                />
                                <label htmlFor="">Mô tả</label>
                                <textarea
                                    className="appearance-none resize-none w-[560px] h-[160px] border-[2px] border-[#D4D4D7] rounded-lg p-2"
                                    name="mota"
                                    placeholder="Nhập mô tả"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <span><span className="text-[#FF4747]">*</span> Là trường thông tin bắt buộc</span>
                            </div>
                            <div className="w-[550px] mr-[24px] h-full flex flex-col gap-1">
                                <label className="">Phân quyền chức năng</label>
                                <div className="w-[560px] h-[420px] bg-[#FFF2E7] rounded-lg">
                                    <div className="mt-[16px] flex flex-col">
                                        <label className="text-[20px] text-[#FF7506] font-bold leading-[30px] ml-[24px]">Nhóm chức năng A</label>
                                        {["Tất cả", "chức năng x", "chức năng y", "chức năng z"].map(feature => (
                                            <div className="flex gap-[12px] ml-[24px] mt-[12px]" key={feature}>
                                                <input
                                                    type="checkbox"
                                                    name="feature"
                                                    value={feature}
                                                    checked={features.includes(feature)}
                                                    onChange={() => handleFeatureChange(feature)}
                                                    className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                                />
                                                <label>{feature}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="text-[20px] text-[#FF7506] font-bold leading-[30px] ml-[24px] mt-[12px]">Nhóm chức năng B</label>
                                        {["Tất cả", "chức năng x", "chức năng y", "chức năng z"].map(feature => (
                                            <div className="flex gap-[12px] ml-[24px] mt-[12px]" key={feature}>
                                                <input
                                                    type="checkbox"
                                                    name="feature"
                                                    value={feature}
                                                    checked={features.includes(feature)}
                                                    onChange={() => handleFeatureChange(feature)}
                                                    className="appearance-none w-[20px] h-[20px] border border-[#4277FF] bg-white rounded-sm checked:bg-blue-500 checked:border-transparent"
                                                />
                                                <label>{feature}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-[24px] gap-[32px]">
                            <Link to='/setting/role'>
                                <button type="button" className="w-[147px] h-[48px] bg-[#FFF2E7] text-[#FF9138] rounded-lg text-[16px] font-bold border-[2px] border-[#FF9138]">Hủy</button>
                            </Link>
                            <button type="submit" className="w-[147px] h-[48px] bg-[#FF7506] text-white rounded-lg text-[16px] font-bold">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
