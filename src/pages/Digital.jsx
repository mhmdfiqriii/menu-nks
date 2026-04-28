// src/pages/Digital.jsx

import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { digitalProducts } from "../data/menu"
import DigitalCard from "../components/DigitalCard"
import DigitalModal from "../components/DigitalModal"

function Digital() {
  const navigate = useNavigate()

  const [selected, setSelected] = useState(null)
  const [variant, setVariant] = useState("")
  const [target, setTarget] = useState("")

  const products = useMemo(() => {
    return digitalProducts.map((item) => {
      if (item.id === "imei") {
        return {
          ...item,
          brand: "NKS DIGITAL",
          desc: "Unlock sinyal hilang, proses cepat dan aman.",
          color: "from-violet-700 to-indigo-700",
          badge: "⚡ Proses cepat",
          logo: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/imei/logo.png",
          cover: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/imei/cover.jpg"
        }
      }

      return {
        ...item,
        brand: "NKS DIGITAL",
        desc: "Paket akrab XL / Axis harga waras.",
        color: "from-sky-600 to-blue-700",
        badge: "💲 Harga promo",
        logo: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/kuota/logo.png",
        cover: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/digital/kuota/cover.jpg"
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
  }

  const selectedPrice =
    selected?.variants.find((v) => v.name === variant)?.price || 0

  const checkoutWhatsApp = () => {
    if (!target.trim()) {
      alert("Isi nomor / email dulu. Masa admin suruh nebak.")
      return
    }

    const text = `Halo admin, saya mau order:

Produk: ${selected.name}
Varian: ${variant}
Tujuan: ${target}

Total: Rp ${new Intl.NumberFormat("id-ID").format(selectedPrice)}
`

    const url =
      "https://wa.me/6285704550839?text=" +
      encodeURIComponent(text)

    window.open(url, "_blank")
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f8fafc] pb-10">

      <div className="sticky top-0 z-20 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white px-4 py-4 shadow-md">

        <div className="flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 rounded-2xl bg-white/10 active:scale-95 text-xl"
          >
            ←
          </button>

          <div className="flex-1 px-3">
            <h1 className="text-2xl font-bold">
              NKS Digital
            </h1>

            <p className="text-sm text-white/75">
              Layanan Digital
            </p>
          </div>

          <div className="text-2xl opacity-70">
            🖥️
          </div>

        </div>
      </div>

      <div className="p-4 space-y-5">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-800 to-violet-700 text-white p-5 shadow-xl">

          <p className="text-sm tracking-[4px] uppercase text-white/70">
            BELI LANGSUNG VIA WHATSAPP
          </p>

          <p className="text-2xl font-bold mt-3 leading-relaxed">
            Pilih produk → Isi form → Langsung chat admin
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="text-xs px-3 py-1 rounded-full bg-white/15">
              ⚡ Proses cepat
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-white/15">
              💲 Harga Promo
            </span>
          </div>

        </div>

        {products.map((item) => (
          <DigitalCard
            key={item.id}
            item={item}
            onClick={() => openModal(item)}
          />
        ))}

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
      />

    </div>
  )
}

export default Digital