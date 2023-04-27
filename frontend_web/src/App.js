//Internal 
import { BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';

//Styles
import './App.css';

//Pages
import Dashboard from './Pages/Dashboard';
import Auth from './Pages/Authentication';
import Doctor from './Pages/Admin/Doctor';
import AddDoctor_user from './Pages/Admin/AddDoctor_user';
import DoctorProfile from './Pages/Profile';
import UpdateDoctor_user from './Pages/Admin/UpdateDoctor_user';


import { StateProvider, useStateValue } from "./StateProvider";

import AdminModules from './Pages/Admin/Modules';
import AddModule from './Pages/Admin/AddModule';
import AddQuestions from './Pages/Admin/AddQuestions';

import AdminPatients from './Pages/Admin/Patients';

import DoctorPatients from './Pages/Doctor/Patients';

import Dummypage from './Pages/dummypage';
import ViewPatient from './Pages/Doctor/ViewPatient';
import DoctorChat from './Pages/Doctor/Chat';
import AssignModules from './Pages/Doctor/AssignModules';
import UpdateOrder from './Pages/Doctor/UpdateModuleOrder';


import Tmp from './Tmp';


function PrivateRoute({ children }) {
  const [state,dispatch] = useStateValue(); 
  return state.adminToken ? <>{children}</> : <Navigate to="/auth" />;
}

const Private = ({Component}) => {
  const [state, dispatch] = useStateValue(); 
  return state.adminToken? <>{Component}</> : <Navigate to="/auth"/>
} 

function App() {

  let initialState = {
    adminToken: null,
    role: null,
    firstName:"Dave",
    lastName:"Phillips",
    id:null, 
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
      case "setUserId":
        return{
          ...state,
          id:action.payload.id
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
          <Route path="/" element={<Auth />} /> 
          <Route path="/auth" element={<Auth />} /> 

          
          {/* <Route path="/home" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/doctor" element={<PrivateRoute><Doctor/></PrivateRoute>} /> 
          <Route path="/adddoctor/page1" element={<PrivateRoute><AddDoctor_user /></PrivateRoute>} /> 
          <Route path="/updatedoctor" element={<PrivateRoute><UpdateDoctor_user /></PrivateRoute>} /> 
          <Route path="/profile" element={<PrivateRoute><DoctorProfile /></PrivateRoute>} />

          <Route path="/admin/modules" element={<PrivateRoute><AdminModules /></PrivateRoute>} />
          <Route path="/admin/addmodule" element={<PrivateRoute><AddModule /></PrivateRoute>} />
          <Route path="/admin/addquestions" element={<PrivateRoute><AddQuestions /></PrivateRoute>} />
          

          <Route path="/doctor/patients" element={<PrivateRoute><DoctorPatients /></PrivateRoute>} />
          <Route path="/doctor/viewpatient" element={<PrivateRoute><ViewPatient /></PrivateRoute>} />
          <Route path="/doctor/chat" element={<PrivateRoute><DoctorChat /></PrivateRoute>} />
          <Route path="/doctor/assignmodules" element={<PrivateRoute><AssignModules /></PrivateRoute>} />
          <Route path="/doctor/reorder" element={<PrivateRoute><UpdateOrder /></PrivateRoute>} /> */}
          {/* <Route path="/dummyloc" element={<PrivateRoute><Dummypage /></PrivateRoute>} /> */}

          <Route path="/tmp" element={<Tmp />} />
          <Route path="/dummyloc" element={<Dummypage />}/>

          <Route path="/admin/patients" element={<AdminPatients />}/>

          <Route path="/home" element={<Dashboard/>} />
          <Route path="/auth" element={<Auth />} /> 
          <Route path="/doctor" element={<Doctor />} /> 
          <Route path="/adddoctor/page1" element={<AddDoctor_user />} /> 
          <Route path="/updatedoctor" element={<UpdateDoctor_user />} /> 
          <Route path="/profile" element={<DoctorProfile />} />
          

          <Route path="/admin/modules" element={<AdminModules />} />
          <Route path="/admin/addmodule" element={<AddModule />} />
          <Route path="/admin/addquestions" element={<AddQuestions />} />
          

          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/viewpatient" element={<ViewPatient />} />
          <Route path="/doctor/chat" element={<DoctorChat />} />
          <Route path="/doctor/assignmodules" element={<AssignModules />} />
          <Route path="/doctor/reorder" element={<UpdateOrder />} />
        <Route path="/dummyloc" element={<Dummypage />} />

        </Routes>
      </BrowserRouter>
    </StateProvider>
  );
}

export default App;
