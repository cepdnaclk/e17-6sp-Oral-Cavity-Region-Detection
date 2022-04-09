import {Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
// import {getUser} from './components/Userinfo'

// Styles
// import {GlobalStyle} from './GlobalStyle';

// Components
import Login from './components/Login'
import Signup from './components/Signup'
import Collections from './components/Collections'
import AdminPortal from './components/AdminPortal'
import Unauthorized from './components/Unauthorized'
import Layout from './components/Layout'
import Upload from './components/Upload'
import Segment from './components/Segment'
import Tool from './components/Tool'

const ROLES ={
  "Admin": 1,
  "Researcher": 2,
  "User": 3
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
          {/* public routes */}
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="user/login" element={<Login/>}/>
          <Route exact path="user/signup" element={<Signup/>}/>
          <Route exact path="unauthorized" element={<Unauthorized/>}/>        

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
              <Route exact path="user/uploads" element={<Upload/>}/>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route exact path="admin/portal" element={<AdminPortal/>}/>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Researcher]}/>}>
              <Route exact path="researcher/collections" element={<Tool/>}/>
              <Route exact path="researcher/tool" element={<Tool/>}/>
          </Route>
          

          {/* error page comes here*/}
          <Route exact path="*" element={<Unauthorized/>}/>

      </Route>
    </Routes>
  );
}

export default App;