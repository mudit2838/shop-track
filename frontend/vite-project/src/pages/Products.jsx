import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { FaSearch, FaTrash, FaPlus } from "react-icons/fa";

function Products(){

const [products,setProducts] = useState([]);
const [productName,setProductName] = useState("");
const [category,setCategory] = useState("");
const [search,setSearch] = useState("");

useEffect(()=>{
fetchProducts();
},[search]);

const fetchProducts = async()=>{
const res = await API.get(`/products?search=${search}`);
setProducts(res.data);
};

const addProduct = async()=>{

if(!productName || !category){
alert("Please fill all fields");
return;
}

await API.post("/products",{
productName,
category
});

fetchProducts();
setProductName("");
setCategory("");

};

const deleteProduct = async(id)=>{
await API.delete(`/products/${id}`);
fetchProducts();
};

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="p-10 w-full">

{/* Page Title */}

<h1 className="text-3xl font-bold text-gray-800 mb-6">
Products
</h1>


{/* Search Bar */}

<div className="bg-white shadow-md rounded-xl p-4 mb-6">

<div className="relative w-72">

<FaSearch className="absolute top-3 left-3 text-gray-400"/>

<input
type="text"
placeholder="Search products..."
className="border border-gray-300 pl-10 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

</div>


{/* Add Product Container */}

<div className="bg-white shadow-md rounded-xl p-6 mb-8">

<h2 className="text-lg font-semibold mb-4 text-gray-700">
Add Product
</h2>

<div className="flex flex-wrap gap-3">

<input
value={productName}
placeholder="Product Name"
className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
onChange={(e)=>setProductName(e.target.value)}
/>

<input
value={category}
placeholder="Category"
className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
onChange={(e)=>setCategory(e.target.value)}
/>

<button
onClick={addProduct}
className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
>

<FaPlus/>

Add Product

</button>

</div>

</div>


{/* Product Cards */}

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{products.map((product)=>(

<div
key={product._id}
className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center transition transform hover:-translate-y-1 hover:shadow-xl"
>

<div>

<h2 className="font-semibold text-lg text-gray-800">
{product.productName}
</h2>

<p className="text-sm text-gray-500">
{product.category}
</p>

</div>

<button
onClick={()=>deleteProduct(product._id)}
className="text-red-500 hover:text-red-700 transition"
>

<FaTrash/>

</button>

</div>

))}

</div>

</div>

</div>

);

}

export default Products;