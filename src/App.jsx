import { useState } from "react"
import { menu } from "./data/menu"

const generateOrderId = () => {
  const time = Date.now().toString().slice(-6)
  return `KKM-${time}`
}

function App() {
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})

  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [outlet, setOutlet] = useState("")
  const [note, setNote] = useState("")

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID").format(angka)
  }

  // 🔥 buka modal
  const handleOpenOptions = (item) => {
    if (!item.options) {
      addToCart(item, "")
      return
    }

    setSelectedItem(item)
    setSelectedOptions({})
  }

  // 🔥 tambah ke cart dari modal
  const addToCart = (item, optionsText) => {
    setCart(prev => {
      const existing = prev.find(
        i => i.id === item.id && i.options === optionsText
      )

      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.options === optionsText
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }

      return [...prev, { ...item, qty: 1, options: optionsText }]
    })

    setSelectedItem(null)
    setSelectedOptions({})
  }

  const increaseQty = (id, options) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.options === options
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id, options) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id && item.options === options
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    )
  }

  const removeItem = (id, options) => {
    setCart(prev =>
      prev.filter(item => !(item.id === id && item.options === options))
    )
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Keranjang kosong")
    if (!name.trim()) return alert("Isi nama")
    if (!outlet.trim()) return alert("Isi outlet")

    const orderId = generateOrderId()

    let message = `*FORM ORDER NKS*\n\n`
    message += `No. Pesanan : ${orderId}\n`
    message += `Atas Nama Pesanan : ${name}\n`
    message += `Outlet : ${outlet}\n`
    message += `Jam Pengambilan : ${time || "-"}\n\n`
    message += `Pesanan :\n`

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name} (${item.qty}x)\n`
      if (item.options) message += `   (${item.options})\n`
      message += `   Sub Total : Rp. ${formatRupiah(item.price * item.qty)}\n`
    })

    message += `\nTotal : Rp. ${formatRupiah(total)}`

    window.open(`https://wa.me/6285704550839?text=${encodeURIComponent(message)}`)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Menu NKS</h1>

      {menu.map(item => (
        <div key={item.id}>
          <p><b>{item.name}</b></p>
          <p>Rp. {formatRupiah(item.price)}</p>
          <button onClick={() => handleOpenOptions(item)}>Tambah</button>
        </div>
      ))}

      <hr />

      <h2>Keranjang</h2>

      {cart.map(item => (
        <div key={item.id + item.options}>
          <p>{item.name}</p>
          {item.options && <p>{item.options}</p>}
          <p>Qty: {item.qty}</p>

          <button onClick={() => increaseQty(item.id, item.options)}>+</button>
          <button onClick={() => decreaseQty(item.id, item.options)}>-</button>
          <button onClick={() => removeItem(item.id, item.options)}>Hapus</button>
        </div>
      ))}

      <h3>Total: Rp. {formatRupiah(total)}</h3>

      <hr />

      <h2>Form Order</h2>

      <input placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <input placeholder="Outlet" value={outlet} onChange={e => setOutlet(e.target.value)} />
      <br />
      <input placeholder="Jam" value={time} onChange={e => setTime(e.target.value)} />
      <br /><br />

      <button onClick={handleCheckout}>Checkout</button>

      {/* 🔥 MODAL SIMPLE */}
      {selectedItem && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          padding: 20
        }}>
          <div style={{ background: "white", padding: 20 }}>
            <h3>{selectedItem.name}</h3>

            {Object.entries(selectedItem.options).map(([key, values]) => (
              <div key={key}>
                <p>{key}</p>
                {values.map(v => (
                  <button
                    key={v}
                    onClick={() =>
                      setSelectedOptions(prev => ({ ...prev, [key]: v }))
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            ))}

            <br />

            <button
              onClick={() => {
                const text = Object.values(selectedOptions).join(", ")
                addToCart(selectedItem, text)
              }}
            >
              Tambah ke Keranjang
            </button>

            <button onClick={() => setSelectedItem(null)}>Batal</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App