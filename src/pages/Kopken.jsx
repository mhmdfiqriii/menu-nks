function Kopken({ setPage }) {
  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setPage("home")}>← Kembali</button>

      <h2>Kopi Kenangan</h2>
      <p>Minuman favorit kamu ☕</p>

      <p>Menu belum dibuat...</p>
    </div>
  )
}

export default Kopken