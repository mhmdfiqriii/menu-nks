function WelcomeCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 p-5 rounded-2xl border shadow-sm">

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>

      <h2 className="text-xl font-bold leading-tight">
        Selamat Datang
      </h2>

      <h3 className="text-lg font-bold text-green-700">
        di Nika Store!
      </h3>

      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
        <span className="font-semibold text-gray-800">
          Jasdor Hemat & Cepat ⚡
        </span>
        <br />
        Dari kopi, makanan, hingga produk digital.
        Pilih kebutuhanmu,{" "}
        <span className="font-medium text-gray-800">
          kami urus sisanya.
        </span>
      </p>

    </div>
  )
}

export default WelcomeCard