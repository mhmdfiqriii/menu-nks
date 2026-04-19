function Fore({ setPage }) {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2>Fore</h2>
      <p>Coming Soon 🚧</p>

      <button onClick={() => setPage("home")}>
        Kembali
      </button>
    </div>
  )
}

export default Fore