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

import Doctor_Dashboard from './Pages/Doctor/Dashboard';
import Doctor_Patients from './Pages/Doctor/Patients';
import { StateProvider } from "./StateProvider";

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
          <Route path="/doctor/dashboard" element={<Doctor_Dashboard />} />
          <Route path="/doctor/patients" element={<Doctor_Patients />} />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
