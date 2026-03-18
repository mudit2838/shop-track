import { useEffect, useState } from "react";
import API from "../services/api";
import { FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import DashboardLayout from "../layouts/DashboardLayout";

function Products() {

    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [search]);

    const fetchProducts = async () => {
        const res = await API.get(`/products?search=${search}`);
        setProducts(res.data);
    };

    const addProduct = async () => {

        if (!productName || !category) {
            alert("Please fill all fields");
            return;
        }

        await API.post("/products", {
            productName,
            category
        });

        fetchProducts();
        setProductName("");
        setCategory("");

    };

    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await API.delete(`/products/${id}`);
            fetchProducts();
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

                <motion.div variants={itemAnim} className="mb-10 pb-4 border-b border-slate-200/60">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Product Catalog
                    </h1>
                    <p className="text-slate-500 mt-1.5 font-medium">
                        Manage your inventory items and categories.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Add Product Form */}
                    <motion.div variants={itemAnim} className="lg:col-span-1">
                        <div className="bg-white shadow-soft border border-slate-100 rounded-2xl p-6 relative overflow-hidden">
                            
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-500"></div>

                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <FaPlus className="text-brand-500" /> Add New Item
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name</label>
                                    <input 
                                        placeholder="e.g. Wireless Mouse" 
                                        onChange={(e) => setProductName(e.target.value)} 
                                        value={productName} 
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900" 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                                    <input 
                                        placeholder="Electronics" 
                                        onChange={(e) => setCategory(e.target.value)} 
                                        value={category} 
                                        className="w-full border border-slate-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900" 
                                    />
                                </div>

                                <button 
                                    onClick={addProduct}
                                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-4 flex justify-center items-center gap-2"
                                >
                                    <FaPlus /> Save Product
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product List */}
                    <motion.div variants={itemAnim} className="lg:col-span-2">
                        
                        <div className="bg-white shadow-soft border border-slate-100 rounded-2xl overflow-hidden flex flex-col h-full">

                            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Total Items ({products.length})
                                </h2>

                                <div className="relative">
                                    <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        placeholder="Search products..."
                                        className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all w-full sm:w-64 text-sm bg-white"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {products.map(p => (
                                        <div key={p._id} className="bg-white border border-slate-100 hover:border-brand-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group relative">
                                            
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-slate-800 text-lg tracking-tight">{p.productName}</h3>
                                                    <p className="text-sm font-medium text-slate-500 mt-0.5">{p.category}</p>
                                                </div>
                                                <button
                                                    onClick={() => deleteProduct(p._id)}
                                                    className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                                                    title="Delete Product"
                                                >
                                                    <FaTrash className="text-sm" />
                                                </button>
                                            </div>

                                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100/60">
                                                <span className="bg-brand-50 text-brand-700 text-xs font-bold px-2.5 py-1 rounded-md">
                                                    ID: {p._id.slice(-6)}
                                                </span>
                                            </div>
                                            
                                        </div>
                                    ))}
                                    
                                    {products.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-400 font-medium">
                                            No products found. Start by adding one.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </motion.div>

                </div>

            </motion.div>

        </DashboardLayout>

    );

}

export default Products;