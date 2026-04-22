import { useState } from "react"
import Admin from "./pages/Admin"
import AdminLogin from "./pages/AdminLogin"
import Kopken from "./pages/Kopken"
import Fore from "./pages/Fore"
import JanjiJiwa from "./pages/JanjiJiwa"

function App() {
  const [page, setPage] = useState("home")
  const [menuType, setMenuType] = useState("fnb")

  const brands = [
    { name: "Kopi Kenangan" },
    { name: "Fore" },
    { name: "Janji Jiwa" }
  ]

  const brandImages = {
    "Kopi Kenangan": "/kopken.png",
    "Fore": "/fore.png",
    "Janji Jiwa": "/janji.png"
  }

  return (
    <>
      {/* 🔥 HOME */}
      {page === "home" && (
        <div style={{
          padding: 20,
          maxWidth: 600,
          margin: "auto"
        }}>

          <h1 style={{ textAlign: "center" }}>Menu NKS</h1>

          {/* SWITCH MENU */}
          <div style={{
            display: "flex",
            gap: 10,
            marginBottom: 20
          }}>
            <button onClick={() => setMenuType("fnb")}>FNB</button>
            <button onClick={() => setMenuType("digital")}>Digital</button>
          </div>

          {/* 🔥 FNB = PILIH BRAND */}
          {menuType === "fnb" && (
            <>
              <h2>Pilih Brand</h2>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16
              }}>
                {brands.map(b => (
                  <div
                    key={b.name}
                    onClick={() => {
                      if (b.name === "Kopi Kenangan") setPage("kopken")
                      if (b.name === "Fore") setPage("fore")
                      if (b.name === "Janji Jiwa") setPage("janji")
                    }}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 16,
                      padding: 14,
                      textAlign: "center",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{
                      height: 90,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <img src={brandImages[b.name]} style={{ maxHeight: "70%" }} />
                    </div>

                    <p style={{ fontWeight: 600 }}>{b.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 🔥 DIGITAL (BIAR GA RUSAK) */}
          {menuType === "digital" && (
            <>
              <h2>Pilih Produk Digital</h2>
              <p style={{ color: "#666" }}>Coming soon...</p>
            </>
          )}

        </div>
      )}

      {/* 🔥 ADMIN */}
      {page === "admin-login" && (
        <AdminLogin setPage={setPage} />
      )}

      {page === "admin" && (
        <Admin setPage={setPage} />
      )}

      {/* 🔥 BRAND PAGE */}
      {page === "kopken" && <Kopken setPage={setPage} />}
      {page === "fore" && <Fore setPage={setPage} />}
      {page === "janji" && <JanjiJiwa setPage={setPage} />}
    </>
  )
}

export default App