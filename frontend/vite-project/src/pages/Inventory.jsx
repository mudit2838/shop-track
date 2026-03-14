import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaBoxes } from "react-icons/fa";

function Inventory(){

const [shops,setShops] = useState([]);
const [inventory,setInventory] = useState([]);

useEffect(()=>{
fetchShops();
},[]);

const fetchShops = async()=>{
try{
const res = await API.get("/shops");
setShops(res.data);
}catch(err){
console.error(err);
}
};

const fetchInventory = async(shopId)=>{
try{
const res = await API.get(`/inventory/${shopId}`);
setInventory(res.data);
}catch(err){
console.error(err);
}
};

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="flex-1 p-6 md:p-10">

{/* Page Title */}

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="flex items-center gap-3 mb-6"
>

<FaBoxes className="text-2xl text-blue-600"/>

<h1 className="text-3xl font-bold">
Inventory
</h1>

</motion.div>

{/* Shop Selector */}

<div className="mb-6">

<select
className="border rounded-lg p-3 w-full md:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
onChange={(e)=>fetchInventory(e.target.value)}
>

<option>Select Shop</option>

{shops.map((shop)=>(
<option key={shop._id} value={shop._id}>
{shop.shopName}
</option>
))}

</select>

</div>


{/* Inventory Table */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white rounded-xl shadow overflow-x-auto"
>

<table className="w-full text-sm">

<thead className="bg-gray-200 text-gray-700">

<tr>

<th className="p-4 text-left">Product</th>
<th className="p-4 text-left">Category</th>
<th className="p-4 text-left">Price</th>
<th className="p-4 text-left">Stock</th>

</tr>

</thead>

<tbody>

{inventory.length === 0 ? (

<tr>

<td colSpan="4" className="text-center p-6 text-gray-500">
No inventory data available
</td>

</tr>

) : (

inventory.map((item)=>(

<tr
key={item._id}
className="border-t hover:bg-gray-50 transition"
>

<td className="p-4 font-medium">
{item.productId.productName}
</td>

<td className="p-4 text-gray-600">
{item.productId.category}
</td>

<td className="p-4">
₹{item.productId.price}
</td>

<td className={`p-4 font-bold ${
item.stock < 5 ? "text-red-600" : "text-blue-600"
}`}>
{item.stock}
</td>

</tr>

))

)}

</tbody>

</table>

</motion.div>

</div>

</div>

);

}

export default Inventory;