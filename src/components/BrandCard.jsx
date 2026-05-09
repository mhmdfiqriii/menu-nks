import { ChevronRight } from "lucide-react"

function BrandCard({ data, onClick }) {
  return (
    <div
      className="group rounded-3xl p-4 flex items-center justify-between border bg-white active:scale-[0.99] transition-all shadow-sm"
      style={{
        borderColor: `${data.color}22`
      }}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: `${data.color}15`
          }}
        >
          <img
            src={data.img}
            className="w-8 h-8 object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm truncate text-gray-900">
            {data.name}
          </p>

          <p className="text-xs leading-relaxed line-clamp-2 mt-1 text-gray-500">
            {data.desc}
          </p>
        </div>

      </div>

      <button
        onClick={onClick}
        className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 active:scale-95 text-white"
        style={{
          background: data.color
        }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default BrandCard