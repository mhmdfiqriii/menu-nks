import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Kopken from "./pages/Kopken"
import KopkenCart from "./pages/KopkenCart"
import Fore from "./pages/Fore"
import Tomoro from "./pages/Tomoro"
import OrderSuccess from "./pages/OrderSuccess"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"

function RouteShell() {
  const location = useLocation()

  return (
    <div
      key={location.pathname}
      className="animate-page-enter"
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/kopken" element={<Kopken />} />
        <Route path="/kopken/cart" element={<KopkenCart />} />
        <Route path="/fore" element={<Fore />} />
        <Route path="/tomoro" element={<Tomoro />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

function App() {
  return <RouteShell />
}

export default App