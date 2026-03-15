import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar({toggleSidebar}){

const navigate = useNavigate();

const [shopName,setShopName] = useState("");

useEffect(()=>{

fetchUser();

},[]);

const fetchUser = async()=>{

try{

const res = await API.get("/auth/me");

setShopName(res.data.shopName);

}catch(err){

console.log(err);

}

};

const handleLogout = ()=>{

localStorage.removeItem("token");

navigate("/");

};

return(

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="flex justify-between items-center bg-white shadow px-6 py-4"
>

{/* Left Section */}

<div className="flex items-center gap-4">

<button
className="md:hidden text-xl"
onClick={toggleSidebar}
>

<FaBars/>

</button>

<h1 className="text-xl font-bold text-gray-700">
Inventory Dashboard
</h1>

</div>


{/* Right Section */}

<div className="flex items-center gap-4">

<div className="flex items-center gap-2 text-gray-600">

<FaUserCircle className="text-2xl"/>

<span className="hidden md:block font-medium">

{shopName || "Shop"}

</span>

</div>

<button
onClick={handleLogout}
className="flex items-center gap-2 text-red-500 hover:text-red-700"
>

<FaSignOutAlt/>

<span className="hidden md:block">
Logout
</span>

</button>

</div>

</motion.div>

);

}

export default Navbar;