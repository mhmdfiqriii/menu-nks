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
  const [checkedMap, setCheckedMap] =
    useState({})

  if (!selected) return null

  const isImei = selected.id === "imei"

  const checkKey = `${selected.id}-${variant}`

  const checked =
    checkedMap[checkKey] || false

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
        alert(
          "Ceklis dulu kalau sudah cek area."
        )

        return
      }
    }

    checkoutWhatsApp()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-end justify-center fade-in">

      <div className="w-full max-w-md bg-white rounded-t-[32px] h-[88vh] overflow-hidden slide-up relative">

        {/* HANDLE */}
        <div className="pt-3 flex justify-center">
          <div className="w-14 h-1.5 rounded-full bg-gray-200"></div>
        </div>

        <div className="h-full overflow-y-auto px-4 pt-4 pb-36">

          {/* HEADER */}
          <div className="flex items-start justify-between gap-3">

            <div className="flex gap-3 min-w-0">

              <div className="w-14 h-14 rounded-2xl bg-[#f5f7ff] border border-[#e8ecff] flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={selected.logo}
                  alt={selected.name}
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[12px] text-gray-400">
                  Checkout Digital
                </p>

                <h3 className="text-[18px] font-bold leading-tight text-gray-900 mt-0.5">
                  {selected.name}
                </h3>

                <p className="text-[13px] text-indigo-600 font-semibold mt-1">
                  {selected.brand}
                </p>
              </div>

            </div>

            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center active:scale-95 shrink-0"
            >
              <X size={18} />
            </button>

          </div>

          {/* COVER */}
          <div className="mt-4 rounded-[26px] border border-[#edf0ff] bg-gradient-to-b from-[#f7f8ff] to-white p-3">

            <div className="rounded-[22px] bg-white overflow-hidden p-2 min-h-[190px] flex items-center justify-center">
              <img
                src={selected.cover}
                alt={selected.name}
                className="w-full object-contain bg-white"
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">

              <div className="min-w-0">
                <p className="text-[11px] text-gray-400">
                  Provider
                </p>

                <p className="text-[18px] font-bold text-indigo-700 leading-tight mt-1">
                  {selected.name}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[11px] text-gray-400">
                  Paket
                </p>

                <p className="text-[15px] font-semibold text-gray-900 mt-1">
                  {variant}
                </p>
              </div>

            </div>

            <div className="mt-4 pt-4 border-t flex items-end justify-between gap-3">

              <p className="text-[12px] text-gray-500 leading-relaxed max-w-[58%]">
                {selected.desc}
              </p>

              <p className="text-[24px] font-bold text-indigo-600 whitespace-nowrap leading-none">
                Rp{" "}
                {new Intl.NumberFormat(
                  "id-ID"
                ).format(selectedPrice)}
              </p>

            </div>

          </div>

          {/* PACKAGE */}
          <div className="mt-5">

            <p className="text-[14px] font-semibold text-gray-900 mb-2.5">
              Pilih Paket
            </p>

            <div className="flex flex-wrap gap-2">
              {selected.variants.map((v) => (
                <button
                  key={v.name}
                  onClick={() =>
                    setVariant(v.name)
                  }
                  className={`px-3 py-2 rounded-full text-[12px] border transition-all active:scale-95 ${
                    variant === v.name
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>

          </div>

          {/* KUOTA SECTION */}
          {!isImei && (
            <>
              <div className="mt-5 rounded-[24px] bg-orange-50 border border-orange-200 p-4">

                <p className="font-semibold text-[13px] text-orange-800">
                  ⚠️ Informasi Kuota
                </p>

                <p className="text-[12px] text-orange-700 mt-2 leading-relaxed">
                  Kuota tergantung area masing-masing.
                  Silahkan cek area kamu terlebih dahulu untuk mengetahui estimasi kouta yang masuk.
                </p>

                <a
                  href="https://mhmdfiqriii.github.io/cek-area-akrab/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-indigo-600"
                >
                  Cek Area
                  <ExternalLink size={13} />
                </a>

              </div>

              {/* INPUT */}
              <div className="mt-5">

                <p className="text-[14px] font-semibold text-gray-900 mb-2">
                  Nomor Tujuan *
                </p>

                <input
                  value={target}
                  onChange={(e) =>
                    setTarget(e.target.value)
                  }
                  placeholder="Masukkan nomor tujuan"
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-[14px] outline-none focus:border-indigo-500"
                />

              </div>

              {/* CHECK */}
              <button
                type="button"
                onClick={toggleCheck}
                className={`mt-4 w-full rounded-[22px] border p-4 flex items-start gap-3 text-left transition ${
                  checked
                    ? "bg-indigo-50 border-indigo-300"
                    : "bg-white border-gray-200"
                }`}
              >

                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    checked
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-transparent"
                  }`}
                >
                  <Check size={13} />
                </div>

                <div>
                  <p className="text-[13px] font-semibold text-gray-900">
                    Saya sudah cek area kuota
                  </p>

                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Jumlah kuota bisa berbeda tiap wilayah.
                  </p>
                </div>

              </button>
            </>
          )}

        </div>

        {/* CTA */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 p-4">

          <div className="flex items-center justify-center gap-2 mb-3">

            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

            <p className="text-[11px] text-green-600 font-semibold">
              Admin online
            </p>

          </div>

          <button
            onClick={handleCheckout}
            disabled={!canCheckout}
            className={`w-full py-3.5 rounded-[20px] text-[15px] font-bold flex items-center justify-center gap-2 transition ${
              canCheckout
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {loading ? (
              <>
                <LoaderCircle
                  size={18}
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