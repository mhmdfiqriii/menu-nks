// src/pages/Kopken.jsx
import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  ChevronLeft,
  ShoppingBag,
  Coffee,
  Search,
  Eye,
  ChevronDown
} from "lucide-react"

import { brands } from "../data/menu"
import MenuCard from "../components/MenuCard"
import ModalOptions from "../components/ModalOptions"
import TutorialModal from "../components/TutorialModal"

function Kopken() {
  const navigate = useNavigate()

  const brand = brands.find(
    (b) => b.name === "Kopi Kenangan"
  )

  const categories = useMemo(
  () => [
    "Semua",
    "Coffee",
    "Non Coffee",
    "Oatside Series",
    "Kenangan Frappe",
    "Food"
  ],
   []
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
  const [showTutorial, setShowTutorial] =
    useState(false)

  useEffect(() => {
    localStorage.setItem(
      "cart_kopken",
      JSON.stringify(cart)
    )
  }, [cart])

  const groupedMenu = useMemo(() => {
    let data = [...brand.menu]

    if (search.trim()) {
      data = data.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    if (filter !== "Semua") {
      return {
        [filter]: data.filter(
          (item) => item.category === filter
        )
      }
    }

    const groups = {}

    categories
      .filter((c) => c !== "Semua")
      .forEach((cat) => {
        const items = data.filter(
          (item) => item.category === cat
        )

        if (items.length) groups[cat] = items
      })

    return groups
  }, [brand.menu, filter, search, categories])

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
            ? {
                ...i,
                qty: i.qty + 1
              }
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

        {/* GUIDE */}
        <div className="bg-white rounded-3xl border p-4 mb-4 space-y-3">

          <div className="grid grid-cols-[18px_1fr] gap-3 text-[13px]">
            <span className="text-[#DB0007]">•</span>
            <p><b>Metode</b> Pickup ambil di lokasi.</p>

            <span className="text-[#DB0007]">•</span>
            <p><b>Pembayaran</b> Via admin WhatsApp.</p>

            <span className="text-[#DB0007]">•</span>
            <p><b>Harga</b> Bisa beda tergantung outlet.</p>
          </div>

          <div className="bg-[#fff0f0] rounded-2xl px-4 py-3 flex items-center justify-between text-[14px]">
            <span>Gratis Fee Admin</span>
            <b className="text-[#DB0007]">Rp 0</b>
          </div>

          <button
            onClick={() =>
              setShowTutorial(true)
            }
            className="w-full bg-[#fff0f0] rounded-2xl px-4 py-3 flex items-center justify-between text-[14px]"
          >
            <span className="flex items-center gap-2">
              <Eye size={16} />
              Lihat Tutorial Pemesanan
            </span>

            <ChevronDown size={16} />
          </button>

        </div>

        {/* SEARCH */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search menu..."
            className="w-full rounded-3xl border bg-white py-3 pl-10 pr-4 text-[14px]"
          />
        </div>

        {/* FILTER */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-full text-[13px] whitespace-nowrap ${
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
        <div className="space-y-6">
          {Object.entries(groupedMenu).map(
            ([title, items]) =>
              items.length > 0 && (
                <div key={title}>
                  <h2 className="text-[16px] font-bold mb-3">
                    {title}
                  </h2>

                  <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onClick={() =>
                          handleOpen(item)
                        }
                      />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>

      </div>

      {/* CART */}
      <div
        onClick={() =>
          navigate("/kopken/cart")
        }
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-[#DB0007] text-white rounded-3xl px-5 py-4 flex items-center justify-between shadow-xl"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag size={18} />

          <div>
            <p className="text-xs text-white/75">
              {qty} item dalam keranjang
            </p>

            <p className="font-semibold text-sm">
              {qty > 0
                ? "Lihat keranjang"
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

      <TutorialModal
        open={showTutorial}
        onClose={() =>
          setShowTutorial(false)
        }
      />

    </div>
  )
}

export default Kopken