import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

function Navbar({ toggleSidebar }) {

    const navigate = useNavigate();

    const [shopName, setShopName] = useState("");

    useEffect(() => {

        fetchUser();

    }, []);

    const fetchUser = async () => {

        try {

            const res = await API.get("/auth/me");

            setShopName(res.data.shopName);

        } catch (err) {

            console.log(err);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center bg-white shadow-soft px-6 py-4 z-10 sticky top-0"
        >

            {/* Left Section */}

            <div className="flex items-center gap-4">

                <button
                    className="md:hidden text-xl text-slate-500 hover:text-brand-600 transition-colors"
                    onClick={toggleSidebar}
                >

                    <FaBars />

                </button>

                <h1 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">
                    Inventory Dashboard
                </h1>

            </div>


            {/* Right Section */}

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2 text-slate-600">

                    <FaUserCircle className="text-2xl text-brand-500" />

                    <span className="hidden md:block font-medium">

                        {shopName || "Shop"}

                    </span>

                </div>

                <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium"
                >

                    <FaSignOutAlt />

                    <span className="hidden md:block">
                        Logout
                    </span>

                </button>

            </div>

        </motion.div>

    );

}

export default Navbar;