import { X } from "lucide-react"

function TutorialModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-xl">

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-gray-900">
              Tutorial Pemesanan
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Biar user gak spam admin. Langka sekali.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl border flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-3 text-[15px] leading-7 text-gray-700">
          <p>1. Pilih produk yang kamu mau.</p>
          <p>2. Kalau minuman, isi varian wajib dulu.</p>
          <p>3. Tekan tombol Tambah ke keranjang.</p>
          <p>4. Buka keranjang untuk review pesanan.</p>
          <p>5. Isi nama, outlet pickup, dan waktu.</p>
          <p>6. Checkout lalu lanjut ke WhatsApp admin.</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#DB0007] text-white py-3 rounded-2xl font-bold"
        >
          Saya mengerti
        </button>

      </div>

    </div>
  )
}

export default TutorialModal