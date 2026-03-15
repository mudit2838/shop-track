import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Products(){

const [products,setProducts] = useState([]);

const [productName,setProductName] = useState("");
const [category,setCategory] = useState("");

useEffect(()=>{
fetchProducts();
},[]);

const fetchProducts = async()=>{

const res = await API.get("/products");

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

<h1 className="text-3xl font-bold mb-6">Products</h1>

<div className="mb-6">

<input
value={productName}
placeholder="Product Name"
className="border p-2 mr-2"
onChange={(e)=>setProductName(e.target.value)}
/>

<input
value={category}
placeholder="Category"
className="border p-2 mr-2"
onChange={(e)=>setCategory(e.target.value)}
/>

<button
onClick={addProduct}
className="bg-blue-500 text-white px-4 py-2 rounded"
>

Add Product

</button>

</div>

<div className="space-y-3">

{products.map((product)=>(

<div key={product._id} className="bg-white shadow p-4 flex justify-between">

<div>

<h2 className="font-bold">{product.productName}</h2>

<p className="text-gray-500">{product.category}</p>

</div>

<button
onClick={()=>deleteProduct(product._id)}
className="text-red-500"
>

Delete

</button>

</div>

))}

</div>

</div>

</div>

);

}

export default Products;