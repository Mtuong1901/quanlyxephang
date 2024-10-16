import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addNewNumber } from "../../redux/slices/capsoSlice";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore"; // Thêm vào
import { db } from "../../config/FirebaseConfig"; // Đảm bảo rằng đường dẫn đúng

export const New = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { numbers } = useSelector((state: RootState) => state.capso);
    const [cus_name, setCus_name] = useState('');
    const [showServiceStatus, setShowServiceStatus] = useState(false);
    const [selectedServiceStatus, setSelectedServiceStatus] = useState("");
    const [modal, setModal] = useState(false);
    const [currentNum, setCurrentNum] = useState<number | null>(null);

    // Hàm để lấy số lớn nhất từ Firestore
    const fetchCurrentNumber = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "capso"));
            let maxNumber = 2010000; // Khởi tạo với số bắt đầu

            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                if (docData.number > maxNumber) {
                    maxNumber = docData.number; // Cập nhật maxNumber nếu có số lớn hơn
                }
            });

            setCurrentNum(maxNumber + 1); // Cập nhật currentNum
        } catch (error) {
            console.error("Error fetching current number: ", error);
        }
    };

    useEffect(() => {
        fetchCurrentNumber(); // Gọi hàm khi component mount
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedServiceStatus && cus_name && currentNum !== null) {
            const newNumber = {
                service_name: selectedServiceStatus,
                number: currentNum,
                cus_name: cus_name,
                status: 'Đang chờ',
                ngaycap: new Date(),
                hethan: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                nguoncap: 'Hệ thống',
            };

            dispatch(addNewNumber(newNumber));
            setModal(true);
        }
    };

    return (
        <>
            <div className="font-[Nunito]">
                <p className="text-[#FF7506] text-[24px] font-bold leading-[36px] relative">Quản lý cấp số</p>
                <div className="w-[1192px] h-[500px] bg-white rounded-lg">
                    <div className="flex flex-col items-center text-center">
                        <form onSubmit={handleSubmit}>
                            <p className="text-[#FF7506] text-[32px] leading-[48px] font-bold mt-[24px]">Cấp số mới</p>
                            <p className="text-[#535261] text-[20px] font-bold leading-[30px] mt-[20px] mb-[12px]">Dịch vụ khách hàng lựa chọn</p>
                            <div className="tendichvu w-[400px] h-[72px] flex flex-col gap-1 relative">
                                <div
                                    className="w-full h-[44px] bg-white border-[2px] border-[#D4D4D7] rounded-lg flex justify-between p-2 items-center cursor-pointer"
                                    onClick={() => setShowServiceStatus(!showServiceStatus)}
                                >
                                    <p className="sl-title text-[#535261] text-[16px]">{selectedServiceStatus || "Chọn dịch vụ"}</p>
                                    <i className={`fa-solid ${selectedServiceStatus ? 'fa-caret-up' : 'fa-caret-down'} text-[#FF7506]`}></i>
                                </div>
                                {showServiceStatus && (
                                    <div className="w-[400px] bg-white rounded-lg absolute mt-[44px] text-left cursor-pointer">
                                        <ul className="mt-2 flex flex-col text-[14px] max-h-[150px] overflow-y-scroll overflow-x-hidden custom-scrollbar">
                                            {["Khám sản - Phụ khoa", "Khám răng hàm mặt", "Khám tai mũi họng", "Khám tim mạch", "Khám tổng quát", "Khám hô hấp"].map(service => (
                                                <li key={service} className={`${selectedServiceStatus === service ? "bg-[#FFF2E7]" : ""}`} onClick={() => { setSelectedServiceStatus(service); setShowServiceStatus(false); }}>
                                                    <p className="w-full h-[44px] ml-2 mt-2 text-[#535261]">{service}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="cus_name" className="text-left text-[#535261] text-[20px] font-bold leading-[30px] mt-[20px] mb-[12px]">Tên khách hàng</label>
                                <input className="w-[400px] h-[44px] border-[1px] rounded-lg border-[#D4D4D7] p-2" type="text" id="cus_name" onChange={(e) => setCus_name(e.target.value)} placeholder="Nhập tên khách hàng" />
                            </div>
                            <div className="flex gap-[32px] mt-[80px] justify-center">
                                <Link to={`/capso`} className="w-[115px] h-[48px] bg-[#FFF2E7] text-[#FF9138] text-[16px] font-bold rounded-xl p-3">Hủy</Link>
                                <button type="submit" className="w-[115px] h-[48px] bg-[#FF9138] text-white text-[16px] font-bold rounded-xl">In số</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[469px] h-[385px] max-w-[600px] text-center flex flex-col justify-between rounded-2xl relative">
                        <i className="fa-solid fa-x absolute right-0 p-3 text-[24px] text-[#FF7506] cursor-pointer" onClick={() => setModal(false)}></i>
                        <div className="flex flex-col items-center">
                            <p className="text-[#535261] text-[32px] leading-[40px] mt-[48px] font-bold">Số thứ tự được cấp</p>
                            <p className="text-[#FF7506] text-[56px] font-bold leading-[60px] mt-[24px]">{currentNum !== null ? currentNum : 'Loading...'}</p>
                            <p className="text-[#282739] text-[18px] font-bold leading-[27px] mt-[24px]">Dịch vụ {selectedServiceStatus}</p>
                        </div>
                        <div className="time bg-[#FF9138] w-full h-[110px] rounded-br-2xl rounded-bl-2xl">
                            <p className="text-white text-[22px] leading-[33px] font-bold mt-[16px]">Thời gian cấp <span>{new Date().toLocaleString()}</span></p>
                            <p className="text-white text-[22px] leading-[33px] font-bold mt-[12px]">Hạn sử dụng <span>{new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleString()}</span></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
