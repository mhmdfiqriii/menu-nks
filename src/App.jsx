import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Kopken from "./pages/Kopken"
import KopkenCart from "./pages/KopkenCart"
import Fore from "./pages/Fore"
import JanjiJiwa from "./pages/JanjiJiwa"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/kopken" element={<Kopken />} />
      <Route path="/kopken/cart" element={<KopkenCart />} />

      <Route path="/fore" element={<Fore />} />
      <Route path="/janji" element={<JanjiJiwa />} />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  )
}

export default App