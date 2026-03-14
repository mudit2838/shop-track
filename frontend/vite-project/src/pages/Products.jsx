import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaBoxOpen, FaTrash, FaPlus } from "react-icons/fa";

function Products(){

const [shops,setShops] = useState([]);
const [products,setProducts] = useState([]);
const [selectedShop,setSelectedShop] = useState("");

const [productName,setProductName] = useState("");
const [category,setCategory] = useState("");
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

// get products by shop
const fetchProducts = async(shopId)=>{
try{
setSelectedShop(shopId);
const res = await API.get(`/products/${shopId}`);
setProducts(res.data);
}catch(err){
console.error(err);
}
};

// add product
const addProduct = async()=>{
try{

if(!selectedShop){
alert("Please select shop");
return;
}

await API.post("/products",{
shopId:selectedShop,
productName,
category,
price
});

setProductName("");
setCategory("");
setPrice("");

fetchProducts(selectedShop);

}catch(err){
console.error(err);
}
};

// delete product
const deleteProduct = async(id)=>{
try{
await API.delete(`/products/${id}`);
fetchProducts(selectedShop);
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

<FaBoxOpen className="text-blue-600 text-2xl"/>

<h1 className="text-3xl font-bold">
Products
</h1>

</motion.div>

{/* Shop Selector */}

<select
className="border rounded-lg p-3 mb-6 w-full md:w-64 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
onChange={(e)=>fetchProducts(e.target.value)}
>

<option>Select Shop</option>

{shops.map((shop)=>(
<option key={shop._id} value={shop._id}>
{shop.shopName}
</option>
))}

</select>


{/* Add Product Form */}

<div className="bg-white rounded-xl shadow p-6 mb-8">

<h2 className="font-bold mb-4 text-lg flex items-center gap-2">
<FaPlus/> Add Product
</h2>

<div className="grid md:grid-cols-4 gap-4">

<input
value={productName}
placeholder="Product Name"
className="border rounded-lg p-3"
onChange={(e)=>setProductName(e.target.value)}
/>

<input
value={category}
placeholder="Category"
className="border rounded-lg p-3"
onChange={(e)=>setCategory(e.target.value)}
/>

<input
value={price}
placeholder="Price"
className="border rounded-lg p-3"
onChange={(e)=>setPrice(e.target.value)}
/>

<button
onClick={addProduct}
className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
>
Add Product
</button>

</div>

</div>


{/* Product List */}

{products.length === 0 ? (

<div className="text-gray-500">
No products found
</div>

) : (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{products.map((product)=>(

<motion.div
key={product._id}
whileHover={{scale:1.03}}
className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
>

<div>

<h2 className="font-bold text-lg">
{product.productName}
</h2>

<p className="text-gray-500">
{product.category}
</p>

<p className="text-blue-600 font-bold">
₹{product.price}
</p>

</div>

<button
onClick={()=>deleteProduct(product._id)}
className="text-red-500 hover:text-red-700"
>

<FaTrash/>

</button>

</motion.div>

))}

</div>

)}

</div>

</div>

);

}

export default Products;