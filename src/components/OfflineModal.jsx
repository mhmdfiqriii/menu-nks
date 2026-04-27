function OfflineModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 text-center">

        <div className="text-3xl mb-2">😔</div>

        <h3 className="font-semibold text-lg">
          Layanan Sedang Tutup
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Admin sedang offline. Silakan hubungi admin
          untuk informasi lebih lanjut.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-gray-200 py-2 rounded-xl mt-4"
        >
          Kembali
        </button>

        <button
          onClick={() => window.open("https://wa.me/6285704550839")}
          className="w-full bg-green-500 text-white py-2 rounded-xl mt-2"
        >
          Chat Admin
        </button>

      </div>
    </div>
  )
}

export default OfflineModal