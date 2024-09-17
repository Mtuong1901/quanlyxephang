import './App.css';
import Dashboard from './Dashboard/dashboard';
import LeftNav from './Navbar/left/leftnav';
import RightNav from './Navbar/right/rightnav';
import './Navbar/left/left.css';
function App() {
  return (
    <div className='app-container'>
      <div className='left-navbar'>
        <LeftNav/>
      </div>
      <div className='main'>
        <Dashboard/>
      </div>
      <div className='right-navbar'>
        <RightNav />
      </div>
    </div>
  );
}

export default App;
