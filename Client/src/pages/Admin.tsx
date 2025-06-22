import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";
import type { Card } from "../store/Card";
import api from "../api";
import { Snackbar } from "@mui/material";
import {Alert} from "@mui/material";
import { SlLogout } from "react-icons/sl";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";


const Admin = ()=>{

   
    const navigate = useNavigate();
    const [userBlogs, setUserBlogs] = useState<Card[]|null>(null);
    const [admin, setAdmin] = useState<string|null>(null);
    const [snbOpen, setSnbOpen] = useState<boolean>(false);
    const [snbMessage, setSnbMessage] = useState<string>("");

    useEffect(()=>{
        const checkUser = async ()=>{
            try{
                const response = await api.get("/api/account/profile");
                if(response.status!=200){
                  navigate("/");
                }else{
                  setAdmin(response.data.email);
                }
            }catch(e:any){
                  navigate("/");
            }
        };
        checkUser();
    },[]);
    useEffect(()=>{
      const fetchUserBlogs = async ()=>{
        try{
          const response = await api.get("/api/blogs/user/list");
          setUserBlogs(response.data);
        }catch(e:any){
          setUserBlogs(null);
        }
      };
      fetchUserBlogs();
    },[]);


    const logoutUser  = async ()=>{
      if(admin!=null){
        try{
          await api.post("/api/account/logout");
          navigate("/");
        }catch(e){
          setSnbMessage("Something Went Wrong");
          setSnbOpen(true);
        }
      }
    };

     return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <header className="bg-gradient-to-r from-orange-800 to-amber-900 px-8 py-6 flex justify-between items-center shadow-md">
        <h4 className="text-3xl font-semibold">{(admin!=null)?(`Hi ${admin}`):("User Loading")} </h4>
        <div className="flex flex-row gap-4 flex-wrap mx-5">
          <button
            onClick={() => navigate("/create-new-post")}
            className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-xl shadow-md transition"
          >
              <span className="flex flex-row align-middle items-center gap-3 text-md"><MdOutlinePostAdd/>New</span>
          </button>
           <button
            onClick={() =>{navigate("/")}}
            className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-xl shadow-md transition"
          >
              <span className="flex flex-row align-middle items-center gap-3 text-md"><MdHomeFilled/></span>
          </button>
          <button
            onClick={() =>{logoutUser()}}
            className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-xl shadow-md transition"
          >
              <span className="flex flex-row align-middle items-center gap-3 text-md"><SlLogout/></span>
          </button>
        </div>
      </header>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(userBlogs && userBlogs.length>0)?(userBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={{ ...blog, description:blog.description.slice(0, 250) + "..." }} isAdmin={true}/>
        ))):(<span>No Blogs to show ...</span>)}
      </main>
      <Snackbar
          open={snbOpen}
          autoHideDuration={3000}
          onClose={() => setSnbOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
          <Alert onClose={() => setSnbOpen(false)} severity={"error"} sx={{ width: "100%" }}>
          {snbMessage}
          </Alert>
      </Snackbar>
    </div>
  );
};
export default Admin;