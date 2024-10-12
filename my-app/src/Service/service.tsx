import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ServiceList } from '../component/serviceList';

export const Service = () => {
    const [showStatus, setShowStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Tất cả");
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
                        <p className='sl-box-title'>Chọn thời gian</p>
                        <div className='flex gap-1 items-center'>
                            <div className='date-1 bg-white rounded-lg'>
                                <input className='w-[150px] h-[44px] rounded-lg p-2' type="date" />
                            </div>
                            <div>
                            <i className="fa-solid fa-caret-right"></i>
                            </div>
                            <div className='date-1 bg-white rounded-lg'>
                                <input className='w-[150px] h-[44px] rounded-lg p-2' type="date" />
                            </div>
                        </div>                        
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
                                <th className='w-[150px]'>Mã dịch vụ</th>
                                <th className='w-[224px]'>Tên dịch vụ</th>
                                <th className='w-[230px]'>Mô tả</th>
                                <th className='w-[253px]'>Trạng thái hoạt động</th>
                                <th className='w-[125px]'></th>
                                <th className='w-[125px]'></th>
                            </tr>
                        </thead>
                        <ServiceList/>
                    </table>
                    <div className='flex flex-col'>
                    <div className='de-aside-btn'>
                        <Link to={`/dichvu/themdichvu`}>
                        <button className='de-add-btn'>
                            <div className='plus-icon'>
                            <i className="fa-solid fa-pen"></i>
                            </div>
                            <p>Thêm dịch vụ</p>
                        </button>
                        </Link>
                    </div>
                    
                    </div>
                </div>
            </div>
        </>
    );
};
