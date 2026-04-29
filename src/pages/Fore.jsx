import { useNavigate } from "react-router-dom"
import { ChevronLeft, Coffee } from "lucide-react"

function Fore() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7f2]">

      <div className="sticky top-0 z-30 bg-[#006041]/90 backdrop-blur-md text-white border-b border-white/10">
        <div className="px-4 h-[64px] flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center active:scale-95"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex-1 px-3 leading-tight">
            <h1 className="font-bold text-[15px]">
              Fore Coffee
            </h1>
            <p className="text-[11px] text-white/75">
              Coming Soon
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Coffee size={18} />
          </div>

        </div>
      </div>

      <div className="p-4">
        <div className="rounded-3xl bg-white p-5 border shadow-sm">
          <p className="text-sm text-gray-500 leading-relaxed">
            Menu Fore sedang disiapkan. Kapitalisme butuh waktu.
          </p>
        </div>
      </div>

    </div>
  )
}

export default Fore