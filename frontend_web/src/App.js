//Internal 
import { BrowserRouter,Route,Routes} from 'react-router-dom';

//Styles
import './App.css';

//Pages
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Auth from './Pages/Authentication';
import Doctor from './Pages/Admin/Doctor';
import AddDoctor_user from './Pages/Admin/AddDoctor_user';
import Profile from './Pages/Profile';
import UpdateDoctor_user from './Pages/Admin/UpdateDoctor_user';


import { StateProvider } from "./StateProvider";

import AdminModules from './Pages/Admin/Modules';
import AddModule from './Pages/Admin/AddModule';
import AddQuestions from './Pages/Admin/AddQuestions';

import DoctorPatients from './Pages/Doctor/Patients';

import Dummypage from './Pages/dummypage';
import ViewPatient from './Pages/Doctor/ViewPatient';
import DoctorProfile from './Pages/Doctor/Profile';


function App() {
  let initialState = {
    adminToken: null,
    role: null,
    firstName:"Dave",
    lastName:"Phillips"
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "setAdminToken":
        return {
          ...state,
          adminToken: action.payload.adminToken,
        };
      case "setRole":
        return{
          ...state,
          role:action.payload.role,
        }
      case "setFirstName":
        return{
          ...state,
          firstName:action.payload.firstName, 
        }
      case "setLastName":
          return{
            ...state,
            lastName:action.payload.lastName, 
          }  

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

          <Route path="/admin/modules" element={<AdminModules />} />
          <Route path="/admin/addmodule" element={<AddModule />} />
          <Route path="/admin/addquestions" element={<AddQuestions />} />
          

          {/* Doctor */}
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/viewpatient" element={<ViewPatient />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />

          <Route path="/dummyloc" element={<Dummypage />} />
        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
