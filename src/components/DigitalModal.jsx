import { useState } from "react"
import {
  X,
  ExternalLink,
  Check,
  LoaderCircle
} from "lucide-react"

function DigitalModal({
  selected,
  variant,
  setVariant,
  target,
  setTarget,
  selectedPrice,
  closeModal,
  checkoutWhatsApp,
  loading
}) {
  const [checkedMap, setCheckedMap] = useState({})

  if (!selected) return null

  const isImei = selected.id === "imei"
  const checkKey = `${selected.id}-${variant}`
  const checked = checkedMap[checkKey] || false

  const canCheckout =
    loading || isImei
      ? true
      : checked && target.trim()

  const toggleCheck = () => {
    setCheckedMap((prev) => ({
      ...prev,
      [checkKey]: !checked
    }))
  }

  const handleCheckout = () => {
    if (loading) return

    if (!isImei) {
      if (!target.trim()) {
        alert("Isi nomor tujuan dulu.")
        return
      }

      if (!checked) {
        alert("Ceklis dulu kalau sudah cek area.")
        return
      }
    }

    checkoutWhatsApp()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-end justify-center fade-in">

      <div className="w-full max-w-md bg-white rounded-t-[38px] h-[85vh] overflow-hidden shadow-2xl slide-up relative">

        <div className="h-full overflow-y-auto p-5 pb-36">

          <div className="flex items-start justify-between gap-3">

            <div className="flex gap-3 min-w-0">

              <img
                src={selected.logo}
                alt={selected.name}
                className="w-14 h-14 rounded-2xl bg-gray-100 object-contain p-2 border shrink-0"
              />

              <div className="min-w-0">
                <p className="text-sm text-gray-400">
                  Checkout Digital
                </p>

                <h3 className="text-xl font-bold leading-tight text-gray-900">
                  {selected.name}
                </h3>

                <p className="text-base text-indigo-600 font-semibold">
                  {selected.brand}
                </p>
              </div>

            </div>

            <button
              onClick={closeModal}
              className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95"
            >
              <X size={20} />
            </button>

          </div>

          <div className="mt-5 rounded-3xl border border-indigo-100 bg-gradient-to-b from-indigo-50 to-white p-4">

            <img
              src={selected.cover}
              alt={selected.name}
              className="w-full rounded-2xl object-contain bg-white"
            />

            <div className="mt-4 flex justify-between gap-4">

              <div className="min-w-0">
                <p className="text-sm text-gray-400">
                  Provider
                </p>

                <p className="text-xl font-bold text-indigo-700 leading-tight">
                  {selected.name}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-400">
                  Paket
                </p>

                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {variant}
                </p>
              </div>

            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-end gap-3">

              <p className="text-sm text-gray-600 leading-relaxed max-w-[58%]">
                {selected.desc}
              </p>

              <p className="text-2xl font-bold text-indigo-600 whitespace-nowrap">
                Rp {new Intl.NumberFormat("id-ID").format(selectedPrice)}
              </p>

            </div>

          </div>

          <div className="mt-5">
            <p className="font-semibold mb-2 text-gray-900">
              Pilih Paket
            </p>

            <div className="flex flex-wrap gap-2">
              {selected.variants.map((v) => (
                <button
                  key={v.name}
                  onClick={() => setVariant(v.name)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all active:scale-95 ${
                    variant === v.name
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {!isImei && (
            <>
              <div className="mt-5 rounded-2xl bg-orange-50 border border-orange-200 p-4">
                <p className="font-semibold text-sm text-orange-800">
                  ⚠️ Informasi Kuota
                </p>

                <p className="text-sm text-orange-700 mt-2 leading-relaxed">
                  Kuota tergantung area masing-masing.
                  Silahkan cek area kamu terlebih dahulu untuk mengetahui estimasi kouta yang masuk.
                </p>

                <a
                  href="https://mhmdfiqriii.github.io/cek-area-akrab/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600"
                >
                  Cek Area
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="mt-5">
                <p className="font-semibold mb-2 text-gray-900">
                  Nomor Tujuan *
                </p>

                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Masukkan nomor tujuan"
                  className="w-full border rounded-2xl px-4 py-4 outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={toggleCheck}
                className={`mt-4 w-full rounded-2xl border p-4 flex items-start gap-3 text-left ${
                  checked
                    ? "bg-indigo-50 border-indigo-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 ${
                    checked
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-transparent"
                  }`}
                >
                  <Check size={15} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Saya sudah cek area kuota
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Jumlah kuota bisa berbeda tiap wilayah.
                  </p>
                </div>
              </button>
            </>
          )}

        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t p-4">

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-xs text-green-600 font-semibold">
              Admin online
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={!canCheckout}
            className={`w-full py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 ${
              canCheckout
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={20}
                  className="animate-spin"
                />
                Menghubungkan...
              </>
            ) : (
              "Checkout via WhatsApp"
            )}
          </button>

        </div>

      </div>
    </div>
  )
}

export default DigitalModal