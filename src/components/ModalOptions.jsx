function ModalOptions({
  item,
  selectedOptions,
  setSelectedOptions,
  onClose,
  onConfirm
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center px-4">

      <div className="w-full max-w-sm rounded-3xl bg-white p-5 border border-[#ffe1e1] shadow-xl">

        <div className="mb-4">
          <p className="text-lg font-bold text-[#DB0007]">
            {item.name}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Pilih varian dulu. Hidup memang penuh opsi.
          </p>
        </div>

        {Object.entries(item.options).map(([key, values]) => (
          <div key={key} className="mb-4">

            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              {key}
            </p>

            <div className="flex flex-wrap gap-2">
              {values.map(v => {
                const active = selectedOptions[key] === v

                return (
                  <button
                    key={v}
                    onClick={() =>
                      setSelectedOptions(prev => ({
                        ...prev,
                        [key]: v
                      }))
                    }
                    className={`px-3 py-2 rounded-full text-xs border transition-all ${
                      active
                        ? "bg-[#DB0007] text-white border-[#DB0007]"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {v}
                  </button>
                )
              })}
            </div>

          </div>
        ))}

        <button
          onClick={onConfirm}
          className="w-full bg-[#DB0007] text-white py-3 rounded-2xl font-medium active:scale-95 transition-all"
        >
          Tambah ke Keranjang
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-100 text-gray-700 py-3 rounded-2xl text-sm"
        >
          Batal
        </button>

      </div>

    </div>
  )
}

export default ModalOptions