function MenuCard({ item, onClick }) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const discount =
    (item.originalPrice || item.price) -
    item.price

  return (
    <div className="bg-white rounded-2xl border border-[#f3dede] p-2.5 shadow-sm">

      <div className="w-full h-24 rounded-xl bg-[#fff8f8] overflow-hidden mb-2 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      <p className="font-semibold text-[13px] leading-[1.25] min-h-[34px] text-gray-900">
        {item.name}
      </p>

      <p className="text-[11px] text-gray-400 line-through mt-1">
        Rp {format(item.originalPrice || item.price)}
      </p>

      <p className="text-[15px] font-bold text-[#DB0007] leading-none mt-1">
        Rp {format(item.price)}
      </p>

      {discount > 0 && (
        <p className="text-[10px] text-green-600 mt-1">
          Hemat Rp {format(discount)}
        </p>
      )}

      <button
        onClick={onClick}
        className="mt-2 w-full bg-[#DB0007] text-white py-2 rounded-xl text-[13px] font-semibold active:scale-95 transition-all"
      >
        Tambah
      </button>

    </div>
  )
}

export default MenuCard