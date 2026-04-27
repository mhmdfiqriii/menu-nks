function ModalOptions({
  item,
  selectedOptions,
  setSelectedOptions,
  onClose,
  onConfirm
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-5 animate-[scaleIn_.2s]">

        <h3 className="font-semibold mb-3">{item.name}</h3>

        {Object.entries(item.options).map(([key, values]) => (
          <div key={key} className="mb-3">
            <p className="text-xs text-gray-500 mb-1">{key}</p>

            <div className="flex flex-wrap gap-2">
              {values.map(v => {
                const active = selectedOptions[key] === v

                return (
                  <button
                    key={v}
                    onClick={() =>
                      setSelectedOptions(prev => ({ ...prev, [key]: v }))
                    }
                    className={`px-3 py-1 rounded-full text-xs border ${
                      active
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300"
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
          className="w-full bg-black text-white py-2 rounded-xl mt-2"
        >
          Tambah
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-100 py-2 rounded-xl mt-2 text-sm"
        >
          Batal
        </button>
      </div>
    </div>
  )
}

export default ModalOptions