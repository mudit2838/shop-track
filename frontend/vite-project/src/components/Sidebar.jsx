import { Link, useLocation, useNavigate } from "react-router-dom";
import {
FaBox,
FaChartBar,
FaShoppingCart,
FaCashRegister,
FaBars,
FaSignOutAlt,
FaWarehouse,
FaMoneyBillWave
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useState } from "react";

function Sidebar(){

const location = useLocation();
const navigate = useNavigate();

const [open,setOpen] = useState(false);

const logout = ()=>{

localStorage.removeItem("token");
navigate("/");

};


const menu = [

{
name:"Dashboard",
path:"/dashboard",
icon:<FaChartBar/>
},

{
name:"Products",
path:"/products",
icon:<FaBox/>
},

{
name:"Purchase",
path:"/purchase",
icon:<FaShoppingCart/>
},

{
name:"Sales",
path:"/sales",
icon:<FaCashRegister/>
},

{
name:"Inventory",
path:"/inventory",
icon:<FaWarehouse/>
},

{
name:"Profit",
path:"/profit",
icon:<FaMoneyBillWave/>
}

];

return(

<>

{/* Mobile Toggle */}

<div className="md:hidden p-4 bg-gray-900 text-white">

<button onClick={()=>setOpen(!open)}>
<FaBars/>
</button>

</div>


{/* Sidebar */}

<motion.div
initial={{x:-200}}
animate={{x:0}}
className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col transition-all ${
open ? "block":"hidden md:flex"
}`}
>

{/* Logo */}

<div className="p-6 text-2xl font-bold border-b border-gray-700">
Stock Manager
</div>


{/* Menu */}

<nav className="flex-1 p-4 space-y-2">

{menu.map((item,index)=>(

<Link
key={index}
to={item.path}
className={`flex items-center gap-3 p-3 rounded-lg transition ${
location.pathname === item.path
? "bg-blue-600"
: "hover:bg-gray-700"
}`}
>

{item.icon}

<span>{item.name}</span>

</Link>

))}

</nav>


{/* Logout Button */}

<div className="p-4 border-t border-gray-700">

<button
onClick={logout}
className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600 transition"
>

<FaSignOutAlt/>

<span>Logout</span>

</button>

</div>

</motion.div>

</>

);

}

export default Sidebar;