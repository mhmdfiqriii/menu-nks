import {
  useEffect,
  useRef,
  useState
} from "react"

import {
  useNavigate
} from "react-router-dom"

import {
  ChevronLeft,
  Coffee
} from "lucide-react"

import StoreClosedModal from "../components/StoreClosedModal"

import {
  fetchStoreStatus,
  subscribeStoreStatus,
  removeStoreSubscription,
  isStoreOpen
} from "../utils/storeUtils.js"

function Fore() {

  const navigate =
    useNavigate()

  const realtimeChannelRef =
    useRef(null)

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

  if (
    storeOpen &&
    hideClosedModal
  ) {

    setTimeout(() => {

      setHideClosedModal(false)

    }, 0)

  }

}, [
  storeOpen,
  hideClosedModal
])

  return (

    <div
      className="
        max-w-md
        mx-auto
        min-h-screen
        bg-[#f6f7f2]
        relative
      "
    >

      {/* HEADER */}

      <div
        className="
          sticky
          top-0
          z-30
          bg-[#006041]
          text-white
          border-b
          border-white/10
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
              active:scale-95
              transition
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
              leading-tight
            "
          >

            <h1
              className="
                font-bold
                text-[15px]
              "
            >

              Fore Coffee

            </h1>

            <p
  className="
    text-[11px]
    text-white/75
    mt-1
  "
>

  Coming Soon

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

      {/* CONTENT */}

      <div className="p-4">

        <div
          className={`
            rounded-3xl
            bg-white
            p-5
            border
            shadow-sm
            transition
            duration-300

            ${
              !storeOpen
                ? `
                  opacity-75
                  pointer-events-none
                  blur-[1px]
                `
                : ""
            }
          `}
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >

            <div>

              <h2
                className="
                  text-[18px]
                  font-bold
                  text-[#006041]
                "
              >

                Fore Coffee

              </h2>

              <p
                className="
                  text-[12px]
                  text-gray-400
                  mt-1
                "
              >

                ⚠️This Page Still 
  Under Development by{" "}

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

            <div
              className={`
                w-3
                h-3
                rounded-full

                ${
                  storeOpen

                    ? `
                      bg-green-500
                      shadow-[0_0_12px_rgba(34,197,94,.9)]
                    `

                    : `
                      bg-red-500
                      shadow-[0_0_12px_rgba(239,68,68,.9)]
                    `
                }
              `}
            ></div>

          </div>

          <div
            className="
              rounded-2xl
              bg-[#f6f7f2]
              border
              p-4
            "
          >

            <p
              className="
                text-sm
                text-gray-600
                leading-relaxed
              "
            >

              Menu Fore sedang
              diproses.

              <br />
              <br />

              Silahkan pilih brand lain
              selain Fore,
              Kami akan update jika menu
              sudah tersedia.

            </p>

          </div>

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              rounded-2xl
              bg-[#006041]
              text-white
              px-4
              py-3
            "
          >

            <div>

              <p
                className="
                  text-[11px]
                  text-white/70
                "
              >

                STATUS STORE

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

            <div
              className={`
                px-3
                py-1.5
                rounded-full
                text-xs
                font-bold

                ${
                  storeOpen

                    ? `
                      bg-white/15
                    `

                    : `
                      bg-red-500/20
                      text-red-100
                    `
                }
              `}
            >

              {
                storeOpen
                  ? "OPEN"
                  : "CLOSED"
              }

            </div>

          </div>

        </div>

      </div>

      <StoreClosedModal

  isOpen={
    !storeOpen &&
    !hideClosedModal
  }

  storeKey="fore"

  onClose={() =>
    setHideClosedModal(true)
  }

/>
       {/* FOOTER */}
          <div className="pt-3 pb-6">
            <p className="text-center text-xs text-gray-400">
  © 2026 Woffel Store.
</p>
          </div>

    </div>

  )

}

export default Fore