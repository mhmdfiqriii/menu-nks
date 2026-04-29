import { MessageCircle, MoonStar } from "lucide-react"

function OfflineModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center px-4">

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl">

        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
          <MoonStar size={24} />
        </div>

        <h3 className="text-lg font-bold text-center mt-4">
          Layanan Sedang Tutup
        </h3>

        <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
          Admin sedang offline. Manusia juga butuh istirahat, tragis memang.
        </p>

        <button
          onClick={() => window.open("https://wa.me/6285704550839")}
          className="w-full h-12 rounded-2xl bg-green-600 text-white font-semibold mt-5 flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Chat Admin
        </button>

        <button
          onClick={onClose}
          className="w-full h-12 rounded-2xl bg-gray-100 text-gray-700 font-semibold mt-2"
        >
          Kembali
        </button>

      </div>

    </div>
  )
}

export default OfflineModal