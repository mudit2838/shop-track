import {BrowserRouter,Routes,Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";

import ProtectedRoute from "./components/ProtectedRoute";
import Profit from "./pages/Profit";


function App(){

return(

<BrowserRouter>

<Routes>

{/* Public Routes */}

<Route path="/" element={<Login/>} />

<Route path="/register" element={<Register/>} />


{/* Protected Routes */}

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/products"
element={
<ProtectedRoute>
<Products/>
</ProtectedRoute>
}
/>

<Route
path="/purchase"
element={
<ProtectedRoute>
<Purchase/>
</ProtectedRoute>
}
/>

<Route
path="/sales"
element={
<ProtectedRoute>
<Sales/>
</ProtectedRoute>
}
/>

<Route
path="/inventory"
element={
<ProtectedRoute>
<Inventory/>
</ProtectedRoute>
}
/>

<Route
path="/profit"
element={
<ProtectedRoute>
<Profit/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

);

}

export default App;