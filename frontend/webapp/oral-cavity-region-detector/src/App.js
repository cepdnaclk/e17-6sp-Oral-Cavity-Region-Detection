import {Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
// import {getUser} from './components/Userinfo'

// Styles
// import {GlobalStyle} from './GlobalStyle';

// Components
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import Signup from './components/Signup'
import Collections from './components/Collections'
import AdminPortal from './components/AdminPortal'
import Unauthorized from './components/Unauthorized'
import Layout from './components/Layout'

const ROLES ={
  "Admin": 1,
  'User': 2
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
          {/* public routes */}
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="adminlogin" element={<AdminLogin/>}/>
          <Route exact path="signup" element={<Signup/>}/>
          <Route exact path="unauthorized" element={<Unauthorized/>}/>

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
              <Route exact path="collections" element={<Collections/>}/>
              <Route exact path="login" element={<Login/>}/>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route exact path="adminportal" element={<AdminPortal/>}/>
          </Route>

          {/* error page comes here*/}
          <Route exact path="*" element={<Unauthorized/>}/>

      </Route>
    </Routes>
  );
}

export default App;


// <Router>
    //   <Routes>
    //   <Route exact path="/" element={<Login/>}/>
    //   <Route exact path="/adminlogin" element={<AdminLogin/>}/>
    //   <Route exact path="/signup" element={<Signup/>}/>
    //   <Route exact path="/collections" element={getUser()==="user"?<Collections/>:<Login/>}/>
    //   <Route exact path="/adminportal" element={getUser()==="admin"?<AdminPortal/>:<AdminLogin/>}/>
    //   </Routes>
    //   <GlobalStyle/>
    // </Router>