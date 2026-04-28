function DigitalCard({ item, onClick }) {
  const startPrice = item.variants?.[0]?.price || 0

  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${item.color} text-white p-5 shadow-xl relative overflow-hidden card-shadow active:scale-[0.99] transition-all duration-200`}
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10"></div>
      <div className="absolute -left-10 bottom-0 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

      <div className="relative">

        <div className="flex items-start justify-between gap-3">
          <img
            src={item.logo}
            alt={item.name}
            className="w-16 h-16 rounded-2xl bg-white object-contain p-2"
          />

          <span className="text-xs px-3 py-2 rounded-full bg-white/20 backdrop-blur">
            {item.variants?.[0]?.name}
          </span>
        </div>

        <p className="text-xs tracking-[3px] uppercase text-white/70 mt-5">
          {item.brand}
        </p>

        <h3 className="text-3xl font-bold mt-2 leading-tight">
          {item.name}
        </h3>

        <p className="text-sm text-white/80 mt-2 leading-relaxed">
          {item.desc}
        </p>

        <div className="flex items-end justify-between mt-6 gap-3">

          <div>
            <p className="text-xs text-white/70">
              Mulai dari
            </p>

            <p className="text-4xl font-bold leading-none mt-1">
              Rp {new Intl.NumberFormat("id-ID").format(startPrice)}
            </p>
          </div>

          <button
            onClick={onClick}
            className="px-6 py-3 rounded-2xl bg-white/20 text-white font-semibold active:scale-95 transition-all"
          >
            Beli →
          </button>

        </div>

        <div className="mt-4">
          <span className="text-xs px-3 py-1 rounded-full bg-white/15">
            {item.badge}
          </span>
        </div>

      </div>
    </div>
  )
}

export default DigitalCard