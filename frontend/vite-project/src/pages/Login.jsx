import {useState} from "react";
import API from "../services/api";
import {useNavigate,Link} from "react-router-dom";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async(e)=>{

e.preventDefault();

try{

const res = await API.post("/auth/login",{email,password});

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

}catch(err){

alert("Invalid login");

}

};

return(

<div className="flex items-center justify-center h-screen bg-gray-100">

<form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-96">

<h2 className="text-2xl font-bold mb-4">Shop Login</h2>

<input
type="email"
placeholder="Email"
className="border p-2 w-full mb-3"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-3"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="bg-blue-600 text-white p-2 w-full rounded">
Login
</button>

<p className="text-sm mt-3 text-center">

New shop?  
<Link to="/register" className="text-blue-600">Create account</Link>

</p>

</form>

</div>

);

}

export default Login;