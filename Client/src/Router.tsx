import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import User from "./pages/User";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
const Router = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/user" element={<User/>}/> 
                <Route path="/blogs/blog/:id" element={<BlogPage/>}/> 
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router
