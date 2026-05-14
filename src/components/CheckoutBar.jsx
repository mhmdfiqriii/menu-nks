function CheckoutBar({
  total,
  onClick,
  loading,
  disabled = false,
  closedText = "Store Sedang Tutup"
}) {

  const formatRupiah =
    new Intl
      .NumberFormat("id-ID")
      .format(total)

  const handleCheckout =
    () => {

      if (
        loading ||
        disabled
      ) return

      onClick?.()

    }

  return (

    <div
      className="
        fixed
        bottom-4
        left-0
        w-full
        px-3
        z-40
      "
    >

      <div
        className={`
          max-w-md
          mx-auto
          flex
          items-center
          justify-between
          gap-3
          rounded-[24px]
          border
          px-4
          py-4
          backdrop-blur-xl
          premium-shadow
          transition-all
          duration-300

          ${
            disabled

              ? `
                border-red-200/60
                bg-red-50/92
              `

              : `
                border-white/60
                bg-white/88
              `
          }
        `}
      >

        <div>

          <p
            className={`
              text-xs

              ${
                disabled
                  ? "text-red-400"
                  : "text-gray-500"
              }
            `}
          >

            {
              disabled
                ? "Checkout Disabled"
                : "Total"
            }

          </p>

          <h3
            className={`
              font-semibold
              transition

              ${
                disabled
                  ? "text-red-500"
                  : "text-black"
              }
            `}
          >

            Rp
            {" "}
            {formatRupiah}

          </h3>

          {disabled && (

            <p
              className="
                text-[11px]
                text-red-400
                mt-1
                leading-tight
              "
            >

              Admin sedang offline.
              Order ditahan dulu.
              Teknologi kadang
              ikut tidur.

            </p>

          )}

        </div>

        <button

          onClick={
            handleCheckout
          }

          disabled={
            loading ||
            disabled
          }

          className={`
            px-6
            py-3
            rounded-button
            text-sm
            font-semibold
            w-1/2
            transition-all
            duration-200

            ${
              disabled

                ? `
                  bg-red-200
                  text-red-500
                  cursor-not-allowed
                  opacity-90
                `

                : loading

                  ? `
                    bg-primary/70
                    text-white
                    cursor-wait
                  `

                  : `
                    bg-primary
                    text-white
                    active:scale-[0.97]
                  `
            }
          `}
        >

          {

            disabled

              ? closedText

              : loading

                ? "Loading..."

                : "Checkout"

          }

        </button>

      </div>

    </div>

  )

}

export default CheckoutBar