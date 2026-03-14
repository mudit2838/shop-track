import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/" element={<Login/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/shops" element={<Shops/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/purchase" element={<Purchase/>}/>
<Route path="/sales" element={<Sales/>}/>
<Route path="/inventory" element={<Inventory/>}/>

</Routes>

</BrowserRouter>

);

}

export default App;