import { useNavigate } from "react-router-dom"

function JanjiJiwa() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] p-4">

      <button
        onClick={() => navigate("/")}
        className="text-sm mb-4"
      >
        ← Kembali
      </button>

      <div className="rounded-3xl p-5 bg-white border shadow-sm">

        <div className="w-14 h-14 rounded-2xl bg-[#ff5052]/10 flex items-center justify-center mb-4">
          <span className="text-[#ff5052] font-bold">J</span>
        </div>

        <h1 className="text-2xl font-bold text-[#ff5052]">
          Janji Jiwa
        </h1>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Kopi dari hati untuk teman sejiwa.
          Branding manis, warna tegas, cocok untuk rakyat yang suka promo.
        </p>

        <div className="mt-5 rounded-2xl bg-[#ff5052] text-white p-4">
          <p className="text-xs opacity-80">COMING SOON</p>
          <p className="font-semibold mt-1">
            Menu Janji Jiwa sedang diproses
          </p>
        </div>

      </div>

    </div>
  )
}

export default JanjiJiwa