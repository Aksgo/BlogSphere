import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import User from "./pages/User";
const Router = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/user" element={<User/>}/> 
            </Routes>
        </BrowserRouter>
    );
}

export default Router
