function DigitalCard({ item, onClick }) {
  const startPrice =
    item.variants?.[0]?.price || 0

  return (
    <div
      className={`rounded-[28px] bg-gradient-to-br ${item.color} text-white p-4 relative overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,.14)]`}
    >

      <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-white/10"></div>

      <div className="relative">

        <div className="flex items-start justify-between gap-3">

          <div className="flex gap-3 flex-1 min-w-0">

            {/* LOGO */}
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 overflow-hidden p-2">

              <img
                src={item.logo}
                alt={item.name}
                className="w-full h-full object-contain"
              />

            </div>

            {/* CONTENT */}
            <div className="min-w-0">

              <p className="text-[9px] tracking-[2px] uppercase text-white/65 font-medium">
                {item.brand}
              </p>

              <h3 className="text-[20px] font-bold leading-tight mt-1">
                {item.name}
              </h3>

              <p className="text-[12px] text-white/75 mt-1 leading-relaxed line-clamp-2">
                {item.desc}
              </p>

            </div>

          </div>

          {/* BADGE */}
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/15 whitespace-nowrap shrink-0">
            {item.variants?.[0]?.name}
          </span>

        </div>

        {/* FOOTER */}
        <div className="mt-4 flex items-end justify-between gap-3">

          <div>

            <p className="text-[10px] text-white/65">
              Mulai dari
            </p>

            <p className="text-[24px] font-bold leading-none mt-1">
              Rp{" "}
              {new Intl.NumberFormat(
                "id-ID"
              ).format(startPrice)}
            </p>

          </div>

          <button
            onClick={onClick}
            className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur text-[12px] font-semibold active:scale-95 transition"
          >
            Checkout
          </button>

        </div>

        {/* BOTTOM BADGE */}
        <div className="mt-3">

          <span className="text-[10px] px-3 py-1 rounded-full bg-white/12">
            {item.badge}
          </span>

        </div>

      </div>

    </div>
  )
}

export default DigitalCard