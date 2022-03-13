import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {getUser} from './components/Userinfo'

// Styles
import {GlobalStyle} from './GlobalStyle';

// Components
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import Signup from './components/Signup'
import Collections from './components/Collections'
import AdminPortal from './components/AdminPortal'

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/adminlogin" element={<AdminLogin/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/collections" element={getUser()==="user"?<Collections/>:<Login/>}/>
      <Route exact path="/adminportal" element={getUser()==="admin"?<AdminPortal/>:<AdminLogin/>}/>
      </Routes>
      <GlobalStyle/>
    </Router>
  );
}

export default App;
