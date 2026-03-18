import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaBoxOpen, FaCheckCircle, FaTruckLoading } from "react-icons/fa";

function Purchase() {

    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState({ type: "", message: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await API.get("/products");
        setProducts(res.data);
    };

    const addPurchase = async () => {

        if (!productId || !quantity || !price) {
            setStatus({ type: "error", message: "Please fill all fields" });
            return;
        }

        try {
            await API.post("/purchase", { productId, quantity, price });
            setStatus({ type: "success", message: "Purchase recorded successfully!" });
            setProductId("");
            setQuantity("");
            setPrice("");
            
            // clear success message after 3 seconds
            setTimeout(() => setStatus({ type: "", message: "" }), 3000);
        } catch (error) {
            setStatus({ type: "error", message: "Failed to record purchase." });
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

            <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto">

                <motion.div variants={itemAnim} className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <FaBoxOpen className="text-emerald-600" /> Record Purchase
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Log incoming shipments and update warehouse stock.
                    </p>
                </motion.div>

                <motion.div variants={itemAnim} className="bg-white shadow-soft border border-slate-100 rounded-2xl p-8 relative overflow-hidden">
                    
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500"></div>

                    {status.message && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 font-semibold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {status.type === 'success' ? <FaCheckCircle /> : null}
                            {status.message}
                        </div>
                    )}

                    <div className="space-y-6">

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Product</label>
                            <select
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 bg-white font-medium appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                            >
                                <option value="" disabled>Choose a product</option>
                                {products.map(product => (
                                    <option key={product._id} value={product._id}>
                                        {product.productName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity Received</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    placeholder="e.g. 100"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Cost Price (per unit)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={price}
                                        placeholder="0.00"
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full border border-slate-200 rounded-xl py-3.5 pl-8 pr-4 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {quantity && price && (
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center mt-2">
                                <span className="text-slate-500 font-medium">Total Purchase Cost:</span>
                                <span className="text-xl font-black text-slate-800 tracking-tight">
                                    ${(Number(quantity) * Number(price)).toFixed(2)}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={addPurchase}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-4 flex justify-center items-center gap-2 text-lg tracking-wide"
                        >
                            <FaTruckLoading /> Confirm Purchase
                        </button>

                    </div>

                </motion.div>

            </motion.div>

        </DashboardLayout>

    );

}

export default Purchase;