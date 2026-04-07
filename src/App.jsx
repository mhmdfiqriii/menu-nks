import { useState } from "react"
import { brands } from "./data/menu"

// 🔥 order id beda brand
const generateOrderId = (brandName) => {
  const time = Date.now().toString().slice(-6)

  if (brandName === "Kopi Kenangan") return `KKM-${time}`
  if (brandName === "Janji Jiwa") return `JJW-${time}`
  if (brandName === "Fore") return `FORE-${time}`

  return `ORD-${time}`
}

function App() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})

  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [outlet, setOutlet] = useState("")

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID").format(angka)
  }

  // 🔥 RESET CART SAAT GANTI BRAND
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand)
    setCart([])
  }

  const handleOpenOptions = (item) => {
    if (!item.options) {
      addToCart(item, "", item.price)
      return
    }
    setSelectedItem(item)
    setSelectedOptions({})
  }

  const calculatePrice = () => {
    if (!selectedItem) return 0

    let price = selectedItem.price
    const size = selectedOptions["Size"]

    if (size) {
      if (size.includes("Large")) price += 6000
      if (size.includes("Jumbo")) price += 16000
      if (size.includes("Ultimate")) price += 7000
    }

    return price
  }

  const isOptionsComplete = () => {
    if (!selectedItem?.options) return true
    return Object.keys(selectedItem.options).every(k => selectedOptions[k])
  }

  const handleConfirmAdd = () => {
    if (!isOptionsComplete()) return

    const finalPrice = calculatePrice()
    const text = Object.values(selectedOptions).join(", ")

    addToCart(selectedItem, text, finalPrice)
  }

  const addToCart = (item, optionsText, finalPrice) => {
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

      return [...prev, { ...item, price: finalPrice, qty: 1, options: optionsText }]
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

    const orderId = generateOrderId(selectedBrand?.name)

    let message = `*FORM ORDER NKS*\n\n`
    message += `No. Pesanan : ${orderId}\n`
    message += `Brand : ${selectedBrand?.name}\n`
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
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>

      {/* BRAND */}
      {!selectedBrand && (
        <>
          <h2>Pilih Brand</h2>
          {brands.map(b => (
            <button
              key={b.name}
              onClick={() => handleSelectBrand(b)}
              style={{
                display: "block",
                width: "100%",
                padding: 14,
                marginBottom: 12,
                borderRadius: 12,
                border: "none",
                background: "#111",
                color: "#fff",
                fontSize: 16
              }}
            >
              {b.name}
            </button>
          ))}
        </>
      )}

      {/* MENU */}
      {selectedBrand && (
        <>
          <button onClick={() => setSelectedBrand(null)}>
            ← Ganti Brand
          </button>

          <h1>{selectedBrand.name}</h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12
          }}>
            {selectedBrand.menu.map(item => (
              <div key={item.id} style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12
              }}>
                <p><b>{item.name}</b></p>
                <p>Rp. {formatRupiah(item.price)}</p>

                <button onClick={() => handleOpenOptions(item)}>
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* CART */}
      {selectedBrand && cart.length > 0 && (
        <>
          <hr />
          <h2>Keranjang</h2>

          {cart.map(item => (
            <div key={item.id + item.options}>
              <p><b>{item.name}</b></p>
              {item.options && <p>{item.options}</p>}
              <p>Qty: {item.qty}</p>

              <button onClick={() => increaseQty(item.id, item.options)}>+</button>
              <button onClick={() => decreaseQty(item.id, item.options)}>-</button>
              <button onClick={() => removeItem(item.id, item.options)}>Hapus</button>
            </div>
          ))}

          <h3>Total: Rp. {formatRupiah(total)}</h3>

          <input placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
          <br />
          <input placeholder="Outlet" value={outlet} onChange={e => setOutlet(e.target.value)} />
          <br />
          <input placeholder="Jam" value={time} onChange={e => setTime(e.target.value)} />
          <br /><br />

          <button onClick={handleCheckout} style={{
            width: "100%",
            padding: 12,
            background: "green",
            color: "white",
            border: "none",
            borderRadius: 10
          }}>
            Checkout
          </button>
        </>
      )}

      {/* MODAL */}
      {selectedItem && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            width: "90%",
            maxWidth: 400
          }}>
            <h3>{selectedItem.name}</h3>

            <p><b>Rp. {formatRupiah(calculatePrice())}</b></p>

            {Object.entries(selectedItem.options).map(([key, values]) => (
              <div key={key}>
                <p>{key}</p>

                {values.map(v => {
                  const active = selectedOptions[key] === v

                  return (
                    <button
                      key={v}
                      style={{
                        margin: 4,
                        padding: 6,
                        background: active ? "#111" : "#eee",
                        color: active ? "#fff" : "#000"
                      }}
                      onClick={() =>
                        setSelectedOptions(prev => ({ ...prev, [key]: v }))
                      }
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
            ))}

            <br />

            <button disabled={!isOptionsComplete()} onClick={handleConfirmAdd}>
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