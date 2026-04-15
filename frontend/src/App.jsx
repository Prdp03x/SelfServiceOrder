import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";
import OrderStatus from "./pages/OrderStatus";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/status" element={<OrderStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;