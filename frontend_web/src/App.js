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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Dashboard/>} />
        <Route path="/auth" element={<Auth />} /> 
        <Route path="/doctor" element={<Doctor />} /> 
        <Route path="/adddoctor/page1" element={<AddDoctor_user />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
