function CheckoutBar({
  total,
  onClick,
  loading
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-40">

      <div className="max-w-md mx-auto rounded-[24px] bg-white border border-[#ececec] shadow-[0_10px_30px_rgba(15,23,42,.08)] p-4 flex items-center justify-between gap-4">

        <div className="min-w-0">
          <p className="text-[11px] text-gray-400">
            Total Pembayaran
          </p>

          <h3 className="font-bold text-[18px] leading-tight mt-1 text-gray-900">
            Rp{" "}
            {new Intl.NumberFormat(
              "id-ID"
            ).format(total)}
          </h3>
        </div>

        <button
          onClick={onClick}
          disabled={loading}
          className={`px-5 py-3 rounded-2xl text-sm font-semibold transition active:scale-[0.98] ${
            loading
              ? "bg-gray-200 text-gray-400"
              : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
          }`}
        >
          {loading
            ? "Loading..."
            : "Checkout"}
        </button>

      </div>

    </div>
  )
}

export default CheckoutBar