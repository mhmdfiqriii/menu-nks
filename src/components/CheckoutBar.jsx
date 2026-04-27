function CheckoutBar({ total, onClick, loading }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">

        <div>
          <p className="text-xs text-gray-500">Total</p>
          <h3 className="font-semibold">
            Rp {new Intl.NumberFormat("id-ID").format(total)}
          </h3>
        </div>

        <button
          onClick={onClick}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl text-sm w-1/2"
        >
          {loading ? "Loading..." : "Checkout"}
        </button>
      </div>
    </div>
  )
}

export default CheckoutBar