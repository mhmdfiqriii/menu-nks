// src/components/MenuCard.jsx
function MenuCard({ item, onClick }) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const discount =
    (item.originalPrice || item.price) -
    item.price

  return (
    <div className="bg-white rounded-3xl border border-[#ffe3e3] p-3 shadow-sm">

      <div className="w-full h-28 rounded-2xl bg-[#fff7f7] overflow-hidden mb-3 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      <p className="font-bold text-[15px] leading-tight min-h-[44px]">
        {item.name}
      </p>

      <p className="text-xs text-gray-400 line-through mt-2">
        Rp {format(item.originalPrice || item.price)}
      </p>

      <p className="text-xl font-bold text-[#DB0007] leading-none mt-1">
        Rp {format(item.price)}
      </p>

      {discount > 0 && (
        <p className="text-[11px] text-green-600 mt-1">
          Hemat Rp {format(discount)}
        </p>
      )}

      <button
        onClick={onClick}
        className="mt-3 w-full bg-[#DB0007] text-white py-2.5 rounded-2xl font-semibold active:scale-95"
      >
        Tambah
      </button>

    </div>
  )
}

export default MenuCard