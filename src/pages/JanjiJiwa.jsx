import { useNavigate } from "react-router-dom"

function JanjiJiwa() {
    const navigate = useNavigate()
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
    <button onClick={() => navigate("/")}>← Kembali</button>

      <h2>Janji Jiwa</h2>
      <p>Coming Soon 🚧</p>
    </div>
  )
}

export default JanjiJiwa