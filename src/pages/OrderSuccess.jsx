import { useLocation, useNavigate } from "react-router-dom"
import { CheckCircle2, MessageCircle } from "lucide-react"

function OrderSuccess() {

  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state) {
    navigate("/")
    return null
  }

  const {
    orderId,
    total,
    customerName,
    whatsappText
  } = state

  const formatPrice = (num) =>
    new Intl.NumberFormat("id-ID").format(num)

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/62895601988558?text=" +
        encodeURIComponent(whatsappText),
      "_blank"
    )
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fafafa] flex items-center justify-center p-4">

      <div className="w-full rounded-[32px] bg-white border border-border-soft shadow-card p-6 text-center">

        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">

          <CheckCircle2
            size={42}
            className="text-green-600"
          />

        </div>

        <p className="mt-5 text-xs font-semibold tracking-[2px] text-green-600 uppercase">
          Order Berhasil
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          Pesananmu Sudah Masukk
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mt-3">
          Order sedang menunggu konfirmasi admin.
          Silakan lanjut ke WhatsApp untuk
          proses pembayaran dan validasi pesanan.
        </p>

        <div className="mt-6 rounded-3xl bg-[#fafafa] border p-4 text-left space-y-3">

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              No. Order
            </span>

            <span className="font-semibold">
              {orderId}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Pemesan
            </span>

            <span className="font-semibold">
              {customerName}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Total
            </span>

            <span className="font-bold text-primary">
              Rp {formatPrice(total)}
            </span>
          </div>

        </div>

        <button
          onClick={openWhatsApp}
          className="mt-6 w-full rounded-button bg-green-600 text-white py-3.5 font-semibold flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <MessageCircle size={18} />
          Lanjut ke WhatsApp
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-3 w-full rounded-button border py-3 text-sm font-medium text-gray-700"
        >
          Kembali ke Home
        </button>

      </div>

    </div>
  )
}

export default OrderSuccess