function MenuCard({ item, onClick }) {
  return (
    <div className="bg-white rounded-2xl border border-[#ffdede] p-4 shadow-sm hover:shadow-md transition-all">

      <div className="flex items-start justify-between gap-3">

        <div className="flex-1">
          <p className="font-semibold text-gray-900 leading-snug">
            {item.name}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Fresh menu pilihan Kopi Kenangan
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-[#DB0007]">
            Rp {new Intl.NumberFormat("id-ID").format(item.price)}
          </p>
        </div>

      </div>

      <button
        onClick={onClick}
        className="mt-4 w-full bg-[#DB0007] text-white py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-all"
      >
        Tambah Pesanan
      </button>

    </div>
  )
}

export default MenuCard