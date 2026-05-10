function CheckoutBar({ total, onClick, loading }) {
  return (
    <div className="fixed bottom-4 left-0 w-full px-3 z-40">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3 rounded-[24px] border border-white/60 bg-white/88 backdrop-blur-xl px-4 py-4 premium-shadow">

        <div>
          <p className="text-xs text-gray-500">Total</p>
          <h3 className="font-semibold">
            Rp {new Intl.NumberFormat("id-ID").format(total)}
          </h3>
        </div>

        <button
          onClick={onClick}
          disabled={loading}
          className="bg-primary text-white px-6 py-3 rounded-button text-sm font-semibold w-1/2 transition-all duration-200 active:scale-[0.97]"
        >
          {loading ? "Loading..." : "Checkout"}
        </button>
      </div>
    </div>
  )
}

export default CheckoutBar