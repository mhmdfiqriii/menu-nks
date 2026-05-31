import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

function StoreClosedModal({
  isOpen = false,
  storeKey = "",
  onClose,
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
            "#DB0007"
        },

        fore: {
          name:
            "Fore Coffee",


          emoji: "😔",

          color:
            "#006041"
        },

        tomoro: {
          name:
            "Tomoro Coffee",

          emoji: "😔",

          color:
            "#FFA688"
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

  const whatsappLink =
  `https://wa.me/62895392433433`

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