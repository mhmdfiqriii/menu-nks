import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronLeft,
  ShoppingBag,
  Coffee,
  Search
} from "lucide-react"

import { brands } from "../data/menu"
import MenuCard from "../components/MenuCard"
import ModalOptions from "../components/ModalOptions"

function Kopken() {
  const navigate = useNavigate()

  const brand = brands.find(
    (b) => b.name === "Kopi Kenangan"
  )

  const [cart, setCart] = useState(() => {
    const saved =
      localStorage.getItem("cart_kopken")

    return saved ? JSON.parse(saved) : []
  })

  const [selectedItem, setSelectedItem] =
    useState(null)

  const [selectedOptions, setSelectedOptions] =
    useState({})

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("Semua")

  useEffect(() => {
    localStorage.setItem(
      "cart_kopken",
      JSON.stringify(cart)
    )
  }, [cart])

  const categories = [
    "Semua",
    "Coffee",
    "Food"
  ]

  const menu = useMemo(() => {
    let data = [...brand.menu]

    if (filter !== "Semua") {
      data = data.filter(
        (item) => item.category === filter
      )
    }

    if (search.trim()) {
      data = data.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    return data
  }, [brand.menu, filter, search])

  const addToCart = (
    item,
    optionsText = "",
    finalPrice = item.price
  ) => {
    setCart((prev) => {
      const exist = prev.find(
        (i) =>
          i.id === item.id &&
          i.options === optionsText
      )

      if (exist) {
        return prev.map((i) =>
          i.id === item.id &&
          i.options === optionsText
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }

      return [
        ...prev,
        {
          ...item,
          qty: 1,
          price: finalPrice,
          options: optionsText
        }
      ]
    })

    setSelectedItem(null)
    setSelectedOptions({})
  }

  const handleOpen = (item) => {
    if (item.options) {
      setSelectedItem(item)
      return
    }

    addToCart(item)
  }

  const calculatePrice = () => {
    if (!selectedItem) return 0

    let price = selectedItem.price
    const size =
      selectedOptions["Size"]

    if (size === "Large") price += 6000
    if (size === "Jumbo") price += 16000

    return price
  }

  const handleConfirm = () => {
    addToCart(
      selectedItem,
      Object.values(
        selectedOptions
      ).join(", "),
      calculatePrice()
    )
  }

  const qty = cart.reduce(
    (a, b) => a + b.qty,
    0
  )

  const total = cart.reduce(
    (a, b) => a + b.qty * b.price,
    0
  )

  const format = (n) =>
    new Intl.NumberFormat("id-ID").format(n)

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fff7f7] pb-28">

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-[#DB0007] text-white">
        <div className="px-4 h-[64px] flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex-1 px-3">
            <h1 className="font-bold text-[15px]">
              Kopi Kenangan
            </h1>

            <p className="text-[11px] text-white/75">
              Promo Menu Hari Ini
            </p>
          </div>

          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
            <Coffee size={18} />
          </div>
        </div>
      </div>

      <div className="p-4">

        {/* SEARCH */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search menu..."
            className="w-full rounded-3xl border bg-white py-3 pl-11 pr-4"
          />
        </div>

        {/* FILTER */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                filter === item
                  ? "bg-[#DB0007] text-white"
                  : "bg-white border"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {menu.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onClick={() => handleOpen(item)}
            />
          ))}
        </div>

      </div>

      {/* BAR */}
      <div
        onClick={() =>
          navigate("/kopken/cart")
        }
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag
            size={18}
            className={
              qty > 0 ? "animate-bounce" : ""
            }
          />

          <div>
            <p className="text-xs text-white/75">
              {qty} item dalam keranjang
            </p>

            <p className="font-semibold text-sm">
              {qty > 0
                ? "Lihat Keranjang"
                : "Pilih menu dulu"}
            </p>
          </div>
        </div>

        <p className="font-bold">
          Rp {format(total)}
        </p>
      </div>

      {selectedItem && (
        <ModalOptions
          item={selectedItem}
          selectedOptions={
            selectedOptions
          }
          setSelectedOptions={
            setSelectedOptions
          }
          onClose={() =>
            setSelectedItem(null)
          }
          onConfirm={handleConfirm}
        />
      )}

    </div>
  )
}

export default Kopken