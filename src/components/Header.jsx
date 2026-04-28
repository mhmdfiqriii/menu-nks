function Header({ status }) {
  return (
    <div className="sticky top-0 z-50 glass border-b shadow-sm">

      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">

          <img
            src="https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/nika-store/logo.png"
            className="h-10 w-10 rounded-xl shadow-sm shrink-0"
          />

          <div className="min-w-0">
            <p className="font-bold text-sm tracking-wide text-gray-800 truncate">
              NIKA STORE
            </p>

            <div
              className={`mt-1 px-2 py-[3px] rounded-full inline-flex items-center gap-1 text-[10px] font-medium ${
                status === "online"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              Admin {status}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={() =>
            window.open("https://wa.me/6285704550839")
          }
          className="
          bg-green-700 text-white text-xs font-medium
          px-4 py-2 rounded-full
          shadow-md
          transition-all duration-300
          hover:bg-green-800 hover:-translate-y-[1px]
          active:scale-95
          cursor-pointer
          "
        >
          Hubungi
        </button>

      </div>
    </div>
  )
}

export default Header