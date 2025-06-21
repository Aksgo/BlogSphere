import type { Card } from "../store/Card";
import { MdOutlineArticle } from "react-icons/md";
import { MdReadMore } from "react-icons/md";
import { useNavigate } from "react-router-dom";


interface Props {
  blog: Card;
}

const BlogCard = ({ blog }: Props) => {
    const navigate = useNavigate();
    const handleBlog = async ()=>{
        navigate(`blogs/blog/${blog.id}`, {state:{blog}});
    };
    return (
        <div className="bg-gray-300 shadow-md 
        rounded-2xl p-6 flex items-start 
        gap-4 hover:shadow-xl transition-all cursor-pointer
        duration-300 hover:bg-gray-200"
        onClick={()=>handleBlog()}>
            {/* made by Aksgo */}
        <div className="text-amber-800 text-4xl mt-1">
            <MdOutlineArticle />
        </div>

        <div className="flex-grow overflow-x-hidden break-words">
            <h2 className="text-xl font-semibold text-gray-800 mb-1 w-full ">{blog.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{blog.description}</p>
            <div className="text-sm bottom-0 text-amber-800 hover:text-amber-600 font-medium flex align-middle gap-1">
            Continue Reading<MdReadMore className="text-2xl" />
            </div>
        </div>
        </div>
    );
};

export default BlogCard;
