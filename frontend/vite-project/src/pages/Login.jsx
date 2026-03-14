import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);
const [error,setError] = useState("");

const navigate = useNavigate();

const handleLogin = async(e)=>{

e.preventDefault();

setLoading(true);
setError("");

try{

const res = await API.post("/auth/login",{email,password});

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

}
catch(err){

setError("Invalid email or password");

}

setLoading(false);

};

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

<motion.form
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
onSubmit={handleLogin}
className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md"
>

<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
Login
</h2>

{/* Error message */}

{error && (
<p className="text-red-500 text-center mb-4">
{error}
</p>
)}

{/* Email */}

<div className="flex items-center border rounded-lg p-3 mb-4">

<FaEnvelope className="text-gray-500 mr-3"/>

<input
type="email"
placeholder="Email"
className="w-full outline-none"
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>

{/* Password */}

<div className="flex items-center border rounded-lg p-3 mb-6">

<FaLock className="text-gray-500 mr-3"/>

<input
type="password"
placeholder="Password"
className="w-full outline-none"
onChange={(e)=>setPassword(e.target.value)}
required
/>

</div>

{/* Button */}

<button
disabled={loading}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
>

{loading ? "Logging in..." : "Login"}

</button>

<p className="text-center text-gray-500 mt-4 text-sm">
Inventory Management System
</p>

</motion.form>

</div>

);

}

export default Login;