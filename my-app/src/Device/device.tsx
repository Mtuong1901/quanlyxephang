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
            
        </>
    );
};

export default Device;
