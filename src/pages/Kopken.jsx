import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { brands } from "../data/menu"
import MenuCard from "../components/MenuCard"
import ModalOptions from "../components/ModalOptions"

function Kopken() {
  const navigate = useNavigate()
  const brand = brands.find(b => b.name === "Kopi Kenangan")

  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem("cart_kopken")
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart_kopken", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item, optionsText = "", finalPrice = item.price) => {
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

  const handleOpenOptions = (item) => {
    if (!item.options) return addToCart(item)
    setSelectedItem(item)
  }

  const calculatePrice = () => {
    if (!selectedItem) return 0
    let price = selectedItem.price

    const size = selectedOptions["Size"]
    if (size?.includes("Large")) price += 6000
    if (size?.includes("Jumbo")) price += 16000

    return price
  }

  const handleConfirmAdd = () => {
    const price = calculatePrice()
    const text = Object.values(selectedOptions).join(", ")
    addToCart(selectedItem, text, price)
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <div className="max-w-md mx-auto p-4 pb-24">

      <button onClick={() => navigate("/")} className="text-sm mb-3">
        ← Kembali
      </button>

      <h1 className="text-2xl font-semibold mb-4">{brand.name}</h1>

      <div className="space-y-3">
        {brand.menu.map(item => (
          <MenuCard key={item.id} item={item} onClick={() => handleOpenOptions(item)} />
        ))}
      </div>

      {/* STICKY MINI CART */}
      {cart.length > 0 && (
        <div
          onClick={() => navigate("/kopken/cart")}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black text-white p-4 rounded-xl flex justify-between cursor-pointer"
        >
          <span>{cart.length} item</span>
          <span>Rp {new Intl.NumberFormat("id-ID").format(total)}</span>
        </div>
      )}

      {selectedItem && (
        <ModalOptions
          item={selectedItem}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirmAdd}
        />
      )}
    </div>
  )
}

export default Kopken