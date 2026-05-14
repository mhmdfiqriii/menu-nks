import { MessageCircle } from "lucide-react"

function Header({
  status = "offline"
}) {

  const online =
    status === "online"

  const reconnecting =
    status === "reconnecting"

  const connecting =
    status === "connecting"

  const getLabel = () => {

    if (online) {
      return "Admin Online"
    }

    if (reconnecting) {
      return "Reconnect..."
    }

    if (connecting) {
      return "Connecting..."
    }

    return "Admin Offline"

  }

  const getBadgeClass = () => {

    if (online) {

      return `
        bg-emerald-100
        text-emerald-700
        border
        border-emerald-200
      `

    }

    if (
      reconnecting ||
      connecting
    ) {

      return `
        bg-yellow-100
        text-yellow-700
        border
        border-yellow-200
      `

    }

    return `
      bg-red-100
      text-red-700
      border
      border-red-200
    `

  }

  const getDotClass = () => {

    if (online) {
      return "bg-emerald-500"
    }

    if (
      reconnecting ||
      connecting
    ) {

      return `
        bg-yellow-500
        animate-pulse
      `

    }

    return `
      bg-red-500
      animate-pulse
    `

  }

  return (

    <div
      className="
        sticky
        top-0
        z-50
        glass
        border-b
        border-white/30
        backdrop-blur-xl
      "
    >

      <div
        className="
          max-w-md
          mx-auto
          px-4
          h-[68px]
          flex
          items-center
          justify-between
          gap-3
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            min-w-0
          "
        >

          <div
            className="
              relative
              shrink-0
            "
          >

            <img

              src="
                https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/brands/woffel-store/logo.png
              "

              alt="
                Woffel Store
              "

              className="
                w-11
                h-11
                rounded-2xl
                object-cover
                shadow-sm
              "

            />

            <div
              className={`
                absolute
                -bottom-1
                -right-1
                w-4
                h-4
                rounded-full
                border-2
                border-white
                ${getDotClass()}
              `}
            ></div>

          </div>

          <div className="min-w-0">

            <p
              className="
                font-extrabold
                text-[13px]
                tracking-[1px]
                text-gray-900
                truncate
              "
            >

              WOFFEL STORE

            </p>

            <div
              className={`
                mt-1
                inline-flex
                items-center
                gap-1.5
                px-2.5
                py-[5px]
                rounded-full
                text-[10px]
                font-semibold
                transition-all
                duration-300
                ${getBadgeClass()}
              `}
            >

              <span
                className={`
                  w-1.5
                  h-1.5
                  rounded-full
                  ${getDotClass()}
                `}
              ></span>

              {getLabel()}

            </div>

          </div>

        </div>

        <button

          onClick={() =>

            window.open(
              "https://wa.me/62895601988558"
            )

          }

          className={`
            h-10
            px-4
            rounded-2xl
            text-white
            text-xs
            font-semibold
            flex
            items-center
            gap-2
            transition-all
            duration-200
            shadow-md
            active:scale-95

            ${
              online

                ? `
                  bg-emerald-600
                `

                : `
                  bg-gray-700
                `
            }
          `}

        >

          <MessageCircle
            size={15}
          />

          Admin

        </button>

      </div>

    </div>

  )

}

export default Header