import { X } from "lucide-react"

function TutorialModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-auto max-w-md bg-white rounded-3xl p-5 shadow-xl">

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-gray-900">
              Tutorial Pemesanan
            </p>

            <p className="text-[12px] text-gray-400 mt-1">
              Ikuti langkah berikut sebelum checkout.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-2xl border flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="text-[13px] leading-7 text-gray-700">
          <p>1. <b>Pilih Produk:</b> Klik "Tambah" pada katalog untuk memasukan ke keranjang.</p>
          <p>2. <b>Cek Keranjang:</b> Klik "Lihat Keranjang" dibawah untuk review pesanan.</p>
          <p>3. <b>Isi Data:</b> Masukan nama, Lokasi outlet pickup, Jam pengambilan.</p>
          <p>4. <b>Proses Order:</b> Klik "Pesan Sekarang", data tersimpan dan kamu diarahkan ke WhatsApp Admin NKS.</p>
          <p>5. <b>Pickup / Delivery:</b> Ikuti instruksi admin untuk pembayaran & pengambilan pesanan.</p>
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