import { useEffect, useState } from "react";
import API from "../services/api";

function LowStock() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchLowStock();
    }, []);

    const fetchLowStock = async () => {
        try {
            const res = await API.get("/dashboard/low-stock");
            
            // Group inventory product-wise
            const grouped = {};
            (res.data || []).forEach(item => {
                const name = item.productId?.productName || "Unknown Product";
                if (!grouped[name]) {
                    grouped[name] = {
                        _id: item._id, // unique key for React
                        productName: name,
                        stock: 0
                    };
                }
                grouped[name].stock += item.stock;
            });

            // Convert to Array and doubly verify stock is actually low
            const lowStockProducts = Object.values(grouped).filter(p => p.stock < 5);
            setItems(lowStockProducts);
            
        } catch (error) {
            console.error("Failed to fetch low stock:", error);
        }
    };

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">

            <h2 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Low Stock Alerts
            </h2>

            {items.length === 0 ? (

                <p className="text-slate-400 font-medium">
                    Inventory levels optimal.
                </p>

            ) : (

                <ul className="space-y-4">

                    {items.map((item) => (
                        <li key={item._id} className="flex justify-between items-center group">

                            <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                                {item.productName}
                            </span>

                            <span className="text-red-600 bg-red-50 font-bold px-2 py-0.5 rounded-md text-sm">
                                {item.stock} left
                            </span>

                        </li>
                    ))}

                </ul>

            )}

        </div>

    )

}

export default LowStock;