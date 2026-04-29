import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ShoppingCart } from "lucide-react"
import { supabase } from "../lib/supabase"

function KopkenCart() {
  const navigate = useNavigate()

  const [cart, setCart] = useState([])
  const [name, setName] = useState("")
  const [outlet, setOutlet] = useState("")
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)

  const nameRef = useRef()
  const outletRef = useRef()
  const timeRef = useRef()

  useEffect(() => {
    const saved = localStorage.getItem("cart_kopken")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0)

  const handleCheckout = async () => {
    if (!name.trim()) return nameRef.current.focus()
    if (!outlet.trim()) return outletRef.current.focus()
    if (!time.trim()) return timeRef.current.focus()

    setLoading(true)

    const orderId = `KKM-${Date.now().toString().slice(-6)}`

    await supabase.from("orders").insert([{
      order_id: orderId,
      status: "pending",
      type: "fnb",
      product: "Kopi Kenangan",
      variant: JSON.stringify(cart),
      price: total,
      customer_name: name,
      outlet,
      pickup_time: time
    }])

    navigate("/kopken")
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7]">

      <div className="sticky top-0 bg-[#DB0007] text-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/kopken")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div>
            <h1 className="font-bold">Keranjang</h1>
            <p className="text-xs text-white/75">Checkout Order</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">

        <div className="rounded-3xl bg-white border p-4 shadow-sm space-y-2">
          {cart.map((item) => (
            <div
              key={item.id + item.options}
              className="flex justify-between text-sm"
            >
              <span>{item.name} ({item.qty})</span>
              <span>
                Rp {new Intl.NumberFormat("id-ID").format(item.price * item.qty)}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border p-4 shadow-sm space-y-3">
          <input
            ref={nameRef}
            placeholder="Nama"
            className="w-full border rounded-2xl px-4 py-3"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            ref={outletRef}
            placeholder="Outlet"
            className="w-full border rounded-2xl px-4 py-3"
            onChange={(e) => setOutlet(e.target.value)}
          />

          <input
            ref={timeRef}
            placeholder="Jam Ambil"
            className="w-full border rounded-2xl px-4 py-3"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <button
          onClick={handleCheckout}
          className="w-full bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} />
            <span>{loading ? "Loading..." : "Checkout"}</span>
          </div>

          <span>
            Rp {new Intl.NumberFormat("id-ID").format(total)}
          </span>
        </button>
      </div>

    </div>
  )
}

export default KopkenCart