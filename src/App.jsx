import "./index.css"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/500.css"
import "@fontsource/poppins/600.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/800.css"
import "@fontsource/poppins/900.css"
import { useState, useEffect, useRef } from "react"
import { brands } from "./data/menu"
import { digitalProducts } from "./data/menu"

import kkm from "./assets/kkm.webp"
import jjw from "./assets/jjw.webp"
import fore from "./assets/fore.webp"
  import logo from "./assets/nks_logo.png"
  import listKouta from "./assets/list_kouta.png"

const generateOrderId = (brandName) => {
  const time = Date.now().toString().slice(-6)

  if (brandName === "Kopi Kenangan") return `KKM-${time}`
  if (brandName === "Janji Jiwa") return `JJW-${time}`
  if (brandName === "Fore") return `FORE-${time}`

  return `ORD-${time}`
}
const generateDigitalId = (type) => {
  const time = Date.now().toString().slice(-6)

  if (type === "imei") return `IMEI-${time}`
  if (type === "internet") return `AKRAB-${time}`

  return `DIG-${time}`
}

const brandImages = {
  "Kopi Kenangan": kkm,
  "Janji Jiwa": jjw,
  "Fore": fore
}

function App() {
  const [menuType, setMenuType] = useState("fnb")
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [toast, setToast] = useState({ text: "", type: "success" })

  const [selectedDigital, setSelectedDigital] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [agree, setAgree] = useState(false)

  const [loading, setLoading] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  const [name, setName] = useState("")
  const [time, setTime] = useState("")
  const [outlet, setOutlet] = useState("")

  const nameRef = useRef()
  const outletRef = useRef()
  const timeRef = useRef()
  const menuRef = useRef()

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

  const resetAll = () => {
    setSelectedBrand(null)
    setCart([])
    setName("")
    setOutlet("")
    setTime("")
    setErrorField("")
  }

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand)
    setCart([])

    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
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

  const handleCheckoutDigital = () => {
  if (!selectedVariant) return

  setLoading(true)

  setTimeout(() => {
    const orderId = generateDigitalId(selectedDigital.type)

    let message = `*FORM ORDER NKS DIGITAL*\n\n`
    message += `No. Pesanan : ${orderId}\n`
    message += `Produk : ${selectedDigital.name}\n`
    message += `Varian : ${selectedVariant.name}\n`

    if (selectedDigital.type === "internet") {
      message += `No. HP : ${inputValue}\n`
    }

    if (selectedDigital.type === "imei") {
      message += `IMEI : (kirim dalam bentuk foto)\n`
    }

    message += `\nTotal : Rp. ${formatRupiah(selectedVariant.price)}`

    window.open(`https://wa.me/6285704550839?text=${encodeURIComponent(message)}`)

    setLoading(false)
  }, 600) // <-- ini kunci
}

  const primaryColor = "#111"

  return (
    <div style={{
      padding: isMobile ? 12 : 20,
      maxWidth: 600,
      margin: "auto",
      paddingBottom: cart.length > 0 ? 90 : 20
    }}>

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

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 20
      }}>
        <img src={logo} style={{ height: 28 }} />
        <h2 style={{ margin: 0, fontWeight: 600 }}>NKS</h2>
      </div>

      {/* MENU TYPE */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => { setMenuType("fnb"); resetAll() }}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 999,
            border: "none",
            background: menuType === "fnb" ? "#111" : "#eee",
            color: menuType === "fnb" ? "#fff" : "#333",
            transition: "0.2s",
            fontWeight: 500
          }}>
          F&B
        </button>

        <button onClick={() => { setMenuType("digital"); resetAll() }}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 999,
            border: "none",
            background: menuType === "digital" ? "#111" : "#eee",
            color: menuType === "digital" ? "#fff" : "#333",
            transition: "0.2s",
            fontWeight: 500
          }}>
          Produk Digital
        </button>
      </div>

      {menuType === "digital" && !selectedDigital && (
  <>
    <h2>Pilih Produk</h2>

    <div style={{ display: "grid", gap: 16 }}>
      {digitalProducts.map(p => (
        <div key={p.id}
          onClick={() => setSelectedDigital(p)}
          style={{
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 16,
            cursor: "pointer"
          }}>
          <p style={{ fontWeight: 600 }}>{p.name}</p>
        </div>
      ))}
    </div>
  </>
)}

{menuType === "digital" && selectedDigital && (
  <>
    <button
      onClick={() => {
        setSelectedDigital(null)
        setSelectedVariant(null)
        setInputValue("")
        setAgree(false)
      }}
      style={{
        marginBottom: 12,
        padding: "8px 14px",
        borderRadius: 999,
        border: "1px solid #ddd",
        background: "#fff",
        fontSize: 13
      }}
    >
      ← Kembali
    </button>

    <h2>{selectedDigital.name}</h2>

    {/* GAMBAR INTERNET */}
    {selectedDigital.type === "internet" && (
    <img 
    src={listKouta}
    style={{
      width: "100%",
      borderRadius: 12,
      marginTop: 12,
      marginBottom: 12
    }}
  />
)}

    {/* VARIANT */}
    <div style={{ display: "grid", gap: 10 }}>
      {selectedDigital.variants.map(v => (
        <button
          key={v.name}
          onClick={() => setSelectedVariant(v)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #ddd",
            background: selectedVariant?.name === v.name ? "#111" : "#fff",
            color: selectedVariant?.name === v.name ? "#fff" : "#333"
          }}
        >
          {v.name} - Rp {formatRupiah(v.price)}
        </button>
      ))}
    </div>

    {selectedVariant && (
      <>
        {/* INTERNET */}
        {selectedDigital.type === "internet" && (
          <>
            <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
              ⚠️ Kuota tergantung area masing-masing.   
              Silakan cek area kamu terlebih dahulu untuk mengetahui estimasi kuota yang didapat. <br />
              <a
                href="https://raw.githack.com/vieralola/Cekareaviera.html/main/Cekareaviera.html"
                target="_blank"
              >
                Cek area di sini
              </a>
            </p>

            <input
              placeholder="Nomor HP"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #ddd",
                marginTop: 10,
                width: "100%"
              }}
            />

            <label style={{ fontSize: 12, display: "block", marginTop: 10 }}>
              <input
                type="checkbox"
                onChange={e => setAgree(e.target.checked)}
              />
              Saya sudah cek area
            </label>
          </>
        )}

        {/* IMEI */}
        {selectedDigital.type === "imei" && (
          <>
            <p style={{ fontSize: 12, color: "#666", marginTop: 12 }}>
              ⚠️ Kirim IMEI dalam bentuk foto ke Admin.
              (Pengaturan → Tentang Ponsel → IMEI)
            </p>
          </>
        )}

        {/* CHECKOUT */}
        <button
  disabled={
    loading ||
    !selectedVariant ||
    (selectedDigital.type === "internet" && (!inputValue || !agree))
  }
  onClick={handleCheckoutDigital}
  style={{
    marginTop: 16,
    padding: 14,
    width: "100%",
    borderRadius: 12,
    background: loading ? "#999" : "#111",
    color: "#fff",
    border: "none"
  }}
>
  {loading ? "Memproses..." : "Checkout"}
</button>
      </>
    )}
  </>
)}

      {menuType === "fnb" && (
        <>
          {!selectedBrand && (
            <>
              <h2 style={{ fontWeight: 500 }}>Pilih Brand</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
                gap: 16
              }}>
                {brands.map(b => (
                  <div key={b.name}
                    onClick={() => handleSelectBrand(b)}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 16,
                      padding: 14,
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "0.2s"
                    }}>
                    <div style={{ height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src={brandImages[b.name]} style={{ maxHeight: "70%" }} />
                    </div>
                    <p style={{ fontWeight: 600 }}>{b.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {selectedBrand && (
            <>
              <button onClick={() => { setSelectedBrand(null); setCart([]) }}
                style={{
                  marginBottom: 12,
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "none",
                  background: "#eee",
                  fontWeight: 500
                }}>
                ← Ganti Brand
              </button>

              <h1 ref={menuRef} style={{ marginBottom: 16, fontWeight: 600 }}>{selectedBrand.name}</h1>

              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16
              }}>
                {selectedBrand.menu.map(item => (
                  <div key={item.id} style={{
                    border: "1px solid #eee",
                    borderRadius: 14,
                    padding: 16
                  }}>
                    <p style={{ fontWeight: 600 }}>{item.name}</p>
                    <p style={{ margin: "6px 0 12px", fontWeight: 400 }}>Rp. {formatRupiah(item.price)}</p>

                    <button onClick={() => handleOpenOptions(item)}
                      style={{
                        width: "100%",
                        padding: 12,
                        background: primaryColor,
                        color: "#fff",
                        borderRadius: 10,
                        border: "none",
                        transition: "0.2s",
                        fontWeight: 500
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
              <h2 style={{ fontWeight: 500 }}>Keranjang</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {cart.map(item => (
                  <div key={item.id + item.options}
                    style={{
                      border: "1px solid #eee",
                      borderRadius: 12,
                      padding: 12
                    }}>
                    <p style={{ fontWeight: 500 }}>{item.name}</p>

                    {item.options && (
                      <p style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>
                        {item.options}
                      </p>
                    )}

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
                        <button onClick={() => decreaseQty(item.id, item.options)} style={{ padding: "6px 10px", border: "none", background: "transparent" }}>-</button>
                        <span style={{ padding: "0 10px" }}>{item.qty}</span>
                        <button onClick={() => increaseQty(item.id, item.options)} style={{ padding: "6px 10px", border: "none", background: "transparent" }}>+</button>
                      </div>

                      <button onClick={() => removeItem(item.id, item.options)}
                        style={{ border: "none", background: "transparent", color: "red", fontSize: 12, fontWeight: 500 }}>
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, paddingTop: 10, borderTop: "1px solid #eee" }}>
                <p style={{ color: "#666" }}>Subtotal</p>
                <h3>Rp. {formatRupiah(total)}</h3>
              </div>

              <div style={{ marginTop: 16 }}>
                <h3 style= {{ fontWeight: 500 }}>Formulir Order</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
  
  <div>
    <input
      ref={nameRef}
      placeholder="Nama pemesan"
      value={name}
      onChange={e => setName(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: errorField === "name" ? "1px solid red" : "1px solid #ddd"
      }}
    />
    {errorField === "name" && (
      <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
        Nama wajib diisi
      </p>
    )}
  </div>

  <div>
    <input
      ref={outletRef}
      placeholder="Contoh: Ruko Margonda"
      value={outlet}
      onChange={e => setOutlet(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: errorField === "outlet" ? "1px solid red" : "1px solid #ddd"
      }}
    />
    {errorField === "outlet" && (
      <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
        Outlet wajib diisi
      </p>
    )}
  </div>

  <div>
    <input
  ref={timeRef}
  placeholder="Contoh: Sekarang atau Jam 07.30"
  value={time}
  onChange={e => setTime(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: errorField === "time" ? "1px solid red" : "1px solid #ddd"
  }}
/>
    {errorField === "time" && (
      <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>
        Jam pengambilan wajib diisi
      </p>
    )}
  </div>

</div>

                <br />
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
                            onClick={() => setSelectedOptions(prev => ({ ...prev, [key]: v }))}
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
                  <button disabled={!isOptionsComplete()} onClick={handleConfirmAdd}
                    style={{ padding: 12, borderRadius: 10, background: "#111", color: "#fff", border: "none", fontWeight: 500 }}>
                    Tambah ke Keranjang
                  </button>

                  <button onClick={() => setSelectedItem(null)}
                    style={{ padding: 10, borderRadius: 10, background: "#f5f5f5", border: "none", fontWeight: 500 }}>
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* 👇 INI TEMPAT LU TARO STICKY */}
      {selectedBrand && cart.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: "10px 16px",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.05)"
        }}>
          <div style={{
            maxWidth: 600,
            margin: "auto",
            padding: "0 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10
          }}>
            
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "#666" }}>Total</p>
              <h3 style={{ margin: 0 }}>Rp. {formatRupiah(total)}</h3>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                minWidth: 110,
                padding: "12px 18px",
                background: "#111",
                color: "#fff",
                borderRadius: 10,
                border: "none",
                fontWeight: 500
              }}
            >
              Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  )
}

export default App