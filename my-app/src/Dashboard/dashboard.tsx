import './dashboard.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, LineController, BarController, Title, Tooltip, Legend, Filler } from 'chart.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Chart, Line, } from 'react-chartjs-2';
import { db } from '../config/FirebaseConfig';
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
    scales: {
        y: {
            beginAtZero: true,
        }
    }
};

const Dashboard = () => {
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
                            backgroundColor:'#CEDDFF',
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#5185F7',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth : 10,
                            pointHoverBorderWidth : 1,
                            stack: true,
                            drawActiveElementsOnTop:true,
                            
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
                <div className="router-location">
                    <p>Dashboard</p>
                </div>
                <div className="d-section">
                    <p className="d-title">Biểu đồ cấp só</p>
                    <div className="d-figure">
                        <div className="d-f-box">
                            <img src="../../images/f-box-1.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title">
                                Số thứ tự đã cấp
                            </p>
                            <div className='f-box-value'>
                                <h2>4.221</h2>
                                <p>3.21%</p>
                            </div>
                        </div>
                        <div className="d-f-box">
                            <img src="../../images/f-box-2.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title">Số thứ tự đã sử dụng </p>
                            <div className='f-box-value'>
                                <h2>3.721</h2>
                                <p style={{ color: "red" }}>32.41%</p>
                            </div>
                        </div>
                        <div className="d-f-box">
                            <img src="../../images/f-box-3.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title">Số thứ tự đang chờ</p>
                            <div className='f-box-value'>
                                <h2>468</h2>
                                <p>50.41%</p>
                            </div>
                        </div>
                        <div className="d-f-box">
                            <img src="../../images/f-box-4.png" alt="icon so thu tu da cap" />
                            <p className="f-box-title">Số thứ tự đã bỏ qua</p>
                            <div className='f-box-value'>
                                <h2>32</h2>
                                <p style={{ color: "red" }}>22.41%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-chart">
                    <div className='chart-header'>
                        <h2 className='d-chart-title'>
                            Bảng thống kê theo ngày
                            <p >Tháng 11/2021</p>
                        </h2>
                        <div className='chart-views-btn'>
                            Xem theo
                                <button onClick={() => setTimeFrame('day')}>Day</button>
                                <button onClick={() => setTimeFrame('week')}>week</button>
                                <button onClick={() => setTimeFrame('month')}>month</button>
                        </div>
                    </div>
                    <div className='chart-content'>
                        <Line data={chartData} options={options} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;