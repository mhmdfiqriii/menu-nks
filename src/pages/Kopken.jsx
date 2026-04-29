import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ShoppingBag, Coffee } from "lucide-react"
import { brands } from "../data/menu"
import MenuCard from "../components/MenuCard"
import ModalOptions from "../components/ModalOptions"

function Kopken() {
  const navigate = useNavigate()
  const brand = brands.find((b) => b.name === "Kopi Kenangan")

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart_kopken")
    return saved ? JSON.parse(saved) : []
  })

  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})

  useEffect(() => {
    localStorage.setItem("cart_kopken", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item, optionsText = "", finalPrice = item.price) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.options === optionsText
      )

      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.options === optionsText
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }

      return [
        ...prev,
        { ...item, price: finalPrice, qty: 1, options: optionsText }
      ]
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
    addToCart(
      selectedItem,
      Object.values(selectedOptions).join(", "),
      calculatePrice()
    )
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] pb-28">

      <div className="sticky top-0 z-20 bg-[#DB0007] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex-1 px-3">
            <h1 className="font-bold text-lg">Kopi Kenangan</h1>
            <p className="text-xs text-white/75">Menu Order</p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Coffee size={18} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">

        <div className="rounded-3xl bg-white p-5 border shadow-sm">
          <h2 className="text-xl font-bold text-[#DB0007]">
            {brand.name}
          </h2>

          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Mengenang mantan sambil minum kopi. Industri move on belum stabil.
          </p>
        </div>

        <div className="space-y-3">
          {brand.menu.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onClick={() => handleOpenOptions(item)}
            />
          ))}
        </div>

      </div>

      {cart.length > 0 && (
        <div
          onClick={() => navigate("/kopken/cart")}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} />
            <div>
              <p className="text-xs text-white/75">
                {cart.length} item
              </p>
              <p className="font-semibold text-sm">
                Lihat Keranjang
              </p>
            </div>
          </div>

          <p className="font-bold text-sm">
            Rp {new Intl.NumberFormat("id-ID").format(total)}
          </p>
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