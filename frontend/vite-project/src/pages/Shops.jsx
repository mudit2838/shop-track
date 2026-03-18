import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaStore, FaPlus, FaTrash, FaMapMarkerAlt } from "react-icons/fa";

function Shops() {

    const [shops, setShops] = useState([]);
    const [shopName, setShopName] = useState("");
    const [address, setAddress] = useState("");

    const fetchShops = async () => {
        try {
            const res = await API.get("/shops");
            setShops(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const createShop = async () => {
        try {
            if (!shopName || !address) {
                alert("Please fill all fields");
                return;
            }

            await API.post("/shops", { shopName, address });
            setShopName("");
            setAddress("");
            fetchShops();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteShop = async (id) => {
        if(window.confirm("Are you sure you want to delete this shop?")) {
            try {
                await API.delete(`/shops/${id}`);
                fetchShops();
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    // Animation variations
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

            <motion.div variants={container} initial="hidden" animate="show">

                <motion.div variants={itemAnim} className="mb-10 pb-4 border-b border-slate-200/60">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <FaStore className="text-brand-600" /> Manage Shops
                    </h1>
                    <p className="text-slate-500 mt-1.5 font-medium">
                        Add and manage retail locations or storefronts.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Add Shop Form */}
                    <motion.div variants={itemAnim} className="lg:col-span-1">
                        <div className="bg-white shadow-soft border border-slate-100 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>
                            
                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <FaPlus className="text-brand-500" /> Add New Shop
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Shop Name</label>
                                    <input
                                        value={shopName}
                                        placeholder="e.g. Downtown Branch"
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium"
                                        onChange={(e) => setShopName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Address</label>
                                    <input
                                        value={address}
                                        placeholder="123 Main St, City"
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 font-medium"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={createShop}
                                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-4 flex justify-center items-center gap-2"
                                >
                                    <FaPlus /> Register Shop
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Shop List */}
                    <motion.div variants={itemAnim} className="lg:col-span-2">
                        
                        <div className="bg-white shadow-soft border border-slate-100 rounded-2xl p-6 h-full min-h-[400px]">
                            
                            <h2 className="text-xl font-bold text-slate-800 mb-6">
                                Registered Locations ({shops.length})
                            </h2>
                            
                            {shops.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                    <FaStore className="text-4xl text-slate-300 mb-3" />
                                    <p className="text-slate-500 font-medium">No shops added yet.</p>
                                    <p className="text-slate-400 text-sm mt-1">Use the form to register your first location.</p>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {shops.map((shop) => (
                                        <div 
                                            key={shop._id}
                                            className="group relative bg-white border border-slate-200 hover:border-brand-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => deleteShop(shop._id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                                    title="Delete Shop"
                                                >
                                                    <FaTrash className="text-sm" />
                                                </button>
                                            </div>

                                            <FaStore className="text-3xl text-brand-100 mb-4" />
                                            
                                            <h3 className="font-bold text-slate-800 text-lg tracking-tight mb-1">
                                                {shop.shopName}
                                            </h3>
                                            
                                            <p className="text-slate-500 text-sm flex items-start gap-1.5 mt-2">
                                                <FaMapMarkerAlt className="mt-0.5 text-brand-400 flex-shrink-0" />
                                                <span className="leading-snug">{shop.address}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                    </motion.div>

                </div>

            </motion.div>

        </DashboardLayout>

    );

}

export default Shops;