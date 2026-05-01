import { X } from "lucide-react"

function ModalOptions({
  item,
  selectedOptions,
  setSelectedOptions,
  onClose,
  onConfirm
}) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const getLivePrice = () => {
    let price = item.price

    if (
      selectedOptions["Size"] === "Large"
    ) {
      price += 6000
    }

    return price
  }

  const requiredKeys =
    Object.keys(item.options || {})

  const isComplete =
    requiredKeys.every(
      (key) => selectedOptions[key]
    )

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-[34px] p-5 max-h-[92vh] overflow-y-auto">

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-bold">
              Detail Produk
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Pilih opsi dulu. Manusia
              memang suka ribet.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl border flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 rounded-3xl border p-4 bg-[#fffafa]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-contain"
          />

          <p className="font-bold text-2xl mt-4">
            {item.name}
          </p>

          <p className="text-3xl font-bold text-[#DB0007] mt-3">
            Rp {format(getLivePrice())}
          </p>
        </div>

        <div className="mt-5 space-y-5">
          {Object.entries(
            item.options
          ).map(([key, values]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <p className="font-semibold">
                  {key}
                </p>

                <p className="text-xs text-gray-400">
                  wajib pilih 1
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {values.map((value) => {
                  const active =
                    selectedOptions[
                      key
                    ] === value

                  return (
                    <button
                      key={value}
                      onClick={() =>
                        setSelectedOptions(
                          (
                            prev
                          ) => ({
                            ...prev,
                            [key]:
                              value
                          })
                        )
                      }
                      className={`px-4 py-2 rounded-2xl text-sm border ${
                        active
                          ? "bg-[#DB0007] text-white border-[#DB0007]"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          disabled={!isComplete}
          onClick={() =>
            isComplete &&
            onConfirm()
          }
          className={`mt-6 w-full py-4 rounded-2xl text-lg font-bold ${
            isComplete
              ? "bg-[#DB0007] text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          Tambah • Rp{" "}
          {format(getLivePrice())}
        </button>

      </div>
    </div>
  )
}

export default ModalOptions