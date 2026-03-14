import { useEffect,useState } from "react";
import API from "../services/api";

function LowStock(){

const [items,setItems] = useState([]);

useEffect(()=>{
fetchLowStock();
},[]);

const fetchLowStock = async()=>{

const res = await API.get("/dashboard/low-stock");

setItems(res.data);

};

return(

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold mb-4 text-red-500">
Low Stock Alerts
</h2>

{items.length === 0 ? (

<p className="text-gray-400">
No low stock items
</p>

) : (

<ul className="space-y-3">

{items.map((item)=>(
<li key={item._id} className="flex justify-between">

<span>
{item.productId.productName}
</span>

<span className="text-red-500 font-bold">
{item.stock}
</span>

</li>
))}

</ul>

)}

</div>

)

}

export default LowStock;