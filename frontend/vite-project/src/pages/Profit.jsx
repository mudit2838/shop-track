import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaChartLine, FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaPiggyBank } from "react-icons/fa";

function Profit() {

    const [data, setData] = useState({
        dailyProfit: 0,
        weeklyProfit: 0,
        monthlyProfit: 0,
        totalProfit: 0
    });

    useEffect(() => {
        fetchProfit();
    }, []);

    const fetchProfit = async () => {
        try {
            const res = await API.get("/profit");
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Animation variations
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemAnim = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    const profitCards = [
        {
            title: "Today's Profit",
            value: data.dailyProfit,
            icon: <FaCalendarDay className="text-xl" />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-100"
        },
        {
            title: "Weekly Profit",
            value: data.weeklyProfit,
            icon: <FaCalendarWeek className="text-xl" />,
            color: "text-brand-500",
            bg: "bg-brand-50",
            border: "border-brand-100"
        },
        {
            title: "Monthly Profit",
            value: data.monthlyProfit,
            icon: <FaCalendarAlt className="text-xl" />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            border: "border-purple-100"
        },
        {
            title: "Total Profit",
            value: data.totalProfit,
            icon: <FaPiggyBank className="text-xl" />,
            color: "text-rose-500",
            bg: "bg-rose-50",
            border: "border-rose-100"
        }
    ];

    return (

        <DashboardLayout>

            <motion.div variants={container} initial="hidden" animate="show">

                <motion.div variants={itemAnim} className="mb-10 pb-4 border-b border-slate-200/60">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <FaChartLine className="text-brand-600" /> Revenue Analytics
                    </h1>
                    <p className="text-slate-500 mt-1.5 font-medium">
                        Track your business performance and profit margins over time.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {profitCards.map((card, index) => (
                        <motion.div 
                            key={index}
                            variants={itemAnim} 
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`bg-white shadow-sm hover:shadow-md border ${card.border} rounded-2xl p-6 relative overflow-hidden transition-all`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <p className="text-slate-500 font-semibold tracking-wide text-sm uppercase">
                                    {card.title}
                                </p>
                                <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center shadow-sm`}>
                                    {card.icon}
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-baseline">
                                    <span className="text-2xl text-slate-400 mr-1">$</span>
                                    {Number(card.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </h2>
                            </div>
                            
                            {/* Decorative accent */}
                            <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${card.bg} rounded-full opacity-50 blur-2xl`}></div>
                            
                        </motion.div>
                    ))}

                </div>

            </motion.div>

        </DashboardLayout>

    );

}

export default Profit;