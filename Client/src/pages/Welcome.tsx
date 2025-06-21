import { useEffect, useState } from "react";
import api from "../api";
import BlogCard from "../components/BlogCard";
import type { Card } from "../store/Card";
const Welcome = () => {
  
  const [blogData, setBlogData] = useState<Card[]|null>(null);
  useEffect(()=>{
    try{
      const fetchBlogs = async()=>{
        const response = await api.get("/api/blogs/list");
        const data = response.data;
        setBlogData(data);
      };
      fetchBlogs();
    }catch(e:any){
      if(e.response){
        if(e.response.status==404){
          console.log("NOT FOUND");
        }
      }
    }
  }, []);
  return (
    <>
      <header className="h-[50vh] bg-gradient-to-r from-orange-800 to-amber-900 text-white shadow-lg relative flex flex-col justify-center px-10 overflow-hidden">
        <div className="absolute right-[-120px] bottom-[-160px] w-[700px] h-[700px] opacity-20 z-0 animate-spin-slow">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
            alt="Earth"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className="absolute top-4 right-6 z-10">
          <button className="bg-yellow-800 text-gray-100 px-4 py-2 rounded-lg shadow hover:bg-yellow-700 transition mx-3"
          onClick={()=>{}}>
            Login
          </button>
          <button className="bg-amber-700 text-gray-100 px-4 py-2 rounded-lg shadow hover:bg-amber-900 transition"
          onClick = {()=>{}} >
            Register
          </button>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to E-CELL BlogSphere</h1>
          <p className="mt-4 text-lg md:text-2xl font-light max-w-2xl">
            Share your stories, connect with global minds, and build a world of ideas—one blog at a time.
          </p>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(blogData && blogData.length>0)?(blogData.map((blog) => (
          <BlogCard key={blog.id} blog={{ ...blog, description:blog.description.slice(0, 250) + "..." }}/>
        ))):(<span>NULL</span>)}
      </main>
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 60s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default Welcome;
