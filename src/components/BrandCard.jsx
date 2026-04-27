function BrandCard({ data, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex items-center justify-between border shadow-sm 
      hover:shadow-md transition-all duration-200"
      style={{ borderColor: `${data.color}20` }}
    >
      <div className="flex items-center gap-3 flex-1 select-none">

        <div
          className="p-2 rounded-xl"
          style={{ background: `${data.color}15` }}
        >
          <img src={data.img} className="h-8 w-8 object-contain" />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm">{data.name}</p>

          <p className="text-xs text-gray-500 line-clamp-2">
            {data.desc}
          </p>
        </div>
      </div>

      <button
        onClick={onClick}
        className="w-10 h-10 flex items-center justify-center rounded-xl text-white shadow 
        transition-all duration-200 active:scale-90 hover:scale-105 cursor-pointer"
        style={{ background: data.color }}
      >
        →
      </button>
    </div>
  )
}

export default BrandCard