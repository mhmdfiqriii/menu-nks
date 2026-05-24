import { supabase }
from "../../lib/supabase"

import normalizeProduct
from "./normalizeProduct"

function subscribeProducts(
  callback
) {

  const channel = supabase

    .channel(
      "products-realtime"
    )

    // =====================
    // INSERT
    // =====================

    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "products"
      },
      (payload) => {

        callback({
          type: "INSERT",
          product:
            normalizeProduct(
              payload.new
            )
        })

      }
    )

    // =====================
    // UPDATE
    // =====================

    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "products"
      },
      (payload) => {

        callback({
          type: "UPDATE",
          product:
            normalizeProduct(
              payload.new
            )
        })

      }
    )

    // =====================
    // DELETE
    // =====================

    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "products"
      },
      (payload) => {

        callback({
          type: "DELETE",
          product:
            normalizeProduct(
              payload.old
            )
        })

      }
    )

    .subscribe()

  return channel

}

export function removeProductsSubscription(
  channel
) {

  if (!channel)
    return

  supabase.removeChannel(
    channel
  )

}

export default subscribeProducts