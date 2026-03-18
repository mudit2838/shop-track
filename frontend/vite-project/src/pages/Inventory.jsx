import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { motion } from "framer-motion";

function Inventory() {

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {

        try {
            const res = await API.get("/inventory");
            setInventory(res.data);
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

    return (

        <DashboardLayout>

            <motion.div variants={container} initial="hidden" animate="show">

                <motion.div variants={itemAnim} className="mb-10 pb-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between sm:items-end">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Warehouse Stock
                        </h1>
                        <p className="text-slate-500 mt-1.5 font-medium">
                            Real-time tracking of inventory levels across products.
                        </p>
                    </div>
                </motion.div>

                <motion.div variants={itemAnim} className="bg-white shadow-soft border border-slate-100 rounded-2xl overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4 border-b border-slate-100">Product</th>
                                    <th className="px-6 py-4 border-b border-slate-100">Category</th>
                                    <th className="px-6 py-4 border-b border-slate-100">Cost Price</th>
                                    <th className="px-6 py-4 border-b border-slate-100">Stock Count</th>
                                    <th className="px-6 py-4 border-b border-slate-100">Total Value</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-slate-100">
                                
                                {inventory.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium tracking-wide">
                                            No inventory items mapped yet.
                                        </td>
                                    </tr>
                                ) : (
                                    inventory.map((item) => (
                                        <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                            
                                            <td className="px-6 py-4 font-bold text-slate-800 tracking-tight">
                                                {item.productName || item.productId?.productName}
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                                    {item.category || item.productId?.category}
                                                </span>
                                            </td>
                                            
                                            <td className="px-6 py-4 font-semibold text-emerald-600 tracking-tight">
                                                ${item.price}
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                                                    {item.stock}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 font-extrabold text-slate-800 tracking-tight">
                                                ${(item.price * item.stock).toFixed(2)}
                                            </td>
                                            
                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>
                    </div>

                </motion.div>

            </motion.div>

        </DashboardLayout>

    );

}

export default Inventory;