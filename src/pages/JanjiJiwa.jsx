import { useNavigate } from "react-router-dom"
import { ChevronLeft, Coffee } from "lucide-react"

function JanjiJiwa() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7]">

      <div className="sticky top-0 bg-[#ff5052] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex-1 px-3">
            <h1 className="font-bold text-lg">Janji Jiwa</h1>
            <p className="text-xs text-white/75">Coming Soon</p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Coffee size={18} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="rounded-3xl bg-white p-5 border shadow-sm">
          <p className="text-sm text-gray-500 leading-relaxed">
            Menu Janji Jiwa sedang diproses. Janji mudah, deploy sulit.
          </p>
        </div>
      </div>

    </div>
  )
}

export default JanjiJiwa