import { useEffect,useState } from "react";
import API from "../services/api";

function TopProducts(){

const [products,setProducts] = useState([]);

useEffect(()=>{
fetchProducts();
},[]);

const fetchProducts = async()=>{

const res = await API.get("/dashboard/top-products");

setProducts(res.data);

};

return(

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold mb-4">
Top Selling Products
</h2>

<ul className="space-y-3">

{products.map((p,index)=>(
<li key={index} className="flex justify-between">

<span>
{p.product.productName}
</span>

<span className="font-bold text-blue-500">
{p.totalSold}
</span>

</li>
))}

</ul>

</div>

)

}

export default TopProducts;