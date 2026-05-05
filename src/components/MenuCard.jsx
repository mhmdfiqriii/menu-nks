function MenuCard({ item, onClick }) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const discount =
    (item.originalPrice || item.price) -
    item.price

  return (
    <div className="bg-white rounded-card border border-border-soft p-2.5 shadow-card">

      {/* IMAGE */}
      <div className="h-20 bg-primary-soft rounded-button flex items-center justify-center overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full object-contain"
        />
      </div>

      {/* TITLE */}
      <p className="text-sm font-semibold mt-2 leading-tight min-h-[32px] line-clamp-2">
        {item.name}
      </p>

      {/* PRICE */}
      <p className="text-xs text-gray-400 line-through mt-1">
        Rp {format(item.originalPrice || item.price)}
      </p>

      <p className="text-md font-bold text-primary leading-tight">
        Rp {format(item.price)}
      </p>

      {discount > 0 && (
        <p className="text-xs text-green-600 leading-none">
          Hemat Rp {format(discount)}
        </p>
      )}

      {/* BUTTON */}
      <button
        onClick={onClick}
        className="mt-2 w-full bg-primary text-white py-2 rounded-button text-xs font-semibold active:scale-95 transition"
      >
        Tambah
      </button>

    </div>
  )
}

export default MenuCard