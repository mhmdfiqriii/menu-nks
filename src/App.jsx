import { menu } from "./data/menu"

function App() {
  return (
    <div>
      <h1>Menu NKS</h1>

      {menu.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Rp. {item.price}</p>
          <button>Tambah</button>
        </div>
      ))}

    </div>
  )
}

export default App