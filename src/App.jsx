import { useState } from "react"
import { menu } from "./data/menu"

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)

      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }

      return [...prev, { ...item, qty: 1 }]
    })
  }

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <div>
      <h1>Menu NKS</h1>

      {menu.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Rp. {item.price}</p>
          <button onClick={() => addToCart(item)}>Tambah</button>
        </div>
      ))}

      <hr />

      <h2>Keranjang</h2>

      {cart.length === 0 && <p>Belum ada pesanan</p>}

      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>Qty: {item.qty}</p>

          <button onClick={() => increaseQty(item.id)}>+</button>
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <button onClick={() => removeItem(item.id)}>Hapus</button>
        </div>
      ))}

      <h3>Total: Rp {total}</h3>
    </div>
  )
}

export default App