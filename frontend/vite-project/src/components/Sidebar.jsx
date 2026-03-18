import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");

    };


    const menu = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaChartBar />
        },

        {
            name: "Products",
            path: "/products",
            icon: <FaBox />
        },

        {
            name: "Purchase",
            path: "/purchase",
            icon: <FaShoppingCart />
        },

        {
            name: "Sales",
            path: "/sales",
            icon: <FaCashRegister />
        },

        {
            name: "Inventory",
            path: "/inventory",
            icon: <FaWarehouse />
        },

        {
            name: "Profit",
            path: "/profit",
            icon: <FaMoneyBillWave />
        }

    ];

    return (

        <>

            {/* Mobile Toggle */}

            <div className="md:hidden p-4 bg-slate-850 text-white flex items-center justify-between">

                <div className="font-bold tracking-tight">Stock Manager</div>
                <button onClick={() => setOpen(!open)} className="text-xl">
                    <FaBars />
                </button>

            </div>


            {/* Sidebar */}

            <motion.div
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className={`fixed md:static top-0 left-0 h-screen w-64 bg-slate-850 text-slate-300 flex flex-col transition-all z-50 shadow-2xl md:shadow-none ${open ? "block" : "hidden md:flex"
                    }`}
            >

                {/* Logo */}

                <div className="p-6 text-2xl font-bold border-b border-slate-700/50 text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-sm">
                        sm
                    </div>
                    Stock Manager
                </div>


                {/* Menu */}

                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">

                    {menu.map((item, index) => (

                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${location.pathname === item.path
                                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                                    : "hover:bg-slate-800 hover:text-white"
                                }`}
                        >

                            <span className="text-lg opacity-90">{item.icon}</span>

                            <span>{item.name}</span>

                        </Link>

                    ))}

                </nav>


                {/* Logout Button */}

                <div className="p-4 border-t border-slate-700/50">

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors font-medium"
                    >

                        <FaSignOutAlt className="text-lg opacity-90" />

                        <span>Logout</span>

                    </button>

                </div>

            </motion.div>

        </>

    );

}

export default Sidebar;