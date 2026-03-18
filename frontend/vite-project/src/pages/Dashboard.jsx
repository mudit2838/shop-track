import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import TopProducts from "../components/TopProducts";
import LowStock from "../components/LowStocks";

import {
    FaStore,
    FaBoxOpen,
    FaWarehouse,
    FaShoppingCart,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";

function Dashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchStats();
    }, []);

    // Dashboard stats
    const fetchStats = async () => {
        try {
            const res = await API.get("/dashboard");
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Staggered animation
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemAnim = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (

        <DashboardLayout>

            <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto">

                {/* Header & Date */}
                <motion.div variants={itemAnim} className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-slate-200">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Inventory Operations
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">
                            Warehouse tracking, stock alerts, and delivery performance.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live tracking active
                    </div>
                </motion.div>

                {/* KPI Metrics */}
                <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={<FaBoxOpen />}
                        title="Total Products"
                        value={stats.totalProducts || 0}
                        color="text-indigo-600"
                        route="/products"
                    />
                    <StatCard
                        icon={<FaWarehouse />}
                        title="Warehouse Stock"
                        value={stats.totalStock || 0}
                        color="text-emerald-600"
                        route="/inventory"
                    />
                    <StatCard
                        icon={<FaShoppingCart />}
                        title="Orders Delivered"
                        value={stats.totalSales || 0}
                        color="text-sky-600"
                        route="/sales"
                    />
                    <StatCard
                        icon={<FaStore />}
                        title="Active Shops"
                        value={stats.totalShops || Object.keys(stats).length > 0 ? 1 : 0} // Fallback if backend drops totalShops
                        color="text-purple-600"
                        route="/shops"
                    />
                </motion.div>


                {/* Quick Actions Panel */}
                <motion.div variants={itemAnim} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a href="/purchase" className="flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors">
                            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg"><FaArrowDown /></span>
                            Inbound Restock
                        </a>
                        <a href="/sales" className="flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors">
                            <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg"><FaArrowUp /></span>
                            Outbound Delivery
                        </a>
                        <a href="/products" className="flex items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold py-3 px-4 rounded-xl border border-slate-200 transition-colors">
                            <span className="bg-purple-100 text-purple-600 p-2 rounded-lg"><FaBoxOpen /></span>
                            Add New Product
                        </a>
                    </div>
                </motion.div>


                {/* Tracking & Insights Grid */}
                <motion.div variants={itemAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Primary Widget: Urgent Stock Tracking (Takes 2 columns on wide screens) */}
                    <div className="lg:col-span-2">
                        <LowStock />
                    </div>
                    
                    {/* Secondary Widget: Top Movers */}
                    <div className="lg:col-span-1">
                        <TopProducts />
                    </div>

                </motion.div>

            </motion.div>

        </DashboardLayout>

    )

}

export default Dashboard;