import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Card } from "../store/Card";
import api from "../api";
import { Link } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { Snackbar, Alert } from "@mui/material";

const AdminBlogPage = ()=>{
    const {id} = useParams();
    const [blog, setBlog] = useState<Card|null>(null);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("")
    const [active, setActive] = useState<boolean>(false);
    const [snbOpen, setSnbOpen] = useState<boolean>(false);
    const [snbMessage, setSnbMessage] = useState<string>("");
    const [snbState, setSnbState] = useState<"error"|"success">("error");

    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchBlog = async()=>{
            try{
                const response = await api.get(`/api/blogs/blog/${id}`);
                if(response.data.id == id){
                    setBlog(response.data);
                    setActive(true);
                    setTitle(response.data.title);
                    setContent(response.data.description);
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

    const handleUpdateBlog = async ()=>{
      try{
        const response = await api.put(`/api/blogs/user/update/${id}`,{
          title:title,
          description:content
        });
        setSnbMessage("Blog Post Updated");
        setSnbState("success")
        setSnbOpen(true);
      }catch(e:any){
        setSnbMessage("Something Went Wrong");
        setSnbState("error")
        setSnbOpen(true);
      }
    };
    const handleDeleteBlog = async ()=>{
      try{
        const response = await api.delete(`/api/blogs/user/delete/${id}`);
        navigate("/admin");
      }catch(e:any){
        setSnbMessage("Something Went Wrong");
        setSnbState("error")
        setSnbOpen(true);
      }
    };

    
    if(!blog || !active){
    return (
    <div>
        <Link to="/admin">
        <button className="mt-6 mx-3 bg-orange-700 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
            Back to Dashboard
        </button>
        </Link> 
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    </div>
    );
  }
    return (
         <div className="min-h-screen bg-[#0b0b0d] flex justify-center items-start px-4 py-10 text-white">
              <div className="w-full max-w-5xl bg-[#1a1a1e] p-8 rounded-xl shadow-xl border border-gray-800">
                <h2 className="text-3xl font-semibold text-center mb-6 text-amber-600">
                  Edit
                </h2>
        
                <form className="flex flex-col gap-6">
                        <div className="flex flex-row gap-5">
                          <button
                            type="button"
                            className="flex flex-row max-w-34 items-center gap-2 px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full transition"
                            onClick={()=>{handleUpdateBlog();}}
                            >
                            <span className="text-center">Update</span><RxUpdate/>
                          </button>
                          <button
                            type="button"
                            className="flex flex-row max-w-34 items-center gap-2 px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full transition"
                            onClick={()=>{handleDeleteBlog();}}
                            >
                            <MdDeleteForever/>
                          </button>
                          <button
                            type="button"
                            className="flex flex-row  items-center gap-2 px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full transition"
                            onClick={()=>{navigate("/admin")}}
                            >
                            Back to Dashboard
                          </button>
                        </div>
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Title</label>
                    <input
                      type="text"
                      value={title}
                      placeholder="Enter blog title"
                    onChange={(e)=>setTitle(e.target.value)}
                      className="w-full p-3 rounded bg-[#2b2b30] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                  </div>
        
                  <div>
                    <label className="block mb-2 text-sm text-gray-400">Content</label>
                    <textarea
                      value={content}
                      placeholder="Write your blog content here..."
                      rows={20}
                      onChange={(e)=>setContent(e.target.value)}
                      className="w-full p-3 rounded bg-[#2b2b30] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
                    ></textarea>
                  </div>
                </form>
                <Snackbar
                    open={snbOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnbOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert onClose={() => setSnbOpen(false)} severity={snbState} sx={{ width: "100%" }}>
                    {snbMessage}
                    </Alert>
                </Snackbar>
              </div>
        </div>
    );
};
export default AdminBlogPage