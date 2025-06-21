import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Card } from "../store/Card";
import api from "../api";
import { Link } from "react-router-dom";
const BlogPage = ()=>{
    const {id} = useParams();
    const [blog, setBlog] = useState<Card|null>(null);
    const [active, setActive] = useState<boolean>(false);
    useEffect(()=>{
        const fetchBlog = async()=>{
            try{
                const response = await api.get(`/api/blogs/blog/${id}`);
                console.log(response.data);
                if(response.data.id == id){
                    setBlog(response.data);
                    setActive(true);
                }
            }catch(e:any){
                if(e.response){
                    if(e.response.status==404){
                    console.log("NOT FOUND");
                    }
                    else{
                        console.log("Something Went Wrong");
                    }
                }
            }
        };
        fetchBlog();

    }, [id]);
    console.log(active)
    if(!blog || !active){
    return (
    <div>
        <Link to="/">
        <button className="mt-6 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            Back to Home
        </button>
        </Link> 
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    </div>
    );
  }
    return (
        
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-800">
       
      <header className="bg-gradient-to-r from-orange-800 to-amber-900 text-white p-10 relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">{blog.title}</h1>
          <p className="mt-2 text-lg font-light">
            A glimpse...
          </p>
        </div>
        <Link to="/">
        <button className="mt-6 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            Back to Home
        </button>
        </Link>
        <div className="absolute right-[-100px] bottom-[-100px] w-[300px] h-[300px] opacity-10 z-0 animate-spin-slow">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
            alt="Earth"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </header>
    <div className="flex mx-5">
      <main className="mx-auto max-w-4xl text-justify px-6 py-10 bg-white rounded-xl shadow-md mt-[-20px] relative z-10 break-words overflow-x-hidden">
        <div className="prose prose-lg max-w-none text-gray-800">
          <p>{blog.description}</p>
        </div>
      </main>
    </div>
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
    </div>
    );
};
export default BlogPage