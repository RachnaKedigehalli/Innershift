//Internal 
import { BrowserRouter,Route,Routes} from 'react-router-dom';

//Styles
import './App.css';

//Pages
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Auth from './Pages/Authentication';
import Doctor from './Pages/Doctor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Dashboard/>} />
        <Route path="/auth" element={<Auth />} /> 
        <Route path="/doctor" element={<Doctor />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
