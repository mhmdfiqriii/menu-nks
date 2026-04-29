function DigitalCard({ item, onClick }) {
  const startPrice = item.variants?.[0]?.price || 0

  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${item.color} text-white p-4 relative overflow-hidden transition-all duration-200 active:scale-[0.98] active:shadow-[0_0_0_4px_rgba(255,255,255,.08)] shadow-[0_18px_40px_rgba(15,23,42,.18)]`}
    >
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10"></div>

      <div className="relative">

        <div className="flex items-start justify-between gap-3">

          <div className="flex gap-3 flex-1 min-w-0">

            <img
              src={item.logo}
              alt={item.name}
              className="w-14 h-14 rounded-2xl bg-white object-contain p-2 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-[10px] tracking-[3px] uppercase text-white/70">
                {item.brand}
              </p>

              <h3 className="text-2xl font-bold leading-tight mt-1">
                {item.name}
              </h3>

              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>

          </div>

          <span className="text-[11px] px-3 py-1.5 rounded-full bg-white/20 whitespace-nowrap">
            {item.variants?.[0]?.name}
          </span>

        </div>

        <div className="mt-4 flex items-end justify-between gap-3">

          <div>
            <p className="text-[11px] text-white/70">
              Mulai dari
            </p>

            <p className="text-3xl font-bold leading-none mt-1">
              Rp {new Intl.NumberFormat("id-ID").format(startPrice)}
            </p>
          </div>

          <button
            onClick={onClick}
            className="px-5 py-3 rounded-2xl bg-white/20 backdrop-blur text-sm font-semibold active:scale-95"
          >
            Checkout →
          </button>

        </div>

        <div className="mt-3">
          <span className="text-[11px] px-3 py-1 rounded-full bg-white/15">
            {item.badge}
          </span>
        </div>

      </div>
    </div>
  )
}

export default DigitalCard