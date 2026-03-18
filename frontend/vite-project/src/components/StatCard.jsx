import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function StatCard({ icon, title, value, color, route }) {

    const navigate = useNavigate();

    return (

        <motion.div
            whileHover={{ y: -4 }}
            onClick={() => navigate(route)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-soft border border-slate-100 hover:border-brand-200 transition-all duration-300 cursor-pointer p-6 flex items-center justify-between group"
        >

            {/* Left Content */}

            <div>

                <p className="text-sm font-medium text-slate-500 mb-1">
                    {title}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                    {value}
                </h2>

            </div>

            {/* Icon */}

            <div
                className={`w-14 h-14 flex items-center justify-center rounded-xl bg-slate-50 ${color} text-2xl group-hover:scale-110 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all duration-300`}
            >

                {icon}

            </div>

        </motion.div>

    )

}

export default StatCard;