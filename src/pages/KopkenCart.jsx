import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronLeft,
  Plus,
  Minus,
  Trash2
} from "lucide-react"
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

  const formatPrice = (num) =>
    new Intl.NumberFormat("id-ID").format(num)

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const totalQty = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  )

  // 🔥 HITUNG HEMAT
  const totalDiscount = cart.reduce((sum, item) => {
    const ori = item.originalPrice || item.price
    return sum + (ori - item.price) * item.qty
  }, 0)

  const isFormValid =
    name.trim() && outlet.trim() && time.trim()

  const isReady =
    cart.length > 0 && isFormValid

  const syncCart = (next) => {
    setCart(next)
    localStorage.setItem("cart_kopken", JSON.stringify(next))
  }

  const increaseQty = (target) => {
    const next = cart.map((item) =>
      item.id === target.id &&
      item.options === target.options
        ? { ...item, qty: item.qty + 1 }
        : item
    )
    syncCart(next)
  }

  const decreaseQty = (target) => {
    const next = cart
      .map((item) =>
        item.id === target.id &&
        item.options === target.options
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter((item) => item.qty > 0)

    syncCart(next)
  }

  const removeItem = (target) => {
    const next = cart.filter(
      (item) =>
        !(
          item.id === target.id &&
          item.options === target.options
        )
    )
    syncCart(next)
  }

  const createOrderId = () => {
    const code = crypto
      .randomUUID()
      .slice(0, 6)
      .toUpperCase()

    return `KKM-${code}`
  }

  const buildItemsText = () => {
    return cart
      .map((item, i) => {
        let txt = `${i + 1}. ${item.name} (${item.qty}x)\n`

        if (item.options) {
          txt += `   (${item.options})\n`
        }

        txt += `   Sub Total : Rp. ${formatPrice(
          item.price * item.qty
        )}`

        return txt
      })
      .join("\n")
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
      alert("Checkout gagal. Sistem lagi ngambek.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] pb-10">

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-primary text-white">
        <div className="px-4 h-[64px] flex items-center gap-3">

          <button
            onClick={() => navigate("/kopken")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div>
            <h1 className="font-semibold text-md">
              Keranjang
            </h1>
            <p className="text-xs text-white/75">
              Review pesananmu sebelum checkout
            </p>
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* ITEM */}
        <div className="rounded-card bg-white p-4 border border-border-soft shadow-card">
          <p className="text-xs font-semibold text-gray-400 mb-4">
            ITEM DALAM KERANJANG
          </p>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id + item.options}
                className="border-b last:border-none pb-4"
              >
                <div className="flex justify-between gap-3">

                  <div className="flex-1">
                    <p className="font-semibold text-sm">
                      {item.name}
                    </p>

                    {item.options && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.options
                          .split(",")
                          .map((opt, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-pill text-[11px] bg-gray-100"
                            >
                              {opt.trim()}
                            </span>
                          ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2">
                      Qty {item.qty} • Rp {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      Rp {formatPrice(item.price * item.qty)}
                    </p>

                    <div className="flex items-center justify-end gap-2 mt-2">

                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-5 text-center text-sm font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    <button
                      onClick={() => removeItem(item)}
                      className="text-[11px] text-red-500 mt-2"
                    >
                      Hapus
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Total Produk: {totalQty} pcs
          </p>
        </div>

        {/* TAMBAH */}
        <button
          onClick={() => navigate("/kopken")}
          className="w-full rounded-card bg-white border border-border-soft p-4 flex justify-between"
        >
          <div>
            <p className="font-semibold text-sm">
              TAMBAH MENU
            </p>
            <p className="text-xs text-gray-400">
              Tambah menu lain?
            </p>
          </div>

          <p className="text-primary font-semibold text-sm">
            + Tambah
          </p>
        </button>

        {/* FORM + SUMMARY */}
        <div className="rounded-card bg-white p-4 border border-border-soft space-y-3 shadow-card">

          <p className="font-semibold text-md">
            Ringkasan pembayaran
          </p>

          <div className="flex justify-between text-sm">
            <span>Harga</span>
            <span>Rp {formatPrice(total)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Biaya admin</span>
            <span>Rp 0</span>
          </div>

          {totalDiscount > 0 && (
            <div className="bg-red-50 text-primary text-sm px-3 py-2 rounded-xl flex justify-between items-center animate-pulse">
              <span>Kamu Hemat Sebesar</span>
              <span className="font-semibold">
                Rp {formatPrice(totalDiscount)}
              </span>
            </div>
          )}

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total pembayaran</span>
            <span>Rp {formatPrice(total)}</span>
          </div>

          <input
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama pemesan"
            className="w-full border rounded-button px-4 py-3 text-sm"
          />

          <input
            ref={outletRef}
            value={outlet}
            onChange={(e) => setOutlet(e.target.value)}
            placeholder="Lokasi outlet pickup"
            className="w-full border rounded-button px-4 py-3 text-sm"
          />

          <input
            ref={timeRef}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Sekarang / Jam 19.30"
            className="w-full border rounded-button px-4 py-3 text-sm"
          />

          <p className="text-xs text-gray-400">
            Setelah checkout, data akan tersimpan & kamu diarahkan ke WhatsApp admin untuk konfirmasi pesanan serta pembayaran.
          </p>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={!isReady || loading}
            className={`w-full py-3 rounded-button font-semibold transition ${
              isReady
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {loading
              ? "Memproses..."
              : isReady
              ? "Pesan Sekarang"
              : "Keranjang kosong"}
          </button>

        </div>

      </div>
    </div>
  )
}

export default KopkenCart