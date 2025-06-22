import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Snackbar, Alert} from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CreateBlog = ()=>{
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [snbOpen, setSnbOpen] = useState<boolean>(false);
    const [snbMessage, setSnbMessage] = useState<string>("");

    const navigate = useNavigate();

    useEffect(()=>{
        const checkUser = async ()=>{
            try{
                const response = await api.get("/api/account/profile");
                if(response.status!=200){
                    navigate("/");
                }
            }catch(e:any){
                    navigate("/");
            }
        };
        checkUser();
    },[]);

    const handleNewBlog = async ()=>{
        try{
            const response = await api.post("/api/blogs/user/create", {
                title:title,
                description : content
            });
            navigate("/admin");

        }catch(e:any){
            setSnbMessage("Something went wrong")
            setSnbOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b0b0d] flex justify-center items-start px-4 py-10 text-white">
      <div className="w-full max-w-5xl bg-[#1a1a1e] p-8 rounded-xl shadow-xl border border-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-6 text-amber-600">
          Create New Blog
        </h2>

        <form className="flex flex-col gap-6">
                <button
                type="button"
                className="flex flex-row max-w-34 items-center gap-4 px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-full transition"
                onClick={()=>{handleNewBlog();}}
                >
                <span className="text-center">Publish</span><FaFileUpload/>
                          </button>
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
      </div>
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

export default CreateBlog;