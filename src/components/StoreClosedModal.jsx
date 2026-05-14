import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

function StoreClosedModal({
  isOpen = false,
  storeKey = "",
  onClose,
  whatsappNumber = "62895601988558",
  allowClose = true
}) {

  const navigate = useNavigate()

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
      `Halo admin ${storeConfig.name}, apakah store sedang tutup?`
    )

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (

    <div
      className="
        store-closed-overlay
      "
    >

      <div
        className="
          store-closed-backdrop
        "
      ></div>

      <div
        className="
          store-closed-modal
        "
      >

        {allowClose && (

          <button

            onClick={onClose}

            className="
              store-closed-close
            "

          >

            ×

          </button>

        )}

        <div

          className="
            store-closed-header
          "

          style={{
            background:
              storeConfig.bg
          }}

        >

          <div className="
            store-closed-emoji
          ">

            {storeConfig.emoji}

          </div>

        </div>

        <div className="
          store-closed-body
        ">

          <h2 className="
            store-closed-title
          ">

            {storeConfig.name}
            {" "}
            Sedang Tutup

          </h2>

          <p className="
            store-closed-subtitle
          ">

            Mohon maaf,
            saat ini menu
            {" "}
            <strong>
              {storeConfig.name}
            </strong>
            {" "}
            sedang tutup
            dan belum dapat
            diakses sementara.

          </p>

          <p className="
            store-closed-desc
          ">

            Silakan hubungi
            admin untuk
            informasi lebih
            lanjut atau tunggu
            store dibuka kembali.

          </p>

          <div className="
            store-closed-actions
          ">

            <button

              onClick={() =>
                navigate("/")
              }

              className="
                store-closed-btn
                store-closed-btn-home
              "

            >

              Kembali ke Home

            </button>

            <a

              href={whatsappLink}

              target="_blank"

              rel="noreferrer"

              className="
                store-closed-btn
                store-closed-btn-wa
              "

            >

              Chat Admin

            </a>

          </div>

        </div>

      </div>

    </div>

  )

}

export default StoreClosedModal