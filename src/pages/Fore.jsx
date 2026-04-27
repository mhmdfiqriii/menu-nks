import { useNavigate } from "react-router-dom"

function Fore() {
    const navigate = useNavigate()
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <button onClick={() => navigate("/")}>← Kembali</button>

      <h2>Fore</h2>
      <p>Coming Soon 🚧</p>
      
    </div>
  )
}

export default Fore