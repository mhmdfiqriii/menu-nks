function WelcomeCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white via-emerald-50 to-cyan-50 p-5 shadow-sm card-shadow">

      {/* glow blur */}
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-sky-300/30 blur-3xl"></div>

      {/* top line */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>

      <div className="relative z-10">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border text-[10px] font-medium text-gray-600 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 soft-pulse"></span>
          Fast Order Service
        </div>

        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          Selamat Datang
        </h2>

        <h3 className="text-2xl font-extrabold leading-tight bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          di Nika Store!
        </h3>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          <span className="font-semibold text-gray-900">
            Jasdor Hemat & Cepat ⚡
          </span>
          <br />
          Dari kopi, makanan, hingga produk digital.
          Pilih kebutuhanmu,
          <span className="font-medium text-gray-900">
            {" "}kami urus sisanya.
          </span>
        </p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-2xl bg-white/70 border px-3 py-2 text-center">
            <p className="text-xs font-semibold text-gray-900">50%</p>
            <p className="text-[10px] text-gray-500">Promo</p>
          </div>

          <div className="rounded-2xl bg-white/70 border px-3 py-2 text-center">
            <p className="text-xs font-semibold text-gray-900">Fast</p>
            <p className="text-[10px] text-gray-500">Respon</p>
          </div>

          <div className="rounded-2xl bg-white/70 border px-3 py-2 text-center">
            <p className="text-xs font-semibold text-gray-900">Daily</p>
            <p className="text-[10px] text-gray-500">Deals</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WelcomeCard