import { ChevronRight } from "lucide-react"

function BrandCard({ data, onClick }) {
  const isDigital = data.path === "/digital"

  return (
    <div
      className={`
        group rounded-3xl p-4 flex items-center justify-between border
        active:scale-[0.99] transition-all shadow-sm
        ${isDigital
          ? "bg-gradient-to-r from-indigo-950 via-indigo-800 to-violet-700 border-transparent"
          : "bg-white"
        }
      `}
      style={
        !isDigital
          ? { borderColor: `${data.color}22` }
          : {}
      }
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: isDigital
              ? "rgba(255,255,255,0.12)"
              : `${data.color}15`
          }}
        >
          <img
            src={data.img}
            className="w-8 h-8 object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={`font-semibold text-sm truncate ${
              isDigital ? "text-white" : "text-gray-900"
            }`}
          >
            {data.name}
          </p>

          <p
            className={`text-xs leading-relaxed line-clamp-2 mt-1 ${
              isDigital ? "text-white/75" : "text-gray-500"
            }`}
          >
            {data.desc}
          </p>
        </div>

      </div>

      <button
        onClick={onClick}
        className={`
          w-10 h-10 rounded-2xl flex items-center justify-center
          shrink-0 active:scale-95
          ${isDigital
            ? "bg-white/15 text-white"
            : "text-white"
          }
        `}
        style={
          !isDigital
            ? { background: data.color }
            : {}
        }
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default BrandCard