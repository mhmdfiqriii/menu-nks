import { useNavigate } from "react-router-dom"

function Fore() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f6f7f2] p-4">

      <button
        onClick={() => navigate("/")}
        className="text-sm mb-4"
      >
        ← Kembali
      </button>

      <div className="rounded-3xl p-5 bg-white border shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#006041]/10 flex items-center justify-center mb-4">
          <span className="text-[#006041] font-bold">F</span>
        </div>

        <h1 className="text-2xl font-bold text-[#006041]">
          Fore Coffee
        </h1>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Kopi modern dengan rasa premium dan tampilan clean.
          Cocok buat manusia yang pura-pura produktif sambil pegang latte.
        </p>

        <div className="mt-5 rounded-2xl bg-[#006041] text-white p-4">
          <p className="text-xs opacity-80">COMING SOON</p>
          <p className="font-semibold mt-1">
            Menu Fore sedang disiapkan
          </p>
        </div>
      </div>

    </div>
  )
}

export default Fore