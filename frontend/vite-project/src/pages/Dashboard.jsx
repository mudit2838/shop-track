import { useEffect, useState } from "react";
import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

import TopProducts from "../components/TopProducts";
import LowStock from "../components/LowStocks";

import {
FaBoxOpen,
FaWarehouse,
FaShoppingCart,
FaMoneyBillWave,
FaArrowUp,
FaArrowDown
} from "react-icons/fa";

function Dashboard(){

const [stats,setStats] = useState({});
const [profit,setProfit] = useState(0);

useEffect(()=>{
fetchStats();
fetchProfit();
},[]);


// Dashboard stats
const fetchStats = async()=>{
try{
const res = await API.get("/dashboard");
setStats(res.data);
}catch(err){
console.error(err);
}
};


// Profit analytics
const fetchProfit = async()=>{
try{
const res = await API.get("/profit");
setProfit(res.data.totalProfit);
}catch(err){
console.error(err);
}
};

return(

<DashboardLayout>

{/* Header */}

<div className="flex items-center justify-between mb-8">

<div>

<h1 className="text-3xl font-bold text-gray-800">
Business Dashboard
</h1>

<p className="text-gray-500 mt-1">
Monitor inventory, sales and profit performance
</p>

</div>

<div className="text-sm text-gray-400">
{new Date().toLocaleDateString()}
</div>

</div>


{/* KPI Cards */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

<StatCard
icon={<FaBoxOpen/>}
title="Products"
value={stats.totalProducts || 0}
color="text-green-500"
route="/products"
/>

<StatCard
icon={<FaWarehouse/>}
title="Total Stock"
value={stats.totalStock || 0}
color="text-purple-500"
route="/inventory"
/>

<StatCard
icon={<FaShoppingCart/>}
title="Total Sales"
value={stats.totalSales || 0}
color="text-blue-500"
route="/sales"
/>

<StatCard
icon={<FaMoneyBillWave/>}
title="Total Profit"
value={`₹${profit || 0}`}
color="text-emerald-500"
route="/profit"
/>

</div>


{/* Quick Business Insights */}

<div className="grid lg:grid-cols-3 gap-8 mb-8">


{/* Inventory Summary */}

<div className="bg-white shadow-sm rounded-xl p-6">

<h2 className="font-semibold text-lg mb-4">
Inventory Summary
</h2>

<div className="space-y-4">

<div className="flex justify-between">
<span className="text-gray-500">Total Products</span>
<span className="font-semibold">{stats.totalProducts || 0}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Available Stock</span>
<span className="font-semibold">{stats.totalStock || 0}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Total Sales</span>
<span className="font-semibold">{stats.totalSales || 0}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Total Profit</span>
<span className="font-semibold text-green-600">
₹{profit || 0}
</span>
</div>

</div>

</div>


{/* Low Stock Alerts */}

<div className="bg-white shadow-sm rounded-xl p-6">

<h2 className="font-semibold text-lg mb-4">
Low Stock Alerts
</h2>

<LowStock/>

</div>


{/* Top Products */}

<div className="bg-white shadow-sm rounded-xl p-6">

<h2 className="font-semibold text-lg mb-4">
Top Selling Products
</h2>

<TopProducts/>

</div>

</div>


{/* Business Performance Panel */}

<div className="bg-white rounded-xl shadow-sm p-6">

<h2 className="text-lg font-semibold mb-4">
Business Performance
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

<div>
<p className="text-gray-500 text-sm">Products</p>
<p className="text-2xl font-bold">{stats.totalProducts || 0}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Stock Units</p>
<p className="text-2xl font-bold">{stats.totalStock || 0}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Sales</p>
<p className="text-2xl font-bold">{stats.totalSales || 0}</p>
</div>

<div>
<p className="text-gray-500 text-sm">Profit</p>
<p className="text-2xl font-bold text-green-600">
₹{profit || 0}
</p>
</div>

</div>

</div>

</DashboardLayout>

)

}

export default Dashboard;