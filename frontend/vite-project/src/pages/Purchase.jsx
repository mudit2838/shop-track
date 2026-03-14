import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

function Purchase(){

const [shops,setShops] = useState([]);
const [products,setProducts] = useState([]);

const [shopId,setShopId] = useState("");
const [productId,setProductId] = useState("");
const [quantity,setQuantity] = useState("");
const [price,setPrice] = useState("");

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

const fetchProducts = async(id)=>{
try{
setShopId(id);
const res = await API.get(`/products/${id}`);
setProducts(res.data);
}catch(err){
console.error(err);
}
};

const addPurchase = async()=>{

try{

if(!shopId || !productId){
alert("Please select shop and product");
return;
}

await API.post("/purchase",{
shopId,
productId,
quantity,
price
});

setQuantity("");
setPrice("");

alert("Purchase added successfully");

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

<FaShoppingCart className="text-green-600 text-2xl"/>

<h1 className="text-3xl font-bold">
Purchase Product
</h1>

</motion.div>


{/* Purchase Form */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white rounded-xl shadow p-6 max-w-xl"
>

<div className="grid gap-4">

{/* Shop Selector */}

<select
className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
onChange={(e)=>fetchProducts(e.target.value)}
>

<option>Select Shop</option>

{shops.map((shop)=>(
<option key={shop._id} value={shop._id}>
{shop.shopName}
</option>
))}

</select>


{/* Product Selector */}

<select
className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
onChange={(e)=>setProductId(e.target.value)}
>

<option>Select Product</option>

{products.map((product)=>(
<option key={product._id} value={product._id}>
{product.productName}
</option>
))}

</select>


{/* Quantity */}

<input
value={quantity}
placeholder="Quantity"
className="border rounded-lg p-3"
onChange={(e)=>setQuantity(e.target.value)}
/>


{/* Price */}

<input
value={price}
placeholder="Price"
className="border rounded-lg p-3"
onChange={(e)=>setPrice(e.target.value)}
/>


{/* Button */}

<button
onClick={addPurchase}
className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
>
Add Purchase
</button>

</div>

</motion.div>

</div>

</div>

);

}

export default Purchase;