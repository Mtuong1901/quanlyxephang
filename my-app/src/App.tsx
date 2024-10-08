import { ReactNode } from 'react';
import { Header } from './component/header';
import LeftNav from './Navbar/left/leftnav';
import RightNav from './Navbar/right/rightnav';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Import các thành phần từ react-router-dom
import Dashboard from './Dashboard/dashboard';
import Login from './Login/login';
import Device from './Device/device';
import { Service } from './Service/service';
import { Update } from './Device/update/update';
import { Add } from './Device/addDevice/add';
import { Detail } from './Device/detail/detail';

// Tạo MainLayout component
const MainLayout = () => {
  return (
    <div className="container flex">
      <div className="left-nav w-[200px] h-screen font-[Nunito]">
        <LeftNav />
      </div>
      <div className="font-[Nunito]">
        <Header />
        <div className="main flex font-[Nunito]">
          <div className="bg-[#F6F6F6] w-[935px] h-screen">
            <div className="mt-[84px]">
              <Outlet />
            </div>
          </div>
          <RightNav />
        </div>
      </div>
    </div>
  );
};
const Sublayout = () => {
  return (
    <div className="container flex">
      <div className="left-nav w-[200px] h-screen font-[Nunito]">
        <LeftNav />
      </div>
      <div className="font-[Nunito]">
        <Header />
        <div className="main flex font-[Nunito]">
          <div className="bg-[#F6F6F6] w-[1335px] h-screen">
            <div className="mt-[84px] ml-[24px]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// App component
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/thietbi" element={<Sublayout />} >
        <Route path="/thietbi" element={<Device/>} />
        <Route path="/thietbi/chitiet/:id" element={<Detail/>} />
        <Route path="/thietbi/capnhat/:id" element={<Update/>} />
        <Route path="/thietbi/themthietbi" element={<Add/>} />
        </Route>
        <Route path="/dichvu" element={<Sublayout />} >
        <Route path="/dichvu" element={<Service/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
