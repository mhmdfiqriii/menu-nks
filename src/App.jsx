import { useState, useEffect } from "react"
import { brands } from "./data/menu"

import kkm from "./assets/kkm.webp"
import jjw from "./assets/jjw.webp"
import fore from "./assets/fore.webp"

const generateOrderId = (brandName) => {
  const time = Date.now().toString().slice(-6)

  if (brandName === "Kopi Kenangan") return `KKM-${time}`
  if (brandName === "Janji Jiwa") return `JJW-${time}`
  if (brandName === "Fore") return `FORE-${time}`

  return `ORD-${time}`
}

const brandImages = {
  "Kopi Kenangan": kkm,
  "Janji Jiwa": jjw,
  "Fore": fore
}

function App() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [toast, setToast] = useState("")
  const [highlightId, setHighlightId] = useState(null)
  const [loadingAdd, setLoadingAdd] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [outlet, setOutlet] = useState("")

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 500)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const formatRupiah = (angka) => new Intl.NumberFormat("id-ID").format(angka)

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
    setLoadingAdd(true)

    setTimeout(() => {
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

      setHighlightId(item.id)
      setTimeout(() => setHighlightId(null), 800)

      setToast("✔ Ditambahkan ke keranjang")
      setTimeout(() => setToast(""), 1500)

      setSelectedItem(null)
      setSelectedOptions({})
      setLoadingAdd(false)
    }, 300)
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

  const primaryColor = "#111"

  return (
    <div style={{
      padding: isMobile ? 12 : 20,
      maxWidth: 600,
      margin: "auto",
      paddingBottom: cart.length > 0 ? 90 : 20
    }}>

      {/* BRAND */}
      {!selectedBrand && (
        <>
          <h2>Pilih Brand</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: 14
          }}>
            {brands.map(b => (
              <div key={b.name}
                onClick={() => handleSelectBrand(b)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 18,
                  padding: 12,
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}>
                <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={brandImages[b.name]} style={{ maxHeight: "80%" }} />
                </div>
                <p style={{ fontWeight: 600 }}>{b.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MENU */}
      {selectedBrand && (
        <>
          <button onClick={() => setSelectedBrand(null)}>← Ganti Brand</button>
          <h1>{selectedBrand.name}</h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
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

                <button onClick={() => handleOpenOptions(item)}
                  style={{
                    width: "100%",
                    padding: 10,
                    background: primaryColor,
                    color: "#fff",
                    borderRadius: 8,
                    border: "none"
                  }}>
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔥 CART MODERN */}
      {selectedBrand && cart.length > 0 && (
        <>
          <hr />

          <h2>Keranjang</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cart.map(item => (
              <div key={item.id + item.options}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: 12,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}>
                <p style={{ fontWeight: 600 }}>{item.name}</p>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 8
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 999
                  }}>
                    <button onClick={() => decreaseQty(item.id, item.options)}
                      style={{ padding: "6px 10px", border: "none", background: "transparent" }}>
                      -
                    </button>

                    <span style={{ padding: "0 10px" }}>{item.qty}</span>

                    <button onClick={() => increaseQty(item.id, item.options)}
                      style={{ padding: "6px 10px", border: "none", background: "transparent" }}>
                      +
                    </button>
                  </div>

                  <button onClick={() => removeItem(item.id, item.options)}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "red",
                      fontSize: 12
                    }}>
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div style={{
            marginTop: 16,
            padding: 12,
            borderTop: "1px solid #eee"
          }}>
            <p style={{ color: "#666" }}>Subtotal</p>
            <h3>Rp. {formatRupiah(total)}</h3>
          </div>

          {/* FORM */}
          <div style={{ marginTop: 16 }}>
            <h3>Formulir Order</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Nama"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc" }} />

              <input placeholder="Outlet"
                value={outlet}
                onChange={e => setOutlet(e.target.value)}
                style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc" }} />

              <input placeholder="Jam"
                value={time}
                onChange={e => setTime(e.target.value)}
                style={{ padding: 12, borderRadius: 10, border: "1px solid #ccc" }} />
            </div>

            <br />

            <button onClick={handleCheckout}
              style={{
                width: "100%",
                padding: 14,
                background: primaryColor,
                color: "white",
                borderRadius: 12,
                border: "none"
              }}>
              Checkout
            </button>
          </div>
        </>
      )}

      {/* MODAL (TETAP) */}
      {selectedItem && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: isMobile ? "flex-end" : "center"
        }}>
          <div style={{
            background: "white",
            padding: 20,
            width: "100%",
            maxWidth: 420,
            borderRadius: isMobile ? "16px 16px 0 0" : 16
          }}>
            <h3>{selectedItem.name}</h3>
            <p>Rp. {formatRupiah(calculatePrice())}</p>

            {Object.entries(selectedItem.options).map(([key, values]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <p>{key}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {values.map(v => {
                    const active = selectedOptions[key] === v
                    return (
                      <button key={v}
                        onClick={() =>
                          setSelectedOptions(prev => ({ ...prev, [key]: v }))
                        }
                        style={{
                          padding: "8px 14px",
                          borderRadius: 999,
                          border: active ? "none" : "1px solid #ccc",
                          background: active ? "#111" : "#fff",
                          color: active ? "#fff" : "#333"
                        }}>
                        {v}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

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