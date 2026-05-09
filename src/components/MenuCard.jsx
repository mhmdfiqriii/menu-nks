function MenuCard({ item, onClick }) {
  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  const discount =
    (item.originalPrice || item.price) -
    item.price

  return (
    <div className="bg-white rounded-card border border-black/[0.04] p-3 card-shadow transition-all duration-300 active:scale-[0.985]">

      {/* IMAGE */}
      <div className="aspect-square bg-primary-soft rounded-[16px] overflow-hidden flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE */}
      <p className="text-sm font-semibold mt-2 leading-tight line-clamp-2">
        {item.name}
      </p>

      {/* PRICE */}
      <div className="mt-1 space-y-[2px]">
        <p className="text-xs text-gray-400 line-through">
          Rp {format(item.originalPrice || item.price)}
        </p>

        <p className="text-[15px] font-bold text-primary leading-tight">
          Rp {format(item.price)}
        </p>

        {discount > 0 && (
          <p className="text-[11px] text-green-600 leading-none">
            Hemat Rp {format(discount)}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={onClick}
        className="mt-3 w-full bg-primary text-white py-2.5 rounded-button text-xs font-semibold transition-all duration-200 active:scale-[0.97] active:opacity-90"
      >
        Tambah
      </button>

    </div>
  )
}

export default MenuCard