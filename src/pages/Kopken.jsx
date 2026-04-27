import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { brands } from "../data/menu"
import MenuCard from "../components/MenuCard"
import ModalOptions from "../components/ModalOptions"

function Kopken() {
  const navigate = useNavigate()
  const brand = brands.find(b => b.name === "Kopi Kenangan")

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

      return [
        ...prev,
        {
          ...item,
          price: finalPrice,
          qty: 1,
          options: optionsText
        }
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
    const price = calculatePrice()
    const text = Object.values(selectedOptions).join(", ")
    addToCart(selectedItem, text, price)
  }

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff5f5] p-4 pb-28">

      <button
        onClick={() => navigate("/")}
        className="text-sm mb-4 text-[#DB0007] font-medium"
      >
        ← Kembali
      </button>

      <div className="rounded-3xl bg-white border border-[#ffd6d6] p-5 shadow-sm mb-5">
        <div className="w-14 h-14 rounded-2xl bg-[#DB0007]/10 flex items-center justify-center mb-4">
          <span className="text-[#DB0007] text-xl font-bold">K</span>
        </div>

        <h1 className="text-2xl font-bold text-[#DB0007]">
          {brand.name}
        </h1>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Mengenang mantan sambil ngopi. Kombinasi pahit,
          manis, dan keputusan hidup yang buruk.
        </p>
      </div>

      <div className="space-y-3">
        {brand.menu.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            onClick={() => handleOpenOptions(item)}
          />
        ))}
      </div>

      {cart.length > 0 && (
        <div
          onClick={() => navigate("/kopken/cart")}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md rounded-2xl bg-[#DB0007] text-white px-5 py-4 flex items-center justify-between shadow-xl cursor-pointer active:scale-[0.98] transition-all"
        >
          <div>
            <p className="text-xs text-white/80">
              {cart.length} item dipilih
            </p>
            <p className="font-semibold">
              Lihat Keranjang
            </p>
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