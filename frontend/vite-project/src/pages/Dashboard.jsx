import { useEffect, useState } from "react";
import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

import TopProducts from "../components/TopProducts";
import LowStock from "../components/LowStocks";

import {
FaStore,
FaBoxOpen,
FaWarehouse,
FaShoppingCart
} from "react-icons/fa";

function Dashboard(){

const [stats,setStats] = useState({});

useEffect(()=>{
fetchStats();
},[]);

const fetchStats = async()=>{

try{

const res = await API.get("/dashboard");

setStats(res.data);

}catch(err){

console.error(err);

}

};

return(

<DashboardLayout>

{/* Header */}

<div className="mb-6">

<h1 className="text-3xl font-bold">
Welcome To Dashboard
</h1>

<p className="text-gray-500">
Inventory analytics overview
</p>

</div>


{/* Stats Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

<StatCard
icon={<FaStore/>}
title="Shops"
value={stats.totalShops}
color="text-blue-500"
route="/shops"
/>

<StatCard
icon={<FaBoxOpen/>}
title="Products"
value={stats.totalProducts}
color="text-green-500"
route="/products"
/>

<StatCard
icon={<FaWarehouse/>}
title="Stock"
value={stats.totalStock}
color="text-purple-500"
route="/inventory"
/>

<StatCard
icon={<FaShoppingCart/>}
title="Sales"
value={stats.totalSales}
color="text-red-500"
route="/sales"
/>

</div>


{/* Business Insights */}

<div className="grid md:grid-cols-2 gap-6">

<TopProducts/>

<LowStock/>

</div>

</DashboardLayout>

)

}

export default Dashboard;