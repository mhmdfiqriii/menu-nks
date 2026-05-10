function SectionHeader({ title, tags = [] }) {
  return (
    <div className="relative overflow-hidden rounded-[22px] px-4 py-3 bg-gradient-to-r from-emerald-50 via-cyan-50 to-sky-50 border border-white/70 card-shadow shimmer">

      {/* glow subtle */}
      <div className="absolute inset-0 opacity-20 blur-xl bg-gradient-to-r from-green-300 to-blue-300"></div>

      <div className="relative flex items-center justify-between gap-3">

        {/* LEFT */}
        <div className="flex items-center min-w-0">
          <h2 className="text-[13px] font-semibold tracking-[0.2px] text-gray-800 whitespace-nowrap">
            {title}
          </h2>
        </div>

        {/* RIGHT TAG */}
        <div className="flex items-center gap-2 shrink-0">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`
                whitespace-nowrap
                text-[10px]
                px-3 py-1.5
                rounded-full
                font-medium
                shadow-sm
                transition-all
                duration-200
                ${i === 0
                  ? "bg-yellow-400 text-white animate-pulse"
                  : "bg-white/80 text-gray-700 backdrop-blur-md border border-white/70"
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SectionHeader