import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBlog from "./components/CreateBlog";
import NotFound from "./pages/NotFound";
import AdminBlogPage from "./pages/AdminBlogPage";
const Router = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/admin" element={<Admin/>}/> 
                <Route path="/blogs/blog/:id" element={<BlogPage/>}/> 
                <Route path="/user/blog/:id" element={<AdminBlogPage/>}/> 
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/create-new-post" element={<CreateBlog/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router
