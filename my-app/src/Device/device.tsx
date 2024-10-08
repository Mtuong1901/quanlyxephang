import { useState } from 'react';
import './device.css'
import { DeviceList } from '../component/deviceList';
import { Link } from 'react-router-dom';

const Device = () => {
    const [showStatus, setShowStatus] = useState(false);
    const [showConnection, setShowConnection] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
    const [selectedConnection, setSelectedConnection] = useState("Tất cả");
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
                                    <li onClick={() => { setSelectedConnection('Tat ca'); setShowConnection(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Tất cả</p></li>
                                    <li onClick={() => { setSelectedConnection('Ket noi'); setShowConnection(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Kết nối</p></li>
                                    <li onClick={() => { setSelectedConnection('Mat ket noi'); setShowConnection(false); }}><p className='ml-2 mt-2 text-[#535261] text-[16px]'>Mất kết nối</p></li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="de-search">
                        <p className='sl-box-title'>Từ khóa</p>
                        <div className='search'>
                            <input type="text" placeholder="nhập từ khóa" />
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
                        <DeviceList />
                        
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
            </div>
        </>
    );
};

export default Device;
