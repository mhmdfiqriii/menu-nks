import { MessageCircle } from "lucide-react"

function Header({ status }) {
  const online = status === "online"

  return (
    <div className="sticky top-0 z-50 glass border-b border-white/30">
      <div className="max-w-md mx-auto px-4 h-[64px] flex items-center justify-between gap-3">

        <div className="flex items-center gap-3 min-w-0">

          <img
            src="https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/woffel-store/logo.png"
            className="w-11 h-11 rounded-2xl object-cover shrink-0 shadow-sm"
          />

          <div className="min-w-0 leading-tight">
            <p className="font-bold text-[13px] tracking-wide text-gray-900 truncate">
              WOFFEL STORE
            </p>

            <div
              className={`mt-1 inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-semibold ${
                online
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
              Admin {status}
            </div>
          </div>

        </div>

        <button
          onClick={() => window.open("https://wa.me/6285704550839")}
          className="h-10 px-4 rounded-2xl bg-green-600 text-white text-xs font-semibold flex items-center gap-2 active:scale-95 transition-all shadow-md"
        >
          <MessageCircle size={15} />
          Chat Admin
        </button>

      </div>
    </div>
  )
}

export default Header