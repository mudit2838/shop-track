import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function StatCard({icon,title,value,color,route}){

const navigate = useNavigate();

return(

<motion.div
whileHover={{scale:1.03}}
whileTap={{scale:0.97}}
onClick={()=>navigate(route)}
className="cursor-pointer bg-white p-6 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
>

<div>

<p className="text-gray-500">
{title}
</p>

<h2 className="text-3xl font-bold">
{value ?? 0}
</h2>

</div>

<div className={`text-3xl ${color}`}>
{icon}
</div>

</motion.div>

);

}

export default StatCard;