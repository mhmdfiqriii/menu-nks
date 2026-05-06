import { useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Monitor } from "lucide-react"
import { supabase } from "../lib/supabase"
import { digitalProducts } from "../data/menu"
import DigitalCard from "../components/DigitalCard"
import DigitalModal from "../components/DigitalModal"

function Digital() {
  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)
  const [variant, setVariant] = useState("")
  const [target, setTarget] = useState("")
  const [loading, setLoading] = useState(false)
  const [orderCount, setOrderCount] = useState(0)

  useEffect(() => {
    const getOrders = async () => {
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })

      setOrderCount(count || 0)
    }

    getOrders()

    const channel = supabase
      .channel("orders-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders"
        },
        getOrders
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const products = useMemo(() => {
    return digitalProducts.map((item) => {
      if (item.id === "imei") {
        return {
          ...item,
          brand: "NKS DIGITAL",
          desc: "Aktifkan kembali sinyal perangkatmu.",
          type: "imei",
          color: "from-violet-700 to-indigo-700",
          badge: "⚡ Fast Respon",
          prefix: "IMEI",
          logo:
            "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/imei/logo.png",
          cover:
            "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/imei/cover.jpg"
        }
      }

      return {
        ...item,
        brand: "NKS DIGITAL",
        desc: "Paket XL / Axis hemat untuk harianmu.",
        type: "kuota",
        color: "from-sky-600 to-blue-700",
        badge: "🛡 Aman & Bergaransi",
        prefix: "AKRAB",
        logo:
          "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/kuota/logo.png",
        cover:
          "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/kuota/cover.jpg"
      }
    })
  }, [])

  const openModal = (item) => {
    setSelected(item)
    setVariant(item.variants?.[0]?.name || "")
    setTarget("")
  }

  const closeModal = () => {
    setSelected(null)
    setVariant("")
    setTarget("")
    setLoading(false)
  }

  const selectedPrice =
    selected?.variants?.find(
      (v) => v.name === variant
    )?.price || 0

  const createOrderId = () => {
    const randomId = Math.floor(
      100000 + Math.random() * 900000
    )

    return `${selected.prefix}-${randomId}`
  }

  const checkoutWhatsApp = async () => {
    if (!selected) return

    if (
      selected.type !== "imei" &&
      !target.trim()
    ) {
      alert("Isi nomor dulu.")
      return
    }

    const orderId = createOrderId()

    await supabase.from("orders").insert([
      {
        order_id: orderId,
        status: "pending",
        type: "digital",
        product: selected.name,
        variant,
        phone:
          selected.type === "imei"
            ? null
            : target,
        price: selectedPrice
      }
    ])

    let text = ""

    if (selected.type === "imei") {
      text = `*FORM ORDER NKS DIGITAL*

No. Pesanan : ${orderId}
Produk : ${selected.name}
Durasi : ${variant}

*Total : Rp ${new Intl.NumberFormat(
        "id-ID"
      ).format(selectedPrice)}*`
    } else {
      text = `*FORM ORDER NKS DIGITAL*

No. Pesanan : ${orderId}
Produk : ${selected.name}
Paket : ${variant}
No. HP : ${target}

*Total : Rp ${new Intl.NumberFormat(
        "id-ID"
      ).format(selectedPrice)}*`
    }

    setLoading(true)

    setTimeout(() => {
      window.open(
        "https://wa.me/6285704550839?text=" +
          encodeURIComponent(text),
        "_blank"
      )

      setLoading(false)
      closeModal()
    }, 900)
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] pb-8">

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-indigo-800 to-indigo-700 text-white border-b border-white/10">

        <div className="px-4 h-[64px] flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex-1 px-3">
            <h1 className="text-[15px] font-bold">
              NKS Digital
            </h1>

            <p className="text-[11px] text-white/75">
              Layanan Digital
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Monitor size={18} />
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* HERO */}
        <div className="rounded-[28px] bg-gradient-to-r from-indigo-800 to-violet-700 text-white p-4 relative overflow-hidden shadow-[0_12px_30px_rgba(79,70,229,.18)]">

          <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-white/10"></div>

          <div className="relative">

            <p className="text-[10px] tracking-[3px] uppercase text-white/60 font-medium">
              BELI VIA WHATSAPP
            </p>

            <h2 className="text-[22px] leading-[1.2] font-bold mt-2 max-w-[260px]">
              Pilih produk, checkout, chat admin.
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">

              <span className="px-3 py-2 rounded-full bg-white/15 text-[11px]">
                ⚡ Fast Respon
              </span>

              <span className="px-3 py-2 rounded-full bg-white/15 text-[11px]">
                🛡 Aman & Bergaransi
              </span>

              <span className="px-3 py-2 rounded-full bg-white/15 text-[11px]">
                📦 Order Masuk : {orderCount}
              </span>

            </div>

          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="space-y-2.5">
          {products.map((item) => (
            <DigitalCard
              key={item.id}
              item={item}
              onClick={() => openModal(item)}
            />
          ))}
        </div>

      </div>
      
       {/* FOOTER */}
          <div className="pt-3 pb-6">
            <p className="text-center text-xs text-gray-400">
              © 2026 Web Developed by mhmdfiqriii_
            </p>
          </div>

      <DigitalModal
        selected={selected}
        variant={variant}
        setVariant={setVariant}
        target={target}
        setTarget={setTarget}
        selectedPrice={selectedPrice}
        closeModal={closeModal}
        checkoutWhatsApp={checkoutWhatsApp}
        loading={loading}
      />

    </div>
  )
}

export default Digital