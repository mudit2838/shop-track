import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Sales(){

const [products,setProducts] = useState([]);
const [productId,setProductId] = useState("");
const [quantity,setQuantity] = useState("");
const [price,setPrice] = useState("");

useEffect(()=>{
fetchProducts();
},[]);

const fetchProducts = async()=>{
const res = await API.get("/products");
setProducts(res.data);
};

const addSale = async()=>{

if(!productId || !quantity || !price){
alert("Please fill all fields");
return;
}

await API.post("/sales",{ productId, quantity, price });

alert("Sale recorded");

setProductId("");
setQuantity("");
setPrice("");

};

return(

<div className="flex bg-slate-50 min-h-screen">

<Sidebar/>

<div className="p-10 w-full">

{/* Header */}

<div className="mb-8">

<h1 className="text-3xl font-semibold text-gray-800">
Sell Product
</h1>

<p className="text-gray-500 mt-1">
Record product sales from inventory
</p>

</div>


{/* Form Card */}

<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-lg">

<div className="space-y-5">

<select
value={productId}
onChange={(e)=>setProductId(e.target.value)}
className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
>

<option value="">Select Product</option>

{products.map(product=>(
<option key={product._id} value={product._id}>
{product.productName}
</option>
))}

</select>


<input
type="number"
value={quantity}
placeholder="Quantity"
onChange={(e)=>setQuantity(e.target.value)}
className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
/>


<input
type="number"
value={price}
placeholder="Selling Price"
onChange={(e)=>setPrice(e.target.value)}
className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
/>


<button
onClick={addSale}
className="bg-red-500 hover:bg-red-600 transition text-white px-6 py-3 rounded-lg font-medium"
>

Sell Product

</button>

</div>

</div>

</div>

</div>

);

}

export default Sales;