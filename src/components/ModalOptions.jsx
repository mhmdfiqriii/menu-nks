import { X } from "lucide-react"
import { useEffect } from "react"

function ModalOptions({
  item,
  selectedOptions,
  setSelectedOptions,
  onClose,
  onConfirm
}) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const isHot =
    selectedOptions["Temperature"] === "Hot"

  // AUTO RESET ICE LEVEL
  useEffect(() => {
    if (isHot && selectedOptions["Ice Level"]) {
      setSelectedOptions((prev) => {
        const copy = { ...prev }
        delete copy["Ice Level"]
        return copy
      })
    }
  }, [isHot])

const getLivePrice = () => {
  let price = item.price

  if (
    selectedOptions["Size"] === "Large"
    &&
    !item.disableLargeCharge
  ) {
    price += 5000
  }

  return price
}

  const requiredKeys =
    Object.keys(item.options || {})

  const isComplete =
    requiredKeys.every((key) =>
      key === "Ice Level"
        ? isHot || selectedOptions[key]
        : selectedOptions[key]
    )

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-end">

      <div className="w-full max-w-md mx-auto bg-white rounded-t-[32px] max-h-[88vh] flex flex-col premium-shadow-lg">

        {/* HEADER */}
        <div className="px-5 py-4 border-b border-black/[0.05] flex justify-between items-center">
          <p className="text-[14px] font-semibold">
            Detail Produk
          </p>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto space-y-4">

          <div className="text-center">
            <img
              src={item.image}
              className="w-full h-28 object-contain"
            />

            <p className="font-semibold mt-2 text-[13px]">
              {item.name}
            </p>

            <p className="text-[#DB0007] font-bold text-lg mt-1">
              Rp {format(getLivePrice())}
            </p>
          </div>

          {Object.entries(item.options).map(
            ([key, values]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <p className="text-[13px] font-semibold">
                    {key}
                  </p>
                  <span className="text-[11px] text-gray-400">
                    Wajib pilih 1
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {values.map((value) => {
                    const active =
                      selectedOptions[key] === value

                    const disabled =
                      key === "Ice Level" && isHot

                    return (
                      <button
                        key={value}
                        disabled={disabled}
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [key]: value
                          }))
                        }
                        className={`px-3 py-2 rounded-full text-[12px] border transition-all duration-200 ${
                          active
                            ? "bg-[#DB0007] text-white border-[#DB0007]"
                            : "bg-white text-gray-700"
                        } ${
                          disabled
                            ? "opacity-30 pointer-events-none"
                            : ""
                        }`}
                      >
                        {value}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          )}

        </div>

        {/* CTA */}
        <div className="p-4 border-t bg-white">
          <button
            disabled={!isComplete}
            onClick={onConfirm}
            className="w-full bg-[#DB0007] text-white py-3 rounded-xl font-semibold disabled:opacity-50 active:scale-95"
          >
            Tambah • Rp {format(getLivePrice())}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalOptions