import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, LineController, BarController, Title, Tooltip, Legend, Filler } from 'chart.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Line, } from 'react-chartjs-2';
import { db } from '../config/FirebaseConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    LineController,
    BarController,
    Title,
    Tooltip,
    Legend,
    Filler
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: false,
        }
    }
};
const Dashboard = () => {
    const {numbers} = useSelector((state:RootState) => state.capso);
    const [show, setShow] = useState(false);
    const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
    const [chartData, setChartData] = useState({ labels: [] as string[], datasets: [] as any[] });
    const fetchChartData = async (timeFrame: 'day' | 'week' | 'month') => {
        try {
            const q = query(collection(db, 'static'), where('type', '==', timeFrame));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: '',
                            data: data.Values,
                            borderColor: '#5185F7',
                            backgroundColor: '#CEDDFF',
                            fill: true,
                            tension: 0.5,
                            pointBackgroundColor: '#5185F7',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 10,
                            pointHoverBorderWidth: 1,
                            stack: true,
                            drawActiveElementsOnTop: true,

                        }
                    ]
                });
            })
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ Firestore:', error);
        }
    }
    useEffect(() => {
        fetchChartData(timeFrame);
    }, [timeFrame]);
    return (
        <>
            <div className="d-container">
                <p className="d-title text-[24px] leading-[36px] font-bold text-[#FF7506] ml-[20px] mb-[14px]">Biểu đồ cấp số</p>
                <div className="d-figure flex gap-[13px] ml-[20px] items-center mb-[12px] mr-[20px]">
                    <div className="d-f-box bg-white w-[216px] h-[120px] rounded-[8px]">
                        <div className='flex' >
                            <img className='w-[48px] h-[48px] mt-[8px] ml-[12px] mb-0' src="../../images/f-box-1.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title p-1 w-[80px] mt-[8px] ml-[12px]">
                                Số thứ tự đã cấp
                            </p>
                        </div>
                        <div className='flex justify-between items-center ml-[12px] mr-[8px] mt-[12px] mb-1'>
                            <h2 className='text-[30px] font-bold leading-[45px]'>{numbers.length}</h2>
                            <div className='flex items-center gap-1 text-[#FF9138] w-[41px] h-[12px] rounded-2xl bg-[#fff3e9] p-1 mt-3'>
                                <i className="fa-solid fa-arrow-down text-[8px]"></i>
                                <p className='text-[8px] font-[400] leading-[12px]'>3.21%</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-f-box bg-white w-[216px] h-[120px] rounded-[8px]">
                        <div className='flex'>
                            <img className='w-[48px] h-[48px] mt-[8px] ml-[12px] mb-0' src="../../images/f-box-2.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title p-1 w-[100px] mt-[8px] ml-[12px]">Số thứ tự đã sử dụng </p>
                        </div>
                        <div className='flex justify-between items-center ml-[12px] mr-[8px] mt-[12px] mb-1'>
                            <h2 className='text-[30px] font-bold'>{numbers.filter((num) => num.status==="Đã sử dụng").length}</h2>
                            <div className='flex items-center gap-1 text-[#E73F3F] w-[41px] h-[12px] rounded-2xl bg-red-200 p-1 mt-3'>
                                <i className="fa-solid fa-arrow-down text-[8px]"></i>
                                <p className='text-[8px] font-[400] leading-[12px]'>3.21%</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-f-box bg-white w-[216px] h-[120px] rounded-[8px]">
                        <div className='flex'>
                            <img className='w-[48px] h-[48px] mt-[8px] ml-[12px] mb-0' src="../../images/f-box-3.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title p-1 w-[100px] mt-[8px] ml-[12px]">Số thứ tự đang chờ</p>
                        </div>
                        <div className='flex justify-between items-center ml-[12px] mr-[8px] mt-[12px] mb-1'>
                            <h2 className='text-[30px] font-bold'>{numbers.filter((num) => num.status==="Đang chờ").length}</h2>
                            <div className='flex items-center gap-1 text-[#FF9138] w-[41px] h-[12px] rounded-2xl bg-[#fff3e9] p-1 mt-3'>
                                <i className="fa-solid fa-arrow-down text-[8px]"></i>
                                <p className='text-[8px] font-[400] leading-[12px]'>3.21%</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-f-box bg-white w-[216px] h-[120px] rounded-[8px]">
                        <div className='flex'>
                            <img className='w-[48px] h-[48px] mt-[8px] ml-[12px] mb-0' src="../../images/f-box-4.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title p-1 w-[100px] mt-[8px] ml-[12px]">Số thứ tự đã bỏ qua</p>
                        </div>
                        <div className='flex justify-between items-center ml-[12px] mr-[8px] mt-[12px] mb-1'>
                            <h2 className='text-[30px] font-bold'>{numbers.filter((num) => num.status==="Bỏ qua").length}</h2>
                            <div className='flex items-center gap-1 text-[#E73F3F] w-[41px] h-[12px] rounded-2xl bg-red-200 p-1 mt-3'>
                                <i className="fa-solid fa-arrow-down text-[8px]"></i>
                                <p className='text-[8px] font-[400] leading-[12px]'>3.21%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-chart ml-[20px] mt-0 w-[890px] h-[435px] bg-white rounded-xl mr-[24px]">
                    <div className='chart-header flex justify-between ml-[20px] mr-[20px] '>
                        <div className='flex flex-col mt-[12px]'>
                            <h2 className='d-chart-title text-[20px] leading-[30px] font-bold text-[#282739]'>Bảng thống kê theo ngày</h2>
                            <p className='p-0 text-[#A9A9B0] text-[14px] font-[400] leading-[21px]' >Tháng 11/2021</p>
                        </div>
                        <div className="chart-views-btn mt-[12px] flex gap-2 items-center">
                        Xem theo
                        <div className="relative w-[106px] h-[46px] bg-white border-[1px] rounded-lg cursor-pointer" onClick={() => setShow(!show)}>
                            <div className='flex ml-0 justify-center items-center mr-[20px] gap-3 mt-1'>
                            <button className={`text-center w-full h-[30px]`}>{timeFrame === 'day' ? 'Ngày' : timeFrame === 'week' ? 'Tuần' : 'Tháng'}</button>
                            <i className="fa-solid fa-caret-down text-[24px] text-[#FF7506]"></i>
                            </div>
                            {show && (
                                <div className="flex flex-col mt-[14px] w-[106px] bg-white rounded-xl text-left">
                                    <button className={`text-left w-full h-[30px] p-2 ${timeFrame ==='day'? 'bg-[#FFF2E7]' :''}`}   onClick={() => { setTimeFrame('day'); setShow(false); }}>Ngày</button>
                                    <button className={`text-left w-full h-[30px] p-2 ${timeFrame ==='week'? 'bg-[#FFF2E7]' :''}`}  onClick={() => { setTimeFrame('week'); setShow(false); }}>Tuần</button>
                                    <button className={`text-left w-full h-[30px] p-2 ${timeFrame ==='month'? 'bg-[#FFF2E7]' :''}`}  onClick={() => { setTimeFrame('month'); setShow(false); }}>Tháng</button>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    </div>
                    <div className='chart-content w-[854px] h-[373px] ml-[24px]'>
                        <Line data={chartData} options={options} />
                    </div>

                </div>
            </div>
        </>
    )
}
export default Dashboard;