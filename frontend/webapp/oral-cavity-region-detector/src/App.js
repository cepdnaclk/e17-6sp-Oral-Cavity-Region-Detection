import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Signin from'./Components/signin'
function App() {
  return (
    <div className="App">
    
    <Router>
        <Routes>
          
          <Route  path = "/" element = {<Signin/>}/>
        
        
        </Routes>
              
      </Router>
       
        
     
      
  
    </div>
  );
}

export default App;
