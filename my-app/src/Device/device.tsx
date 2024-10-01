import { useState } from 'react';
import './device.css'
import { DeviceList } from '../component/deviceList';

const Device = () => {
    const [showStatus, setShowStatus] = useState(false);
    const [showConnection, setShowConnection] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Tat ca");
    const [selectedConnection, setSelectedConnection] = useState("Tat ca");

    return (
        <>
            <div className="container">
                <div className="de-header">
                    <p style={{ color: '#7E7D88' }}>Thiet bi <span style={{ color: '#FF7506' }}>Danh sach thiet bi</span></p>
                    <h2 className="de-title">Danh sach thiet bi</h2>
                </div>
                <div className="de-nav">
                    <div className="de-sl-box">
                        <p className='sl-box-title'>Trang thai hoat dong</p>
                        <div className={`${showStatus ? 'selected-after ' : ''}select-group`} onClick={() => setShowStatus(!showStatus)}>
                            <p className='sl-title'>{selectedStatus}</p>
                            <i className={`fa-solid ${showStatus ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                        </div>

                        {showStatus && (
                            <div className='selected'>
                                <ul>
                                    <li onClick={() => { setSelectedStatus('Tat ca'); setShowStatus(false); }}>Tat ca</li>
                                    <li onClick={() => { setSelectedStatus('Hoat dong'); setShowStatus(false); }}>Hoat dong</li>
                                    <li onClick={() => { setSelectedStatus('Ngung hoat dong'); setShowStatus(false); }}>Ngung hoat dong</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="de-sl-box">
                        <p className='sl-box-title'>Trang thai ket noi</p>
                        <div className={`${showConnection ? 'selected-after ' : ''}select-group`} onClick={() => setShowConnection(!showConnection)}>
                            <p className='sl-title'>{selectedConnection}</p>
                            <i className={`fa-solid ${showConnection ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                        </div>
                        {showConnection && (
                            <div className='selected'>
                                <ul>
                                    <li onClick={() => { setSelectedConnection('Tat ca'); setShowConnection(false); }}>Tat ca</li>
                                    <li onClick={() => { setSelectedConnection('Ket noi'); setShowConnection(false); }}>Ket noi</li>
                                    <li onClick={() => { setSelectedConnection('Mat ket noi'); setShowConnection(false); }}>Mat ket noi</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="de-search">
                        <p className='sl-box-title'>Tu khoa</p>
                        <div className='search'>
                            <input type="text" placeholder="tu khoa" />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                <div className="de-content">
                    <table className='de-table'>
                        <thead style={{ backgroundColor: '#FF9138' }}>
                            <tr>
                                <th>Ma thiet bi</th>
                                <th>Ten thiet bi</th>
                                <th>Dia chi ip</th>
                                <th>Trang thai hoat dong</th>
                                <th>Trang thai ket noi</th>
                                <th>Dich vu su dung</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <DeviceList/>
                        {/* <tbody>
                            
                            <tr>
                                <td>Kio_01</td>
                                <td>kiosk</td>
                                <td>190.902.099</td>
                                <td>Ngung hoat dong</td>
                                <td>Mat ket noi</td>
                                <td>Kham tim mach, kham mat ...</td>
                                <td>Chi tiet</td>
                                <td>Cap nhat</td>
                            </tr>
                        </tbody> */}
                    </table>

                    <div className='de-aside-btn'>
                        <button className='de-add-btn'>
                            <div className='plus-icon'>
                            <i className="fa-solid fa-plus"></i>
                            </div>
                            <p>Them thiet bi</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Device;
