import {
  useEffect,
  useState
} from "react"

import fetchProducts
from "../services/products/fetchProducts"

import subscribeProducts, {
  removeProductsSubscription
} from "../services/products/subscribeProducts"

function useProducts(
  brandName
) {

  const [
    products,
    setProducts
  ] = useState([])

  const [
    loading,
    setLoading
  ] = useState(true)

  useEffect(() => {

    let mounted = true

    let realtimeChannel = null

    // =====================
    // INITIAL FETCH
    // =====================

    const loadProducts =
      async () => {

        setLoading(true)

        const data =

          await fetchProducts(
            brandName
          )

        if (!mounted)
          return

        setProducts(data)

        setLoading(false)

      }

    loadProducts()

    // =====================
    // REALTIME
    // =====================

    realtimeChannel =

      subscribeProducts(
        (payload) => {

          const {
            type,
            product
          } = payload

          // =====================
          // FILTER BRAND
          // =====================

          if (
            brandName &&
            product.brand !==
            brandName
          ) {

            return

          }

          setProducts((prev) => {

            // =====================
            // INSERT
            // =====================

            if (
              type === "INSERT"
            ) {

              // SKIP unavailable
              if (
                !product.isAvailable
              ) {

                return prev

              }

              const exists =
                prev.some(
                  (item) =>

                    item.id ===
                    product.id
                )

              if (exists)
                return prev

              return [
                ...prev,
                product
              ]

            }

            // =====================
            // UPDATE
            // =====================

            if (
              type === "UPDATE"
            ) {

              // REMOVE unavailable
              if (
                !product.isAvailable
              ) {

                return prev.filter(
                  (item) =>

                    item.id !==
                    product.id
                )

              }

              const exists =
                prev.some(
                  (item) =>

                    item.id ===
                    product.id
                )

              // INSERT BACK
              // kalau sebelumnya hidden
              if (!exists) {

                return [
                  ...prev,
                  product
                ]

              }

              // UPDATE existing
              return prev.map(
                (item) =>

                  item.id ===
                  product.id

                    ? product
                    : item
              )

            }

            // =====================
            // DELETE
            // =====================

            if (
              type === "DELETE"
            ) {

              return prev.filter(
                (item) =>

                  item.id !==
                  product.id
              )

            }

            return prev

          })

        }
      )

    // =====================
    // CLEANUP
    // =====================

    return () => {

      mounted = false

      removeProductsSubscription(
        realtimeChannel
      )

    }

  }, [brandName])

  return {
    products,
    loading
  }

}

export default useProducts