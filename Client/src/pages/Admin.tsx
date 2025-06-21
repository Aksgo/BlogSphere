import { useNavigate } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";

const Admin = ()=>{

    const navigate = useNavigate();

     return (
    <div className="min-h-screen bg-[#0b0b0d] text-white">
      <header className="bg-gradient-to-r from-orange-800 to-amber-900 px-8 py-6 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-semibold">Hi, </h1>
        <button
          onClick={() => navigate("/add")}
          className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-xl shadow-md transition"
        >
            <span className="flex flex-row align-middle items-center gap-3 text-xl"><MdOutlinePostAdd/>New Post</span>
        </button>
      </header>

     
    </div>
  );
};
export default Admin;