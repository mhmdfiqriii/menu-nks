import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronLeft,
  ShoppingCart,
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

  const syncCart = (next) => {
    setCart(next)
    localStorage.setItem(
      "cart_kopken",
      JSON.stringify(next)
    )
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
      alert("Checkout gagal. Sistem sedang malu.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] pb-44">

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#DB0007] text-white shadow-md">
        <div className="px-4 h-[64px] flex items-center gap-3">

          <button
            onClick={() => navigate("/kopken")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div>
            <h1 className="font-bold text-[16px]">
              Keranjang
            </h1>
            <p className="text-xs text-white/75">
              Review pesananmu
            </p>
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* LIST ITEM */}
        <div className="rounded-3xl bg-white p-4 border shadow-sm">
          <p className="text-xs font-bold text-gray-400 mb-4 tracking-wide">
            ITEM DALAM KERANJANG
          </p>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id + item.options}
                className="border-b last:border-b-0 pb-4 last:pb-0"
              >
                <div className="flex justify-between gap-3">

                  <div className="flex-1">
                    <p className="font-bold text-[15px]">
                      {item.name}
                    </p>

                    {item.options && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.options
                          .split(",")
                          .map((opt, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full text-[10px] bg-gray-100"
                            >
                              {opt.trim()}
                            </span>
                          ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2">
                      Qty {item.qty} • Rp{" "}
                      {formatPrice(item.price)} / item
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      Rp{" "}
                      {formatPrice(
                        item.price * item.qty
                      )}
                    </p>

                    <div className="flex items-center justify-end gap-2 mt-3">

                      <button
                        onClick={() =>
                          decreaseQty(item)
                        }
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="w-5 text-center text-sm font-bold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item)
                        }
                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        removeItem(item)
                      }
                      className="text-xs text-red-500 mt-2 inline-flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      Hapus
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Total Produk: {totalQty} pcs
          </p>
        </div>

        {/* TAMBAH MENU */}
        <button
          onClick={() => navigate("/kopken")}
          className="w-full rounded-3xl bg-white border p-4 flex items-center justify-between shadow-sm"
        >
          <div className="text-left">
            <p className="font-bold">
              TAMBAH MENU
            </p>
            <p className="text-sm text-gray-400">
              Tambah menu lain?
            </p>
          </div>

          <p className="text-[#DB0007] font-bold">
            + Tambah
          </p>
        </button>

        {/* FORM */}
        <div className="rounded-3xl bg-white p-4 border shadow-sm space-y-3">

          <p className="font-bold text-lg">
            Ringkasan pembayaran
          </p>

          <div className="flex justify-between text-sm">
            <span>Harga</span>
            <span>
              Rp {formatPrice(total)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Biaya admin</span>
            <span>Rp 0</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-bold">
            <span>Total pembayaran</span>
            <span>
              Rp {formatPrice(total)}
            </span>
          </div>

          <input
            ref={nameRef}
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Nama pemesan"
            className="w-full border rounded-2xl px-4 py-3"
          />

          <input
            ref={outletRef}
            value={outlet}
            onChange={(e) =>
              setOutlet(e.target.value)
            }
            placeholder="Lokasi outlet pickup"
            className="w-full border rounded-2xl px-4 py-3"
          />

          <input
            ref={timeRef}
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
            placeholder="Sekarang / Jam 19.30"
            className="w-full border rounded-2xl px-4 py-3"
          />

        </div>

      </div>

      {/* STICKY CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md">
        <button
          onClick={handleCheckout}
          disabled={loading || !cart.length}
          className="w-full bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl disabled:opacity-70"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} />
            <div className="text-left">
              <p className="text-xs text-white/75">
                {totalQty} item dalam keranjang
              </p>
              <p className="font-semibold">
                {loading
                  ? "Memproses..."
                  : "Checkout"}
              </p>
            </div>
          </div>

          <p className="font-bold">
            Rp {formatPrice(total)}
          </p>
        </button>
      </div>

    </div>
  )
}

export default KopkenCart