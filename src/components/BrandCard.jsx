function BrandCard({ data, onClick }) {
  return (
    <div
      className="
      group bg-white/90 backdrop-blur-sm
      rounded-2xl p-4 flex items-center justify-between
      border shadow-sm
      transition-all duration-300 ease-out
      hover:-translate-y-[2px] hover:shadow-lg
      "
      style={{ borderColor: `${data.color}25` }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1 select-none min-w-0">

        <div
          className="
          p-2 rounded-xl shrink-0
          transition-all duration-300
          group-hover:scale-110 group-hover:rotate-3
          "
          style={{ background: `${data.color}15` }}
        >
          <img
            src={data.img}
            className="h-8 w-8 object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-800 truncate">
            {data.name}
          </p>

          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed pr-2">
            {data.desc}
          </p>
        </div>
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={onClick}
        className="
        w-10 h-10 shrink-0
        flex items-center justify-center
        rounded-xl text-white shadow-md
        transition-all duration-300
        hover:scale-110 hover:rotate-6
        active:scale-90
        cursor-pointer
        "
        style={{ background: data.color }}
      >
        →
      </button>
    </div>
  )
}

export default BrandCard