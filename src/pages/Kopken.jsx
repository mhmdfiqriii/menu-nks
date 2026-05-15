import {
  useState,
  useEffect,
  useMemo,
  useRef
} from "react"

import {
  useNavigate
} from "react-router-dom"

import {
  ChevronLeft,
  ShoppingBag,
  Coffee,
  Search,
  Eye,
  ChevronDown
} from "lucide-react"

import {
  brands
} from "../data/menu"

import MenuCard from "../components/MenuCard"
import ModalOptions from "../components/ModalOptions"
import TutorialModal from "../components/TutorialModal"
import StoreClosedModal from "../components/StoreClosedModal"

import {
  fetchStoreStatus,
  subscribeStoreStatus,
  removeStoreSubscription,
  isStoreOpen,
  getStoreStateLabel
} from "../utils/storeUtils.js"

function Kopken() {

  const navigate =
    useNavigate()

  const listRef =
    useRef(null)

  const realtimeChannelRef =
    useRef(null)

  const brand =
    brands.find(
      (b) =>
        b.name ===
        "Kopi Kenangan"
    )

  const categories =
    useMemo(() => {

      const categoryOrder = [
        "Thai Tea Series",
        "Coffee",
        "Non Coffee",
        "Little Kenangan",
        "Frappe",
        "Pistachio",
        "Oatside Series",
        "Signature Food",
        "Toast",
        "Food",
        "Promo Bundling"
      ]

      const uniqueCategories = [
        ...new Set(
          brand.menu.map(
            (item) =>
              item.category
          )
        )
      ]

      const sortedCategories =
        categoryOrder.filter(
          (cat) =>
            uniqueCategories.includes(
              cat
            )
        )

      return [
        "Semua",
        ...sortedCategories
      ]

    }, [brand.menu])

  const [cart, setCart] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "cart_kopken"
        )

      return saved
        ? JSON.parse(saved)
        : []

    })

  const [selectedItem,
    setSelectedItem] =
      useState(null)

  const [selectedOptions,
    setSelectedOptions] =
      useState({})

  const [search,
    setSearch] =
      useState("")

  const [filter,
    setFilter] =
      useState("Semua")

  const [showTutorial,
    setShowTutorial] =
      useState(false)

  const [storeStatus,
  setStoreStatus] =
    useState({
      admin_status: "online"
    })

  const storeOpen =
  isStoreOpen(
    storeStatus
  )

  const [hideClosedModal,
  setHideClosedModal] =
    useState(false)

  useEffect(() => {

    window.scrollTo(0, 0)

  }, [])

  useEffect(() => {

    const initStore =
      async () => {

        const result =
          await fetchStoreStatus()

        setStoreStatus(
          result.data
        )

      }

    initStore()

    realtimeChannelRef.current =

      subscribeStoreStatus(
        (data) => {

          setStoreStatus(data)

        }
      )

    return () => {

      removeStoreSubscription(
        realtimeChannelRef.current
      )

    }

  }, [])

  useEffect(() => {

  if (storeOpen && hideClosedModal) {

    setTimeout(() => {

      setHideClosedModal(false)

    }, 0)

  }

}, [
  storeOpen,
  hideClosedModal
])

  useEffect(() => {

    localStorage.setItem(
      "cart_kopken",
      JSON.stringify(cart)
    )

  }, [cart])

  useEffect(() => {

    if (!listRef.current)
      return

    if (
      filter !== "Semua"
      ||
      search.trim() !== ""
    ) {

      listRef.current
        .scrollIntoView({
          behavior: "smooth",
          block: "start"
        })

    }

  }, [
    filter,
    search
  ])

  const groupedMenu =
    useMemo(() => {

      let data = [
        ...brand.menu
      ]

      if (
        search.trim()
      ) {

        const keyword =
          search
            .toLowerCase()
            .trim()

        data =
          data.filter(
            (item) =>

              item.name
                .toLowerCase()
                .includes(
                  keyword
                )
          )

        return {
          Hasil: data
        }

      }

      if (
        filter !== "Semua"
      ) {

        return {

          [filter]:
            data.filter(
              (item) =>

                item.category ===
                filter
            )

        }

      }

      const groups = {}

      categories
        .filter(
          (c) =>
            c !== "Semua"
        )

        .forEach((cat) => {

          const items =
            data.filter(
              (item) =>

                item.category ===
                cat
            )

          if (
            items.length
          ) {

            groups[cat] =
              items

          }

        })

      return groups

    }, [
      brand.menu,
      filter,
      search,
      categories
    ])

  const addToCart =
    (
      item,
      optionsText = "",
      finalPrice =
        item.price
    ) => {

      if (!storeOpen)
        return

      setCart((prev) => {

        const exist =
          prev.find(
            (i) =>

              i.id === item.id
              &&

              i.options ===
              optionsText
          )

        if (exist) {

          return prev.map(
            (i) =>

              i.id === item.id
              &&

              i.options ===
              optionsText

                ? {
                    ...i,
                    qty:
                      i.qty + 1
                  }

                : i
          )

        }

        return [

          ...prev,

          {
            ...item,
            qty: 1,
            price:
              finalPrice,
            options:
              optionsText
          }

        ]

      })

      setSelectedItem(null)

      setSelectedOptions({})

    }

  const handleOpen =
    (item) => {

      if (!storeOpen)
        return

      setSelectedOptions({})

      if (item.options) {

        setSelectedItem(item)

        return

      }

      addToCart(item)

    }

  const calculatePrice =
  () => {

    if (!selectedItem)
      return 0

    let price =
      selectedItem.price

    if (
      selectedOptions[
        "Size"
      ] === "Large"

      &&

      !selectedItem.disableLargeCharge
    ) {

      price += 5000

    }

    return price

  }

  const handleConfirm =
    () => {

      if (!storeOpen)
        return

      addToCart(

        selectedItem,

        Object.values(
          selectedOptions
        ).join(", "),

        calculatePrice()

      )

    }

  const qty =
    cart.reduce(
      (a, b) =>
        a + b.qty,
      0
    )

  const total =
    cart.reduce(
      (a, b) =>

        a +
        b.qty * b.price,

      0
    )

  const format =
    (n) =>

      new Intl
        .NumberFormat(
          "id-ID"
        )
        .format(n)

  return (

    <div
      className="
        max-w-md
        mx-auto
        min-h-screen
        bg-[#fff7f7]
        pb-28
      "
    >

      <div
        className="
          sticky
          top-0
          z-30
          bg-[#DB0007]
          text-white
          backdrop-blur-md
        "
      >

        <div
          className="
            px-4
            h-[64px]
            flex
            items-center
            justify-between
          "
        >

          <button

            onClick={() =>
              navigate("/")
            }

            className="
              w-11
              h-11
              rounded-2xl
              bg-white/10
              flex
              items-center
              justify-center
            "

          >

            <ChevronLeft
              size={22}
            />

          </button>

          <div
            className="
              flex-1
              px-3
            "
          >

            <h1
              className="
                font-bold
                text-[15px]
              "
            >

              Kopi Kenangan
              Mantan

            </h1>

            <p
  className="
    text-[11px]
    text-white/75
    mt-1
  "
>

  Menu Order by
  Woffle Store

</p>

          </div>

          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-white/10
              flex
              items-center
              justify-center
            "
          >

            <Coffee
              size={18}
            />

          </div>

        </div>

      </div>

      <div className="p-4">

        <div
          className="
            bg-white
            rounded-3xl
            border
            p-4
            mb-4
            space-y-3
          "
        >

          <div
            className="
              grid
              grid-cols-[18px_1fr]
              gap-3
              text-[13px]
            "
          >

            <span
              className="
                text-[#DB0007]
              "
            >

              •

            </span>

            <p>

              <b>
                Ukuran & Promo:
              </b>

              {" "}

              Promo berlaku
              untuk ukuran
              Regular.
              Upgrade Large
              ada tambahan
              biaya.

            </p>

            <span
              className="
                text-[#DB0007]
              "
            >

              •

            </span>

            <p>

              <b>
                Metode:
              </b>

              {" "}

              Pickup di outlet
              tujuan.

            </p>

            <span
              className="
                text-[#DB0007]
              "
            >

              •

            </span>

            <p>

              <b>
                Pembayaran:
              </b>

              {" "}

              Transaksi dilakukan
              via Admin WhatsApp
              setelah checkout.

            </p>

            <span
              className="
                text-[#DB0007]
              "
            >

              •

            </span>

            <p>

              <b>
                Harga &
                Ketersediaan:
              </b>

              {" "}

              Dapat berubah
              tergantung outlet
              yang dituju.

            </p>

          </div>

          <button

            onClick={() =>
              setShowTutorial(
                true
              )
            }

            className="
              w-full
              bg-[#fff0f0]
              rounded-2xl
              px-4
              py-3
              flex
              items-center
              justify-between
              text-[14px]
            "

          >

            <span
              className="
                flex
                items-center
                gap-2
              "
            >

              <Eye
                size={16}
              />

              Lihat Tutorial
              Pemesanan

            </span>

            <ChevronDown
              size={16}
            />

          </button>

          <div
  className={`
    mt-1
    rounded-2xl
    px-4
    py-3
    flex
    items-center
    justify-between
    transition-all
    duration-300

    ${
      storeOpen

        ? `
          bg-[#DB0007]
          text-white
        `

        : `
          bg-gray-100
          text-gray-700
          border
        `
    }
  `}
>

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    <div
      className={`
        w-3
        h-3
        rounded-full

        ${
          storeOpen

            ? `
              bg-green-300
              shadow-[0_0_12px_rgba(134,239,172,.9)]
            `

            : `
              bg-red-400
              shadow-[0_0_12px_rgba(248,113,113,.9)]
            `
        }
      `}
    ></div>

    <div>

      <p
        className={`
          text-[10px]
          uppercase
          tracking-wide

          ${
            storeOpen
              ? "text-white/70"
              : "text-gray-500"
          }
        `}
      >

        Status Store

      </p>

      <p
        className="
          text-sm
          font-semibold
        "
      >

        {
          storeOpen
            ? "Admin Online"
            : "Admin Offline"
        }

      </p>

    </div>

  </div>

  <div
    className={`
      px-3
      py-1.5
      rounded-full
      text-[11px]
      font-bold

      ${
        storeOpen

          ? `
            bg-white/15
            text-white
          `

          : `
            bg-red-100
            text-red-600
          `
      }
    `}
  >

    {
      getStoreStateLabel(
        storeOpen
      )
    }

  </div>

</div>

        </div>

        <div
          className="
            relative
            mb-4
          "
        >

          <Search

            size={16}

            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "

          />

          <input

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }

            placeholder="
              Cari menu favoritmu...
            "

            className="
              w-full
              rounded-3xl
              border
              bg-white
              py-3
              pl-10
              pr-4
              text-[14px]
            "

          />

        </div>

        <div
          className="
            flex
            gap-2
            overflow-x-auto
            pb-2
            mb-5
          "
        >

          {categories.map(
            (item) => (

              <button

                key={item}

                onClick={() =>
                  setFilter(item)
                }

                className={`
                  px-4
                  py-2
                  rounded-full
                  text-[13px]
                  whitespace-nowrap

                  ${
                    filter === item

                      ? `
                        bg-[#DB0007]
                        text-white
                      `

                      : `
                        bg-white
                        border
                      `
                  }
                `}

              >

                {item}

              </button>

            )
          )}

        </div>

        <div
          ref={listRef}
          className="
            space-y-7
          "
        >

          {Object.entries(
            groupedMenu
          ).map(
            ([title, items]) =>

              items.length > 0
              &&

              (
                <div
                  key={title}
                >

                  <h2
                    className="
                      text-[16px]
                      font-semibold
                      mb-3
                    "
                  >

                    {title}

                  </h2>

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                    "
                  >

                    {items.map(
                      (item) => (

                        <div
                          key={item.id}

                          className={`
                            transition
                            duration-200

                            ${
                              !storeOpen
                                ? `
                                  opacity-70
                                `
                                : ""
                            }
                          `}
                        >

                          <MenuCard
                            item={item}
                            disabled={
                              !storeOpen
                            }
                            onClick={() =>
                              handleOpen(
                                item
                              )
                            }
                          />

                        </div>

                      )
                    )}

                  </div>

                </div>
              )
          )}

        </div>

      </div>

      <div

        onClick={() => {

          if (!storeOpen)
            return

          navigate(
            "/kopken/cart"
          )

        }}

        className={`
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          w-[92%]
          max-w-md
          rounded-3xl
          px-5
          py-4
          flex
          items-center
          justify-between
          shadow-xl
          transition

          ${
            storeOpen

              ? `
                bg-[#DB0007]
                text-white
              `

              : `
                bg-gray-300
                text-gray-500
              `
          }
        `}
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <ShoppingBag
            size={18}
          />

          <div>

            <p
              className="
                text-xs
              "
            >

              {qty}
              {" "}
              item

            </p>

            <p
              className="
                font-semibold
                text-sm
              "
            >

              {
                qty > 0

                  ? `
                    Lihat keranjang
                  `

                  : `
                    Pilih menu
                  `
              }

            </p>

          </div>

        </div>

        <p
          className="
            font-bold
          "
        >

          Rp
          {" "}
          {format(total)}

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
            setSelectedItem(
              null
            )
          }

          onConfirm={
            handleConfirm
          }

        />
      )}

      <TutorialModal

        open={showTutorial}

        onClose={() =>
          setShowTutorial(
            false
          )
        }

      />

      <StoreClosedModal

  isOpen={
    !storeOpen &&
    !hideClosedModal
  }

  storeKey="kopken"

  onClose={() =>
    setHideClosedModal(true)
  }

/>

{/* FOOTER */}
          <div className="pt-3 pb-6">
            <p className="text-center text-xs text-gray-400">
  © 2026 Woffel Store. 
  <br />
  Designed & Developed by{" "}

  <a
  href="https://www.instagram.com/mhmdfiqriii_"
  target="_blank"
  rel="noreferrer"
  className="
    text-neutral-500
    hover:text-neutral-300
    transition-colors
    font-medium
  "
>
  @mhmdfiqriii_
</a>

</p>
          </div>

    </div>
  )

}

export default Kopken