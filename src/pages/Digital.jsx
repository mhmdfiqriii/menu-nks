import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { digitalProducts } from "../data/menu"

function Digital() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [variant, setVariant] = useState("")
  const [target, setTarget] = useState("")

  const products = digitalProducts.map((item) => {
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

  const openModal = (item) => {
    setSelected(item)
    setVariant(item.variants[0]?.name || "")
    setTarget("")
  }

  const closeModal = () => {
    setSelected(null)
    setVariant("")
    setTarget("")
  }

  const selectedPrice = selected?.variants.find(
    (v) => v.name === variant
  )?.price || 0

  const checkoutWhatsApp = () => {
    if (!target.trim()) {
      alert("Isi nomor / email dulu. Masa admin suruh nebak.")
      return
    }

    const text =
`Halo admin, saya mau order:

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

        {/* HERO */}
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

        {/* PRODUCTS */}
        {products.map((item) => {
          const startPrice = item.variants[0]?.price || 0

          return (
            <div
              key={item.id}
              className={`rounded-3xl bg-gradient-to-br ${item.color} text-white p-5 shadow-xl relative overflow-hidden`}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10"></div>

              <div className="relative">

                <div className="flex items-start justify-between gap-3">

                  <img
                    src={item.logo}
                    className="w-16 h-16 rounded-2xl bg-white object-contain p-2"
                  />

                  <span className="text-xs px-3 py-2 rounded-full bg-white/20 backdrop-blur">
                    {item.variants[0]?.name}
                  </span>

                </div>

                <p className="text-xs tracking-[3px] uppercase text-white/70 mt-5">
                  {item.brand}
                </p>

                <h3 className="text-3xl font-bold mt-2 leading-tight">
                  {item.name}
                </h3>

                <p className="text-sm text-white/80 mt-2 leading-relaxed">
                  {item.desc}
                </p>

                <div className="flex items-end justify-between mt-6 gap-3">

                  <div>
                    <p className="text-xs text-white/70">
                      Mulai dari
                    </p>

                    <p className="text-4xl font-bold">
                      Rp {new Intl.NumberFormat("id-ID").format(startPrice)}
                    </p>
                  </div>

                  <button
                    onClick={() => openModal(item)}
                    className="px-6 py-3 rounded-2xl bg-white/20 text-white font-semibold active:scale-95"
                  >
                    Beli →
                  </button>

                </div>

                <div className="mt-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/15">
                    {item.badge}
                  </span>
                </div>

              </div>
            </div>
          )
        })}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end justify-center">

          <div className="w-full max-w-md bg-white rounded-t-[34px] p-5 max-h-[92vh] overflow-y-auto">

            <div className="flex items-start justify-between gap-3">

              <div className="flex gap-3">

                <img
                  src={selected.logo}
                  className="w-16 h-16 rounded-2xl bg-gray-100 object-contain p-2 border"
                />

                <div>
                  <p className="text-sm text-gray-400">
                    Checkout Digital
                  </p>

                  <h3 className="text-2xl font-bold">
                    {selected.name}
                  </h3>

                  <p className="text-lg text-indigo-600 font-semibold">
                    {selected.brand}
                  </p>
                </div>

              </div>

              <button
                onClick={closeModal}
                className="w-12 h-12 rounded-2xl bg-gray-100 text-2xl"
              >
                ×
              </button>

            </div>

            <div className="mt-5 rounded-3xl border bg-indigo-50 p-4">

              <img
                src={selected.cover}
                className="w-full rounded-2xl object-cover"
              />

              <div className="mt-4 flex justify-between gap-4">

                <div>
                  <p className="text-sm text-gray-400">
                    Provider
                  </p>

                  <p className="text-2xl font-bold text-indigo-700">
                    {selected.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    Durasi
                  </p>

                  <p className="text-xl font-bold">
                    {variant}
                  </p>
                </div>

              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-end gap-3">

                <p className="text-sm text-gray-600 leading-relaxed">
                  {selected.desc}
                </p>

                <p className="text-3xl font-bold text-indigo-600 whitespace-nowrap">
                  Rp {new Intl.NumberFormat("id-ID").format(selectedPrice)}
                </p>

              </div>

            </div>

            {/* VARIANT */}
            <div className="mt-5">
              <p className="font-semibold mb-2">
                Pilih Paket
              </p>

              <div className="flex flex-wrap gap-2">
                {selected.variants.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => setVariant(v.name)}
                    className={`px-3 py-2 rounded-full text-sm border ${
                      variant === v.name
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT */}
            <div className="mt-5">
              <p className="font-semibold mb-2">
                {selected.id === "imei"
                  ? "Nomor IMEI / Nomor HP *"
                  : "Nomor Tujuan *"}
              </p>

              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Masukkan data tujuan"
                className="w-full border rounded-2xl px-4 py-4 outline-none"
              />
            </div>

            <button
              onClick={checkoutWhatsApp}
              className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold active:scale-[0.99]"
            >
              Checkout via WhatsApp
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default Digital