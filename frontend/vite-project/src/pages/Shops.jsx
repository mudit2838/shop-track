import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { motion } from "framer-motion";
import { FaStore, FaPlus, FaTrash } from "react-icons/fa";

function Shops(){

const [shops,setShops] = useState([]);
const [shopName,setShopName] = useState("");
const [address,setAddress] = useState("");


// get shops
const fetchShops = async()=>{

try{

const res = await API.get("/shops");
setShops(res.data);

}catch(err){

console.error(err);

}

};


// create shop
const createShop = async()=>{

try{

if(!shopName || !address){

alert("Please fill all fields");
return;

}

await API.post("/shops",{shopName,address});

setShopName("");
setAddress("");

fetchShops();

}catch(err){

console.error(err);

}

};


const deleteShop = async(id)=>{

try{

await API.delete(`/shops/${id}`);

fetchShops();

}catch(err){

console.error(err);

}

};


useEffect(()=>{
fetchShops();
},[]);


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

<FaStore className="text-blue-600 text-2xl"/>

<h1 className="text-3xl font-bold">
Shops
</h1>

</motion.div>


{/* Add Shop Form */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white rounded-xl shadow p-6 mb-8 max-w-xl"
>

<h2 className="font-bold mb-4 flex items-center gap-2">
<FaPlus/> Add Shop
</h2>

<div className="grid md:grid-cols-3 gap-4">

<input
value={shopName}
placeholder="Shop Name"
className="border rounded-lg p-3"
onChange={(e)=>setShopName(e.target.value)}
/>

<input
value={address}
placeholder="Address"
className="border rounded-lg p-3"
onChange={(e)=>setAddress(e.target.value)}
/>

<button
onClick={createShop}
className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
>
Add Shop
</button>

</div>

</motion.div>


{/* Shop List */}

{shops.length === 0 ? (

<p className="text-gray-500">
No shops added yet
</p>

) : (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{shops.map((shop)=>(

<motion.div
key={shop._id}
whileHover={{scale:1.03}}
className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
>

<div>

<h2 className="font-bold text-lg">
{shop.shopName}
</h2>

<p className="text-gray-500">
{shop.address}
</p>

</div>

<button
onClick={()=>deleteShop(shop._id)}
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

)

}

export default Shops;