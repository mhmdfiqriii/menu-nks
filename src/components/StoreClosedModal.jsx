import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

function StoreClosedModal({
  isOpen = false,
  storeKey = "",
  onClose,
  whatsappNumber = "62895601988558",
  allowClose = true
}) {

  const navigate =
    useNavigate()

  const storeConfig =
    useMemo(() => {

      const configs = {

        kopken: {
          name:
            "Kopi Kenangan",

          emoji: "😔",

          color:
            "#E11D48",

          bg:
            "linear-gradient(135deg,#881337,#be123c)"
        },

        fore: {
          name:
            "Fore Coffee",

          emoji: "☕",

          color:
            "#2563EB",

          bg:
            "linear-gradient(135deg,#1e3a8a,#2563eb)"
        },

        tomoro: {
          name:
            "Tomoro Coffee",

          emoji: "🧋",

          color:
            "#EA580C",

          bg:
            "linear-gradient(135deg,#9a3412,#ea580c)"
        }

      }

      return (
        configs[storeKey]
        ||
        {
          name: "Store",
          emoji: "🚫",
          color: "#444",
          bg:
            "linear-gradient(135deg,#111,#222)"
        }
      )

    }, [storeKey])

  if (!isOpen)
    return null

  const whatsappText =
    encodeURIComponent(
      `Halo admin, apakah store sedang tutup?`
    )

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (

    <div className="
      store-overlay
    ">

      <div
        className="
          store-modal
        "
      >

        {allowClose && (

          <button

            onClick={onClose}

            className="
              absolute
              top-4
              right-4
              z-20
              w-9
              h-9
              rounded-full
              bg-black/10
              text-black
              text-xl
              flex
              items-center
              justify-center
            "

          >

            ×

          </button>

        )}

        <div

          className="
            store-modal-header
          "

          style={{
            background:
              storeConfig.bg
          }}

        >

          <div
            className="
              store-modal-badge
            "
          >

            <span
              className="
                text-[34px]
              "
            >

              {storeConfig.emoji}

            </span>

          </div>

          <h2
            className="
              store-modal-title
            "
          >

            {storeConfig.name}
            {" "}
            Sedang Tutup

          </h2>

          <p
            className="
              store-modal-subtitle
            "
          >

            Saat ini store
            sedang offline
            dan belum dapat
            menerima pesanan.

          </p>

        </div>

        <div
          className="
            store-modal-body
          "
        >

          <div
            className="
              store-modal-info
            "
          >

            <div
              className="
                store-modal-dot
              "
            ></div>

            <div
              className="
                store-modal-info-text
              "
            >

              Silakan hubungi
              admin untuk
              informasi lebih
              lanjut atau tunggu
              store dibuka kembali.

            </div>

          </div>

        </div>

        <div
          className="
            store-modal-actions
          "
        >

          <button

            onClick={() =>
              navigate("/")
            }

            className="
              store-btn
              store-btn-primary
            "

          >

            Kembali ke Home

          </button>

          <a

            href={whatsappLink}

            target="_blank"

            rel="noreferrer"

            className="
              store-btn
              store-btn-whatsapp
            "

          >

            Chat Admin

          </a>

        </div>

      </div>

    </div>

  )

}

export default StoreClosedModal