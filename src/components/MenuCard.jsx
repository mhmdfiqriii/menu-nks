function MenuCard({ item, onClick }) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const discount =
    item.originalPrice && item.originalPrice > item.price
      ? item.originalPrice - item.price
      : 0

  return (
    <div className="bg-white rounded-3xl border border-[#ffdede] p-4 shadow-sm hover:shadow-md transition-all">

      <div className="flex gap-4">

        <div className="w-24 h-24 rounded-2xl bg-[#fff5f5] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">

          <div>
            {item.badge && (
              <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-[#ffe3e3] text-[#DB0007] font-semibold mb-2">
                {item.badge}
              </span>
            )}

            <p className="font-bold text-gray-900 leading-snug">
              {item.name}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Fresh menu pilihan Kopi Kenangan
            </p>
          </div>

          <div className="mt-3">

            {item.originalPrice && (
              <p className="text-xs text-gray-400 line-through">
                Rp {format(item.originalPrice)}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 mt-1">

              <div>
                <p className="text-xl font-bold text-[#DB0007]">
                  Rp {format(item.price)}
                </p>

                {discount > 0 && (
                  <p className="text-[11px] text-green-600">
                    Hemat Rp {format(discount)}
                  </p>
                )}
              </div>

              <button
                onClick={onClick}
                className="bg-[#DB0007] text-white px-4 py-2 rounded-2xl text-sm font-semibold active:scale-95 transition-all"
              >
                Tambah
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default MenuCard