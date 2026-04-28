function DigitalModal({
  selected,
  variant,
  setVariant,
  target,
  setTarget,
  selectedPrice,
  closeModal,
  checkoutWhatsApp
}) {
  if (!selected) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-end justify-center">

      <div className="w-full max-w-md bg-white rounded-t-[34px] p-5 max-h-[92vh] overflow-y-auto slide-up">

        <div className="flex items-start justify-between gap-3">

          <div className="flex gap-3">

            <img
              src={selected.logo}
              alt={selected.name}
              className="w-16 h-16 rounded-2xl bg-gray-100 object-contain p-2 border"
            />

            <div>
              <p className="text-sm text-gray-400">
                Checkout Digital
              </p>

              <h3 className="text-2xl font-bold leading-tight">
                {selected.name}
              </h3>

              <p className="text-lg text-indigo-600 font-semibold">
                {selected.brand}
              </p>
            </div>

          </div>

          <button
            onClick={closeModal}
            className="w-12 h-12 rounded-2xl bg-gray-100 text-2xl active:scale-95"
          >
            ×
          </button>

        </div>

        <div className="mt-5 rounded-3xl border bg-indigo-50 p-4">

          <img
            src={selected.cover}
            alt={selected.name}
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

        <div className="mt-5">
          <p className="font-semibold mb-2">
            Pilih Paket
          </p>

          <div className="flex flex-wrap gap-2">
            {selected.variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setVariant(v.name)}
                className={`px-3 py-2 rounded-full text-sm border transition-all ${
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
            className="w-full border rounded-2xl px-4 py-4 outline-none focus:border-indigo-500"
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
  )
}

export default DigitalModal