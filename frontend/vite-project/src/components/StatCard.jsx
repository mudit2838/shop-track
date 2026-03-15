import { useNavigate } from "react-router-dom";

function StatCard({ icon, title, value, color, route }) {

const navigate = useNavigate();

return (

<div
onClick={()=>navigate(route)}
className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 cursor-pointer p-6 flex items-center justify-between group"
>

{/* Left Content */}

<div>

<p className="text-sm text-gray-500 mb-1">
{title}
</p>

<h2 className="text-2xl font-bold text-gray-800">
{value}
</h2>

</div>


{/* Icon */}

<div
className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 ${color} text-xl group-hover:scale-110 transition`}
>

{icon}

</div>

</div>

)

}

export default StatCard;