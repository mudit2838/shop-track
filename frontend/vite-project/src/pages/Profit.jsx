import {useEffect,useState} from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Profit(){

const [data,setData] = useState({});

useEffect(()=>{
fetchProfit();
},[]);

const fetchProfit = async()=>{

const res = await API.get("/profit");

setData(res.data);

};

return(

<div className="flex">

<Sidebar/>

<div className="p-10 w-full">

<h1 className="text-3xl font-bold mb-8">
Profit Analytics
</h1>

<div className="grid grid-cols-4 gap-6">

<div className="bg-white p-6 shadow rounded">
<p className="text-gray-500">Today Profit</p>
<h2 className="text-2xl font-bold text-green-600">
₹{data.dailyProfit}
</h2>
</div>

<div className="bg-white p-6 shadow rounded">
<p className="text-gray-500">Weekly Profit</p>
<h2 className="text-2xl font-bold text-blue-600">
₹{data.weeklyProfit}
</h2>
</div>

<div className="bg-white p-6 shadow rounded">
<p className="text-gray-500">Monthly Profit</p>
<h2 className="text-2xl font-bold text-purple-600">
₹{data.monthlyProfit}
</h2>
</div>

<div className="bg-white p-6 shadow rounded">
<p className="text-gray-500">Total Profit</p>
<h2 className="text-2xl font-bold text-green-700">
₹{data.totalProfit}
</h2>
</div>

</div>

</div>

</div>

);

}

export default Profit;