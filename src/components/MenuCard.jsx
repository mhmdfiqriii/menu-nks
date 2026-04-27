function MenuCard({ item, onClick }) {
  return (
    <div className="bg-white rounded-2xl p-4 border hover:shadow-md transition">
      <p className="font-semibold">{item.name}</p>
      <p className="text-sm text-gray-500 mt-1">
        Rp {new Intl.NumberFormat("id-ID").format(item.price)}
      </p>

      <button
        onClick={onClick}
        className="mt-3 w-full bg-black text-white py-2 rounded-xl text-sm active:scale-95"
      >
        Tambah
      </button>
    </div>
  )
}

export default MenuCard