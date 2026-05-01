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
    if (!cart.length) return

    setLoading(true)

    const orderId = `KKM-${Date.now().toString().slice(-6)}`

    await supabase.from("orders").insert([
      {
        order_id: orderId,
        status: "pending",
        type: "fnb",
        product: "Kopi Kenangan",
        variant: JSON.stringify(cart),
        price: total,
        customer_name: name,
        outlet,
        pickup_time: time
      }
    ])

    const text = `*FORM ORDER KOPI KENANGAN*

No. Pesanan : ${orderId}
Nama : ${name}
Outlet : ${outlet}
Jam Ambil : ${time}

Total : Rp ${new Intl.NumberFormat("id-ID").format(total)}`

    localStorage.removeItem("cart_kopken")
    setCart([])

    window.open(
      "https://wa.me/6285704550839?text=" + encodeURIComponent(text),
      "_blank"
    )

    navigate("/kopken")
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] pb-32">

      <div className="sticky top-0 z-30 bg-[#DB0007] text-white shadow-md">
        <div className="px-4 h-[64px] flex items-center gap-3">

          <button
            onClick={() => navigate("/kopken")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div>
            <h1 className="font-bold text-[15px]">Keranjang</h1>
            <p className="text-[11px] text-white/75">Checkout Order</p>
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">

        <div className="rounded-3xl bg-white border p-4 shadow-sm space-y-3">
          {cart.map((item) => (
            <div
              key={item.id + item.options}
              className="flex justify-between gap-3 text-sm"
            >
              <span>{item.name} ({item.qty})</span>

              <span className="font-semibold">
                Rp {new Intl.NumberFormat("id-ID").format(item.price * item.qty)}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border p-4 shadow-sm space-y-3">

          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama"
            className="w-full border rounded-2xl px-4 py-3"
          />

          <input
            ref={outletRef}
            value={outlet}
            onChange={(e) => setOutlet(e.target.value)}
            placeholder="Outlet"
            className="w-full border rounded-2xl px-4 py-3"
          />

          <input
            ref={timeRef}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Jam Ambil"
            className="w-full border rounded-2xl px-4 py-3"
          />

        </div>

      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} />
            <span>{loading ? "Memproses..." : "Checkout"}</span>
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