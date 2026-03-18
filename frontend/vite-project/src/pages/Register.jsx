import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {

    const [shopName, setShopName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await API.post("/auth/register", {
                shopName,
                email,
                password
            });

            alert("Shop created successfully");

            navigate("/");

        } catch (err) {

            console.log(err.response?.data);

            alert(err.response?.data?.message || "Registration failed");

        }

    };

    return (

        <div className="flex min-h-screen bg-slate-50 font-sans">
            
            {/* Left Hero Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center p-12 relative overflow-hidden">
                
                {/* Subtle light mesh/gradient */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand-600/30 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="z-10 max-w-lg mx-auto w-full">
                    
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center font-bold text-lg shadow-glow">
                            SM
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Stock<span className="text-brand-400">Manager</span></span>
                    </div>

                    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                        <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                            Control your <span className="text-brand-400">inventory.</span><br/>Scale your business.
                        </h1>
                        <p className="text-slate-300 text-lg mb-10 leading-relaxed font-medium max-w-md">
                            A powerful, intuitive operating system for modern retail and warehouse management. Track stock, analyze profit, and manage multi-shop operations with absolute precision.
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-600"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-brand-500 flex justify-center items-center text-xs font-bold">+2k</div>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">Trusted by modern shop owners</p>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                
                <div className="absolute top-8 right-8 lg:hidden">
                    <span className="font-bold text-xl text-slate-800 tracking-tight">Stock<span className="text-brand-600">Manager</span></span>
                </div>

                <div className="w-full max-w-md">
                    
                    <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}}>
                        
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                            <p className="text-slate-500">Initialize your new shop node in the platform.</p>
                        </div>

                        <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-soft border border-slate-100">

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Shop Name</label>
                                    <input
                                        type="text"
                                        placeholder="UNIT_01"
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900"
                                        value={shopName}
                                        onChange={(e) => setShopName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="admin@shop.local"
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-2">
                                    Create Account
                                </button>
                            </div>

                        </form>

                        <div className="text-center mt-8 text-sm text-slate-500 font-medium">
                            Already have an account?{" "}
                            <Link to="/" className="text-brand-600 hover:text-brand-700 font-bold transition-colors">
                                Sign In
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </div>

        </div>

    );

}

export default Register;