import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Styles
import {GlobalStyle} from './GlobalStyle';

// Components
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import Signup from './components/Signup'
import Collections from './components/Collections'
import AdminPortal from './components/AdminPortal'

const user= false;
const admin = true;

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/adminlogin" element={<AdminLogin/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/collections" element={user?<Collections/>:<Login/>}/>
      <Route exact path="/adminportal" element={admin?<AdminPortal/>:<AdminLogin/>}/>
      </Routes>
      <GlobalStyle/>
    </Router>
  );
}

export default App;
