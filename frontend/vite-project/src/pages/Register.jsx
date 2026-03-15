import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register(){

const [shopName,setShopName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async(e)=>{

e.preventDefault();

try{

await API.post("/auth/register",{
shopName,
email,
password
});

alert("Shop created successfully");

navigate("/");

}catch(err){

console.log(err.response?.data);

alert(err.response?.data?.message || "Registration failed");

}

};

return(

<div className="flex items-center justify-center h-screen bg-gray-100">

<form onSubmit={handleRegister} className="bg-white p-8 rounded shadow w-96">

<h2 className="text-2xl font-bold mb-4">
Create Shop Account
</h2>

{/* SHOP NAME */}

<input
placeholder="Shop Name"
className="border p-2 w-full mb-3"
value={shopName}
onChange={(e)=>setShopName(e.target.value)}
/>

{/* EMAIL */}

<input
type="email"
placeholder="Email"
className="border p-2 w-full mb-3"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

{/* PASSWORD */}

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-3"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="bg-green-600 text-white p-2 w-full rounded">
Create Account
</button>

</form>

</div>

);

}

export default Register;