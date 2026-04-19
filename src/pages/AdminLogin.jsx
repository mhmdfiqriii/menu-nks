import { useState } from "react"

function AdminLogin({ setPage, showToast }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (loading) return

    if (!username || !password) {
      showToast("Isi semua field", "error")
      return
    }

    setLoading(true)

    // 🔐 LOGIN SEDERHANA (HARDCODE DULU)
    if (username === "admin" && password === "123") {
      showToast("Login berhasil")
      setTimeout(() => {
        setPage("admin")
      }, 500)
    } else {
      showToast("Username / Password salah", "error")
      setLoading(false)
    }
  }

  return (
    <div className="login-container">

      <div className="login-box">

        <h2 className="login-title">Admin Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-btn"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          onClick={() => setPage("home")}
          className="login-back"
        >
          Kembali
        </button>

      </div>

    </div>
  )
}

export default AdminLogin