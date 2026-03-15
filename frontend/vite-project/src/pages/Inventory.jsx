import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Inventory(){

const [inventory,setInventory] = useState([]);

useEffect(()=>{
fetchInventory();
},[]);

const fetchInventory = async()=>{

try{

const res = await API.get("/inventory");

setInventory(res.data);

}catch(err){

console.error(err);

}

};

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-3xl font-bold mb-6">
Inventory
</h1>

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full">

<thead className="bg-gray-200 text-gray-700">

<tr>

<th className="p-4 text-left">Product</th>
<th className="p-4 text-left">Category</th>
<th className="p-4 text-left">Cost Price</th>
<th className="p-4 text-left">Stock</th>
<th className="p-4 text-left">Stock Value</th>

</tr>

</thead>

<tbody>

{inventory.length === 0 ? (

<tr>

<td colSpan="5" className="text-center p-6 text-gray-500">
No inventory available
</td>

</tr>

) : (

inventory.map((item)=>(

<tr
key={item._id}
className="border-t hover:bg-gray-50"
>

<td className="p-4 font-medium">
{item.productName || item.productId.productName}
</td>

<td className="p-4 text-gray-600">
{item.category || item.productId.category}
</td>

<td className="p-4 text-green-600 font-semibold">
₹{item.price}
</td>

<td className="p-4 font-bold text-blue-600">
{item.stock}
</td>

<td className="p-4 font-semibold">
₹{item.price * item.stock}
</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default Inventory;