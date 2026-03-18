import { useEffect, useState } from "react";
import API from "../services/api";

function TopProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/dashboard/top-products");
            setProducts(res.data || []);
        } catch (error) {
            console.error("Failed to fetch top products:", error);
        }
    };

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">

            <h2 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span> Top Selling
            </h2>

            <ul className="space-y-4">

                {products.map((p, index) => (
                    <li key={index} className="flex justify-between items-center group">

                        <span className="font-medium text-slate-700 group-hover:text-brand-600 transition-colors">
                            {p.product?.productName || p.productName || `Product ${String(p._id).substring(0, 6)}`}
                        </span>

                        <span className="font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md text-sm">
                            {p.totalSold}
                        </span>

                    </li>
                ))}

            </ul>

        </div>

    )

}

export default TopProducts;