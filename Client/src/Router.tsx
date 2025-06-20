import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";

const Router = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/blog/admin" element={<Admin/>}/> 
            </Routes>
        </BrowserRouter>
    );
}

export default Router
