import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert} from "@mui/material";

const RegisterPage = ()=>{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [snbOpen, setSnbOpen] = useState<boolean>(false);
    const [snbMessage, setSnbMessage] = useState<string>("");

    const navigate = useNavigate();
    const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    };
    useEffect(()=>{
            const checkUser = async ()=>{
                try{
                    const response = await api.get("/api/account/profile");
                    navigate("/");
                }catch(e:any){
                    //nothing to perform just register
                }
            };
    },[]);

    const RegisterUser = async ()=>{
        if(email.trim()=="" || password.trim()==""){
            setSnbOpen(true);
            setSnbMessage("Fields Cannot be Empty");
            return;
        }    
        if(!isValidEmail(email)){
            setSnbOpen(true);
            setSnbMessage("Please enter valid email address");
            return;
        }
        try{
            const response = await api.post("/api/account/register",{
                email : email,
                password : password
            });
            navigate("/");
        }catch(e:any){
            if(e.response && e.response.status===409){
                setSnbOpen(true);
                setSnbMessage("Email Already Exist");
            }else{
                setSnbOpen(true);
                setSnbMessage("Something Went Wrong");
            }
        }
    };

    return (
        <div className="login-container rubik-f1 min-h-screen flex items-center justify-center bg-[#0b0b0d] px-4">
            <div className="w-full max-w-md bg-[#1a1a1e] p-8 rounded-xl shadow-xl border border-gray-800">
                <h2 className="mb-6 text-3xl font-semibold text-center text-white">
                    Create Account
                </h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col text-left">
                        <label className="mb-1 text-sm text-gray-400">Email</label>
                        <input
                            type="email"
                            className="bg-[#2b2b30] text-white p-2 rounded outline-none focus:ring-2 focus:ring-[#24740a]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col text-left">
                        <label className="mb-1 text-sm text-gray-400">Password</label>
                        <input
                        type="password"
                        className="bg-[#2b2b30] text-white p-2 rounded outline-none focus:ring-2 focus:ring-[#24740a]" value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={RegisterUser}
                        className="bg-[#24740a] hover:bg-[#219606] text-gray-200 font-semibold py-2 rounded-3xl mt-2 w-1/2 m-auto"
                    >
                        Sign Up
                    </button>
                    <Snackbar
                        open={snbOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnbOpen(false)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={() => setSnbOpen(false)} severity={"error"} sx={{ width: "100%" }}>
                        {snbMessage}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </div>
    );
};
export default RegisterPage