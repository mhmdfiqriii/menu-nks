function MenuCard({
  item,
  onClick,
  disabled = false
}) {

  const format = (n) =>

    new Intl
      .NumberFormat(
        "id-ID"
      )
      .format(n)

  const discount =

    (
      item.originalPrice
      ||
      item.price
    )

    -

    item.price

  const handleClick =
    () => {

      if (disabled)
        return

      onClick?.()

    }

  return (

    <div
      className={`
        bg-white
        rounded-card
        border
        border-black/[0.04]
        p-3
        card-shadow
        transition-all
        duration-300

        ${
          disabled

            ? `
              opacity-60
              grayscale-[.15]
              pointer-events-none
            `

            : `
              active:scale-[0.985]
            `
        }
      `}
    >

      {/* IMAGE */}

      <div
        className="
          relative
          aspect-square
          bg-primary-soft
          rounded-[16px]
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >

        <img

          src={item.image}

          alt={item.name}

          className={`
            w-full
            h-full
            object-cover
            transition
            duration-300

            ${
              disabled
                ? `
                  brightness-[.82]
                `
                : ""
            }
          `}

        />

        {disabled && (

          <div
            className="
              absolute
              inset-0
              bg-black/20
              backdrop-blur-[1px]
              flex
              items-center
              justify-center
            "
          >

            <div
              className="
                px-3
                py-1.5
                rounded-full
                bg-white/90
                text-[10px]
                font-bold
                text-black
                tracking-wide
              "
            >

              STORE CLOSED

            </div>

          </div>

        )}

      </div>

      {/* TITLE */}

      <p
        className={`
          text-sm
          font-semibold
          mt-2
          leading-tight
          line-clamp-2
          transition

          ${
            disabled
              ? `
                text-gray-500
              `
              : ""
          }
        `}
      >

        {item.name}

      </p>

      {/* PRICE */}

      <div
        className="
          mt-1
          space-y-[2px]
        "
      >

        <p
          className={`
            text-xs
            line-through

            ${
              disabled

                ? `
                  text-gray-300
                `

                : `
                  text-gray-400
                `
            }
          `}
        >

          Rp
          {" "}
          {format(
            item.originalPrice
            ||
            item.price
          )}

        </p>

        <p
          className={`
            text-[15px]
            font-bold
            leading-tight

            ${
              disabled

                ? `
                  text-gray-500
                `

                : `
                  text-primary
                `
            }
          `}
        >

          Rp
          {" "}
          {format(
            item.price
          )}

        </p>

        {discount > 0 && (

          <p
            className={`
              text-[11px]
              leading-none

              ${
                disabled

                  ? `
                    text-gray-400
                  `

                  : `
                    text-green-600
                  `
              }
            `}
          >

            Hemat Rp
            {" "}
            {format(
              discount
            )}

          </p>

        )}

      </div>

      {/* BUTTON */}

      <button

        onClick={
          handleClick
        }

        disabled={
          disabled
        }

        className={`
          mt-3
          w-full
          py-2.5
          rounded-button
          text-xs
          font-semibold
          transition-all
          duration-200

          ${
            disabled

              ? `
                bg-gray-200
                text-gray-500
                cursor-not-allowed
              `

              : `
                bg-primary
                text-white
                active:scale-[0.97]
                active:opacity-90
              `
          }
        `}

      >

        {
          disabled
            ? "Store Tutup"
            : "Tambah"
        }

      </button>

    </div>

  )

}

export default MenuCard