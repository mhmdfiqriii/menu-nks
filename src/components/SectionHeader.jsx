function SectionHeader({ title, tags = [] }) {
  return (
    <div className="relative overflow-hidden rounded-xl p-3 bg-gradient-to-r from-green-50 to-blue-50 border shimmer">

      {/* glow subtle */}
      <div className="absolute inset-0 opacity-20 blur-xl bg-gradient-to-r from-green-300 to-blue-300"></div>

      <div className="relative flex items-center justify-between">

        {/* LEFT */}
        <div className="text-sm font-semibold flex items-center gap-2 text-gray-800">
          {title}
        </div>

        {/* RIGHT TAG */}
        <div className="flex gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`
                text-[10px] px-2 py-1 rounded-full font-medium shadow-sm
                ${i === 0 
                  ? "bg-yellow-400 text-white animate-pulse" 
                  : "bg-white/70 text-gray-700 backdrop-blur"
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