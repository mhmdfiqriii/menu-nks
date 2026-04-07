import { useState } from "react"
import { brands } from "./data/menu"

const generateOrderId = (brandName) => {
  const time = Date.now().toString().slice(-6)

  if (brandName === "Kopi Kenangan") return `KKM-${time}`
  if (brandName === "Janji Jiwa") return `JJW-${time}`
  if (brandName === "Fore") return `FORE-${time}`

  return `ORD-${time}`
}

const brandTheme = {
  "Kopi Kenangan": "#111",
  "Janji Jiwa": "#6b3e26",
  "Fore": "#2b6cb0"
}

function App() {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [toast, setToast] = useState("")
  const [highlightId, setHighlightId] = useState(null)
  const [loadingAdd, setLoadingAdd] = useState(false)

  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [outlet, setOutlet] = useState("")

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
    }, 300) // 🔥 delay biar kerasa “hidup”
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

  const primaryColor = selectedBrand ? brandTheme[selectedBrand.name] : "#111"

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "black",
          color: "white",
          padding: "8px 16px",
          borderRadius: 8
        }}>
          {toast}
        </div>
      )}

      {/* BRAND */}
      {!selectedBrand && (
        <>
          <h2>Pilih Brand</h2>
          {brands.map(b => (
            <button key={b.name}
              onClick={() => handleSelectBrand(b)}
              style={{
                width: "100%",
                padding: 14,
                marginBottom: 10,
                background: brandTheme[b.name],
                color: "#fff",
                border: "none",
                borderRadius: 10,
                transition: "0.2s",
                transform: "scale(1)"
              }}
              onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
              onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
            >
              {b.name}
            </button>
          ))}
        </>
      )}

      {/* MENU */}
      {selectedBrand && (
        <>
          <button onClick={() => setSelectedBrand(null)}>← Ganti Brand</button>
          <h1 style={{ color: primaryColor }}>{selectedBrand.name}</h1>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12
          }}>
            {selectedBrand.menu.map(item => (
              <div key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 12,
                  background: highlightId === item.id ? "#e6fffa" : "white",
                  transition: "0.3s"
                }}
              >
                <p><b>{item.name}</b></p>
                <p>Rp. {formatRupiah(item.price)}</p>

                <button
                  onClick={() => handleOpenOptions(item)}
                  style={{
                    width: "100%",
                    padding: 8,
                    background: primaryColor,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    opacity: loadingAdd ? 0.6 : 1
                  }}
                >
                  {loadingAdd ? "Menambahkan..." : "Tambah"}
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
            <div key={item.id + item.options} style={{ marginBottom: 10 }}>
              <p><b>{item.name}</b></p>
              {item.options && <p>{item.options}</p>}

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button onClick={() => decreaseQty(item.id, item.options)}>-</button>
                <b>{item.qty}</b>
                <button onClick={() => increaseQty(item.id, item.options)}>+</button>
                <button onClick={() => removeItem(item.id, item.options)}>Hapus</button>
              </div>
            </div>
          ))}

          <h3>Total: Rp. {formatRupiah(total)}</h3>

          <input placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
          <br />
          <input placeholder="Outlet" value={outlet} onChange={e => setOutlet(e.target.value)} />
          <br />
          <input placeholder="Jam" value={time} onChange={e => setTime(e.target.value)} />
          <br /><br />

          <button onClick={handleCheckout}
            style={{
              width: "100%",
              padding: 12,
              background: primaryColor,
              color: "white",
              border: "none",
              borderRadius: 10
            }}>
            Checkout
          </button>
        </>
      )}

      {/* STICKY */}
      {selectedBrand && cart.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid #ddd",
          padding: 10
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <b>Rp. {formatRupiah(total)}</b>
            <button onClick={handleCheckout}
              style={{
                background: primaryColor,
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 8
              }}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {selectedItem && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ background: "white", padding: 20 }}>
            <h3>{selectedItem.name}</h3>
            <p>Rp. {formatRupiah(calculatePrice())}</p>

            {Object.entries(selectedItem.options).map(([key, values]) => (
              <div key={key}>
                <p>{key}</p>
                {values.map(v => (
                  <button key={v}
                    style={{
                      opacity: selectedOptions[key] === v ? 1 : 0.5
                    }}
                    onClick={() =>
                      setSelectedOptions(prev => ({ ...prev, [key]: v }))
                    }>
                    {v}
                  </button>
                ))}
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