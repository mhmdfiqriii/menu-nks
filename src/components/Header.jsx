function Header({ status }) {
  return (
    <div className="sticky top-0 z-50 glass border-b">

      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img
            src="https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/logo-nks.png"
            className="h-10 w-10 rounded-xl shadow-sm"
          />

          <div>
            <p className="font-bold text-sm tracking-wide">NIKA STORE</p>

            <div className={`text-[10px] mt-1 px-2 py-[2px] rounded-full inline-flex items-center gap-1 ${
              status === "online"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              Admin {status}
            </div>
          </div>
        </div>

        <button
          onClick={() => window.open("https://wa.me/6285704550839")}
          className="bg-green-700 hover:bg-green-800 active:scale-95 transition-all text-white text-xs px-4 py-2 rounded-full shadow-sm cursor-pointer"
        >
          Hubungi
        </button>

      </div>
    </div>
  )
}

export default Header