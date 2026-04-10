import { useState, useEffect, useRef } from "react"
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
  const [toast, setToast] = useState({ text: "", type: "success" })

  const [isMobile, setIsMobile] = useState(false)

  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [outlet, setOutlet] = useState("")

  // 🔥 REF AUTO FOCUS
  const nameRef = useRef()
  const outletRef = useRef()
  const timeRef = useRef()

  // 🔥 ERROR STATE
  const [errorField, setErrorField] = useState("")

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 500)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const showToast = (text, type = "success") => {
    setToast({ text, type })
    setTimeout(() => setToast({ text: "", type: "success" }), 1500)
  }

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

    showToast("✔ Ditambahkan ke keranjang")
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
    if (cart.length === 0) {
      showToast("Keranjang masih kosong", "error")
      return
    }

    if (!name.trim()) {
      showToast("Masukkan nama pemesan", "error")
      setErrorField("name")
      nameRef.current.focus()
      return
    }

    if (!outlet.trim()) {
      showToast("Masukkan nama outlet tujuan", "error")
      setErrorField("outlet")
      outletRef.current.focus()
      return
    }

    if (!time.trim()) {
      showToast("Tentukan jam pengambilan", "error")
      setErrorField("time")
      timeRef.current.focus()
      return
    }

    setErrorField("")

    const orderId = generateOrderId(selectedBrand?.name)

    let message = `*FORM ORDER NKS*\n\n`
    message += `No. Pesanan : ${orderId}\n`
    message += `Brand : ${selectedBrand?.name}\n`
    message += `Atas Nama Pesanan : ${name}\n`
    message += `Outlet : ${outlet}\n`
    message += `Jam Pengambilan : ${time}\n\n`

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

      {/* 🔥 TOAST */}
      {toast.text && (
        <div style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: toast.type === "error" ? "#ff4d4f" : "#111",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: 10,
          fontSize: 13
        }}>
          {toast.text}
        </div>
      )}

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
                  cursor: "pointer"
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

      {selectedBrand && (
        <>
          <button
            onClick={() => setSelectedBrand(null)}
            style={{
              marginBottom: 10,
              padding: "8px 14px",
              borderRadius: 999,
              border: "none",
              background: "#eee",
              cursor: "pointer"
            }}>
            ← Ganti Brand
          </button>

          <h1 style={{ marginBottom: 16 }}>{selectedBrand.name}</h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 16
          }}>
            {selectedBrand.menu.map(item => (
              <div key={item.id} style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 14
              }}>
                <p><b>{item.name}</b></p>
                <p style={{ margin: "6px 0 10px" }}>Rp. {formatRupiah(item.price)}</p>

                <button onClick={() => handleOpenOptions(item)}
                  style={{
                    width: "100%",
                    padding: 10,
                    background: primaryColor,
                    color: "#fff",
                    borderRadius: 10,
                    border: "none"
                  }}>
                  Tambah
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedBrand && cart.length > 0 && (
        <>
          <hr />
          <h2>Keranjang</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {cart.map(item => (
              <div key={item.id + item.options}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 14,
                  padding: 14
                }}>
                <p style={{ fontWeight: 600 }}>{item.name}</p>

                {item.options && (
                  <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {item.options}
                  </p>
                )}

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10
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

          <div style={{
            marginTop: 18,
            padding: 12,
            borderTop: "1px solid #eee"
          }}>
            <p style={{ color: "#666" }}>Subtotal</p>
            <h3>Rp. {formatRupiah(total)}</h3>
          </div>

          <div style={{ marginTop: 18 }}>
            <h3>Formulir Order</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input ref={nameRef}
                placeholder="Nama"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: errorField === "name" ? "1px solid red" : "1px solid #ccc"
                }} />

              <input ref={outletRef}
                placeholder="Outlet"
                value={outlet}
                onChange={e => setOutlet(e.target.value)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: errorField === "outlet" ? "1px solid red" : "1px solid #ccc"
                }} />

              <input ref={timeRef}
                placeholder="Jam"
                value={time}
                onChange={e => setTime(e.target.value)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: errorField === "time" ? "1px solid red" : "1px solid #ccc"
                }} />
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

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                disabled={!isOptionsComplete()}
                onClick={handleConfirmAdd}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  background: "#111",
                  color: "#fff",
                  border: "none"
                }}>
                Tambah ke Keranjang
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  padding: 10,
                  borderRadius: 10,
                  background: "#f5f5f5",
                  border: "none"
                }}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App