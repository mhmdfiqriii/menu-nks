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
  isStoreOpen,
  getStoreStateLabel
} from "../utils/storeUtils.js"

function Fore() {

  const navigate =
    useNavigate()

  const realtimeChannelRef =
    useRef(null)

  const [storeStatus,
    setStoreStatus] =
      useState({
        fore: true
      })

  const showClosedModal =
  !storeOpen

  const storeOpen =
    isStoreOpen(
      storeStatus,
      "fore"
    )

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
          bg-[#006041]/90
          backdrop-blur-md
          text-white
          border-b
          border-white/10
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

            <div
              className="
                flex
                items-center
                gap-2
                mt-1
              "
            >

              <p
                className="
                  text-[11px]
                  text-white/75
                "
              >

                Coming Soon

              </p>

              <div
                className={`
                  px-2
                  py-[2px]
                  rounded-full
                  text-[10px]
                  font-semibold

                  ${
                    storeOpen

                      ? `
                        bg-green-400/20
                        text-green-200
                      `

                      : `
                        bg-red-400/20
                        text-red-200
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

                Sistem realtime
                store monitoring

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
              disiapkan.

              <br />
              <br />

              Kapitalisme butuh
              waktu.
              Developer juga
              butuh tidur,
              walau biasanya
              manusia malah
              ngide deploy jam 2 pagi.

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

                    ? `
                      Admin Online
                    `

                    : `
                      Admin Offline
                    `
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

      {/* STORE CLOSED MODAL */}

      <StoreClosedModal

  isOpen={
    showClosedModal
  }

  storeKey="fore"

  onClose={() => {}}

  whatsappNumber="
    628123456789
  "

/>

    </div>

  )

}

export default Fore