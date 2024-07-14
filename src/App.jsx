import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Admin from "./components/pages/Admin";
import Dashboard from "./components/pages/Dashboard";
import Plan from "./components/pages/Plan";
import Registration from "./components/pages/Registration";
import Members from "./components/pages/Members";
import Trainer from "./components/pages/Trainer";
import UserSignup from "./components/Auth/UserSignup";


function App() {
  return (
   <div className="w-[100vw] h-full overflow-x-hidden">
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/auth/user' element={<UserSignup/>}/>
        <Route path='/dashboard/admin' element={<Admin/>}/>
        <Route path='/dashboard/plan' element={<Plan/>}/>
        <Route path='/dashboard/registration' element={<Registration/>}/>
        <Route path='/dashboard/members' element={<Members/>}/>
        <Route path='/dashboard/trainers' element={<Trainer/>}/>
      </Routes>
   </div>
  );
}

export default App;