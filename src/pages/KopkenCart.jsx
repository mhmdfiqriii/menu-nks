import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ShoppingCart } from "lucide-react"
import { supabase } from "../lib/supabase"

function KopkenCart() {
  const navigate = useNavigate()

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart_kopken")
    return saved ? JSON.parse(saved) : []
  })

  const [name, setName] = useState("")
  const [outlet, setOutlet] = useState("")
  const [time, setTime] = useState("")
  const [loading, setLoading] = useState(false)

  const nameRef = useRef(null)
  const outletRef = useRef(null)
  const timeRef = useRef(null)

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty
  }, 0)

  const formatPrice = (value) => {
    return new Intl.NumberFormat("id-ID").format(value)
  }

  // gak pake Math.random lagi biar eslint berhenti tantrum
  const createOrderId = () => {
    const stamp = crypto.randomUUID().slice(0, 6).toUpperCase()
    return `KKM-${stamp}`
  }

  const buildItemsText = () => {
    return cart.map((item, index) => {
      const lines = []

      lines.push(`${index + 1}. ${item.name} (${item.qty}x)`)

      if (item.options?.trim()) {
        lines.push(`   (${item.options})`)
      }

      lines.push(
        `   Sub Total : Rp. ${formatPrice(item.price * item.qty)}`
      )

      return lines.join("\n")
    }).join("\n")
  }

  const handleCheckout = async () => {
    if (!name.trim()) return nameRef.current?.focus()
    if (!outlet.trim()) return outletRef.current?.focus()
    if (!time.trim()) return timeRef.current?.focus()
    if (!cart.length) return

    try {
      setLoading(true)

      const orderId = createOrderId()

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

      const text = `*FORM ORDER NKS*

No. Order : ${orderId}
Nama Pemesan : ${name}
Outlet : ${outlet}
Jam Pengambilan : ${time}

Pesanan :
${buildItemsText()}

Total : Rp. ${formatPrice(total)}`

      localStorage.removeItem("cart_kopken")
      setCart([])

      window.open(
        "https://wa.me/6285704550839?text=" +
          encodeURIComponent(text),
        "_blank"
      )

      navigate("/kopken")
    } catch {
      alert("Checkout gagal. Sistem kadang suka ngelawak.")
    } finally {
      setLoading(false)
    }
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
            <h1 className="font-bold text-[15px]">
              Keranjang
            </h1>

            <p className="text-[11px] text-white/75">
              Checkout Order
            </p>
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">

        <div className="rounded-3xl bg-white border p-4 shadow-sm space-y-4">
          {cart.map((item) => (
            <div
              key={item.id + item.options}
              className="border-b last:border-b-0 pb-3 last:pb-0"
            >
              <div className="flex justify-between gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {item.name} ({item.qty}x)
                  </p>

                  {item.options && (
                    <p className="text-xs text-gray-500 mt-1">
                      {item.options}
                    </p>
                  )}
                </div>

                <p className="font-semibold text-sm whitespace-nowrap">
                  Rp {formatPrice(item.price * item.qty)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white border p-4 shadow-sm space-y-3">

          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Pemesan"
            className="w-full border rounded-2xl px-4 py-3"
          />

          <input
            ref={outletRef}
            value={outlet}
            onChange={(e) => setOutlet(e.target.value)}
            placeholder="Lokasi Outlet"
            className="w-full border rounded-2xl px-4 py-3"
          />

          <input
            ref={timeRef}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Sekarang / Nanti / Jam 7.30"
            className="w-full border rounded-2xl px-4 py-3"
          />

        </div>

      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl disabled:opacity-70"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} />

            <span>
              {loading ? "Memproses..." : "Checkout"}
            </span>
          </div>

          <span>
            Rp {formatPrice(total)}
          </span>
        </button>
      </div>

    </div>
  )
}

export default KopkenCart