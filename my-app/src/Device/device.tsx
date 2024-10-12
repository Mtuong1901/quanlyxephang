import { useState } from 'react';
import './device.css'
import { DeviceList } from '../component/deviceList';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';


const Device = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const [showConnection, setShowConnection] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [selectedConnection, setSelectedConnection] = useState("Tất cả");
    const { devices, status, error } = useSelector((state: RootState) => state.device);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const indexOfLastDevice = currentPage * itemsPerPage;
    const indexOfFirstDevice = indexOfLastDevice - itemsPerPage;
    const currentDevices = devices.slice(indexOfFirstDevice, indexOfLastDevice);
    const totalPages = Math.ceil(devices.length / itemsPerPage);

    return (
        <>
            <div className="de-container">
                <div className="de-nav">
                    <div className="de-sl-box">
                        <p className='sl-box-title'>Trạng thái hoạt động</p>
                        <div className={`${showStatus ? 'selected-after ' : ''}select-group`} onClick={() => setShowStatus(!showStatus)}>
                            <p className='sl-title text-[#535261] text-[16px]'>{selectedStatus}</p>
                            <i className={`fa-solid ${showStatus ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                        </div>

                        {showStatus && (
                            <div className='selected rounded-lg '>
                                <ul className='mt-2 flex flex-col'>
                                    <li onClick={() => { setSelectedStatus('Tất cả'); setShowStatus(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Tất cả</p></li>
                                    <li onClick={() => { setSelectedStatus('Hoạt động'); setShowStatus(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Hoạt động</p></li>
                                    <li onClick={() => { setSelectedStatus('Ngưng hoạt động'); setShowStatus(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Ngưng hoạt động</p></li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="de-sl-box">
                        <p className='sl-box-title'>Trạng thái kết nối</p>
                        <div className={`${showConnection ? 'selected-after ' : ''}select-group`} onClick={() => setShowConnection(!showConnection)}>
                            <p className='sl-title text-[#535261] text-[16px]'>{selectedConnection}</p>
                            <i className={`fa-solid ${showConnection ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                        </div>
                        {showConnection && (
                            <div className='selected  rounded-lg'>
                                <ul className='flex flex-col'>
                                    <li onClick={() => { setSelectedConnection('Tất cả'); setShowConnection(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Tất cả</p></li>
                                    <li onClick={() => { setSelectedConnection('Kết nối'); setShowConnection(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Kết nối</p></li>
                                    <li onClick={() => { setSelectedConnection('Mất kết nối'); setShowConnection(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Mất kết nối</p></li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="de-search">
                        <p className='sl-box-title'>Từ khóa</p>
                        <div className='search'>
                            <input type="text" placeholder="nhập từ khóa" onChange={(e) => setSearchTerm(e.target.value)} />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                <div className="de-content">
                    <table className='de-table'>
                        <thead className='' style={{ backgroundColor: '#FF9138' }}>
                            <tr>
                                <th className='w-[120px]'>Mã thiết bị</th>
                                <th className='w-[130px]'>Tên thiết bị</th>
                                <th className='w-[110px]'>Địa chỉ IP</th>
                                <th className='w-[200px]'>Trạng thái hoạt động</th>
                                <th className='w-[170px]'>Trạng thái kết nối</th>
                                <th className='w-[300px]'>Dịch vụ sử dụng</th>
                                <th className='w-[82px]'></th>
                                <th className='w-[82px]'></th>
                            </tr>
                        </thead>
                        <DeviceList selectedStatus={selectedStatus} selectedConnection={selectedConnection} searchTerm={searchTerm} currentDevices={currentDevices} />
                    </table>
                    <div className='de-aside-btn'>
                        <Link to="/thietbi/themthietbi">
                            <button className='de-add-btn'>
                                <div className='plus-icon'>
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                                <p>Thêm thiết bị</p>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='phanpage flex justify-end mr-[110px] mt-[24px] gap-2 '>
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`page-button h-[32px] ${currentPage === 1 ? "text-[#A9A9B0]" : ""} `}
                    >
                        <i className="fa-solid fa-caret-left"></i>
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`page-button ${currentPage === index + 1 ? 'active bg-[#FF7506] text-white rounded-md' : ''} w-[32px] h-[32px]` }
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`page-button h-[32px] ${currentPage === totalPages ? "text-[#A9A9B0]" : ""} `}
                    >
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>

            </div>
        </>
    );
};

export default Device;
