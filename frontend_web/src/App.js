//Internal 
import { BrowserRouter,Route,Routes} from 'react-router-dom';

//Styles
import './App.css';

//Pages
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Auth from './Pages/Authentication';
import Doctor from './Pages/Doctor';
import AddDoctor_user from './Pages/AddDoctor_user';
import Profile from './Pages/Profile';
import UpdateDoctor_user from './Pages/UpdateDoctor_user';


import { StateProvider } from "./StateProvider";

import DoctorDashboard from './Pages/Doctor/Dashboard';
import DoctorPatients from './Pages/Doctor/Patients';

import Dummypage from './Pages/dummypage';
import SideDoctor from './Components/SideDoctor';


function App() {
  let initialState = {
    adminToken: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "setAdminToken":
        return {
          ...state,
          adminToken: action.payload.adminToken,
        };
        default: return {
          state
        };
      }
  }
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Dashboard/>} />
          <Route path="/auth" element={<Auth />} /> 
          <Route path="/doctor" element={<Doctor />} /> 
          <Route path="/adddoctor/page1" element={<AddDoctor_user />} /> 
          <Route path="/updatedoctor" element={<UpdateDoctor_user />} /> 
          <Route path="/profile" element={<Profile />} />


          {/* Doctor */}
          <Route path="/doctor/home" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />

          <Route path="/dummyloc" element={<Dummypage />} />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
