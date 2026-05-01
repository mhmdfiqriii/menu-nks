function MenuCard({ item, onClick }) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const discount =
    item.originalPrice - item.price

  return (
    <div className="bg-white rounded-3xl border border-[#ffe3e3] p-4 shadow-sm">

      <div className="flex gap-4">

        <div className="w-20 h-20 rounded-2xl bg-[#fff7f7] overflow-hidden shrink-0 flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">

          {item.badge && (
            <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-[#ffe5e5] text-[#DB0007] font-semibold mb-2">
              {item.badge}
            </span>
          )}

          <p className="font-bold text-lg text-gray-900 leading-tight">
            {item.name}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Fresh menu pilihan Kopi Kenangan
          </p>

          <p className="text-sm line-through text-gray-400 mt-3">
            Rp {format(item.originalPrice)}
          </p>

          <div className="flex items-end justify-between mt-1 gap-3">
            <div>
              <p className="text-2xl font-bold text-[#DB0007]">
                Rp {format(item.price)}
              </p>

              <p className="text-xs text-green-600">
                Hemat Rp {format(discount)}
              </p>
            </div>

            <button
              onClick={onClick}
              className="bg-[#DB0007] text-white px-5 py-2.5 rounded-2xl font-semibold active:scale-95"
            >
              Tambah
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default MenuCard