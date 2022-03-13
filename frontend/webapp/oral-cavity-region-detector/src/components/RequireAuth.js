import {useLocation, Navigate, Outlet} from 'react-router-dom'

const RequireAuth = ({allowedRoles}) => {

    const location = useLocation();

    const info = JSON.parse(sessionStorage.getItem("info"))
    const roles = info? info["roles"]: []
    const user = info? info["username"]: null
    
    return(
    roles?.find(role => allowedRoles.includes(role))
        ?<Outlet/>
        :user
        ?<Navigate to='/unauthorized' state={{from: location}} replace/>
        :<Navigate to='/' state={{from: location}} replace/> 
  )
}

export default RequireAuth