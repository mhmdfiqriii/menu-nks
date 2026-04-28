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

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-2xl bg-white/10 active:scale-95 text-lg"
          >
            ←
          </button>

          <div className="flex-1 px-3">
            <h1 className="text-xl font-bold leading-tight">
              NKS Digital
            </h1>

            <p className="text-xs text-white/75">
              Layanan Digital
            </p>
          </div>

          <div className="text-xl opacity-75">
            🖥️
          </div>

        </div>
      </div>

      <div className="p-4 space-y-4">

        {/* HERO */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-800 to-violet-700 text-white p-5 shadow-xl overflow-hidden relative">

          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10"></div>

          <div className="relative">
            <p className="text-[11px] tracking-[4px] uppercase text-white/70">
              BELI VIA WHATSAPP
            </p>

            <p className="text-xl font-bold mt-3 leading-snug">
              Pilih produk, isi data, langsung chat admin.
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/15">
                ⚡ Proses cepat
              </span>

              <span className="text-[11px] px-3 py-1 rounded-full bg-white/15">
                💲 Harga promo
              </span>
            </div>
          </div>

        </div>

        {/* LIST */}
        <div className="space-y-3">
          {products.map((item) => (
            <DigitalCard
              key={item.id}
              item={item}
              onClick={() => openModal(item)}
            />
          ))}
        </div>

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