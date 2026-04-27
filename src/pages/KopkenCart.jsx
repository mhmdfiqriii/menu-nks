import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
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

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const handleCheckout = async () => {
    if (!name.trim()) return nameRef.current.focus()
    if (!outlet.trim()) return outletRef.current.focus()
    if (!time.trim()) return timeRef.current.focus()

    setLoading(true)

    const orderId = `KKM-${Date.now().toString().slice(-6)}`

    let message = `*FORM ORDER NKS*\n\n`
    message += `No: ${orderId}\n`
    message += `Nama: ${name}\n`
    message += `Outlet: ${outlet}\n`
    message += `Jam: ${time}\n\n`

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} (${item.qty}x)\n`
    })

    message += `\nTotal: Rp ${total}`

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

    window.open(`https://wa.me/6285704550839?text=${encodeURIComponent(message)}`)

    localStorage.removeItem("cart_kopken")
    navigate("/kopken")
  }

  return (
    <div className="max-w-md mx-auto p-4">

      <button onClick={() => navigate("/kopken")} className="text-sm mb-3">
        ← Kembali
      </button>

      <h1 className="text-xl font-semibold mb-4">Keranjang</h1>

      <div className="bg-white p-4 rounded-2xl border space-y-2">
        {cart.map(item => (
          <div key={item.id + item.options} className="flex justify-between text-sm">
            <span>{item.name} ({item.qty})</span>
            <span>Rp {item.price * item.qty}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <input ref={nameRef} placeholder="Nama" className="w-full border p-3 rounded-xl"
          onChange={e => setName(e.target.value)} />

        <input ref={outletRef} placeholder="Outlet" className="w-full border p-3 rounded-xl"
          onChange={e => setOutlet(e.target.value)} />

        <input ref={timeRef} placeholder="Jam" className="w-full border p-3 rounded-xl"
          onChange={e => setTime(e.target.value)} />
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white py-3 rounded-xl mt-4"
      >
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  )
}

export default KopkenCart