import { supabase } from "../lib/supabase"

export const STORE_KEYS = [
  "kopken",
  "fore",
  "tomoro"
]

export const DEFAULT_STORE_STATUS = {
  kopken: true,
  fore: true,
  tomoro: true
}

export const normalizeStoreData = (
  data = []
) => {

  const result = {
    ...DEFAULT_STORE_STATUS
  }

  data.forEach(store => {

    if (
      store?.store_key
    ) {

      result[
        store.store_key
      ] = store.is_open

    }

  })

  return result

}

export const fetchStoreStatus =
  async () => {

    const { data, error } =
      await supabase
        .from("store_status")
        .select(`
          store_key,
          is_open,
          updated_at
        `)

    if (error) {

      console.log(
        "Fetch store status error:",
        error
      )

      return {
        success: false,
        data:
          DEFAULT_STORE_STATUS
      }

    }

    return {
      success: true,
      data:
        normalizeStoreData(
          data
        )
    }

  }

export const updateStoreStatus =
  async (
    storeKey,
    isOpen
  ) => {

    const { error } =
      await supabase
        .from("store_status")
        .update({
          is_open: isOpen,
          updated_at:
            new Date()
              .toISOString()
        })
        .eq(
          "store_key",
          storeKey
        )

    if (error) {

      console.log(
        "Update store error:",
        error
      )

      return {
        success: false,
        error
      }

    }

    return {
      success: true
    }

  }

export const subscribeStoreStatus =
  (
    callback
  ) => {

    const channel =
      supabase

        .channel(
          "store-status-realtime"
        )

        .on(
          "postgres_changes",

          {
            event: "*",
            schema: "public",
            table:
              "store_status"
          },

          async () => {

            const result =
              await fetchStoreStatus()

            callback(
              result.data
            )

          }
        )

        .subscribe()

    return channel

  }

export const removeStoreSubscription =
  async (
    channel
  ) => {

    if (!channel)
      return

    await supabase
      .removeChannel(
        channel
      )

  }

export const isStoreOpen =
  (
    storeStatus,
    storeKey
  ) => {

    return Boolean(
      storeStatus?.[
        storeKey
      ]
    )

  }

export const getStoreStateLabel =
  (
    isOpen
  ) => {

    return isOpen
      ? "Admin Online"
      : "Admin Offline"

  }

export const getStoreBadgeType =
  (
    isOpen
  ) => {

    return isOpen
      ? "online"
      : "offline"

  }

export const getStoreClosedMessage =
  (
    storeName
  ) => {

    return `${storeName} sedang tutup sementara.`

  }

export const getStoreWhatsappLink =
  (
    phone,
    storeName
  ) => {

    const text =
      encodeURIComponent(
        `Halo admin ${storeName}, apakah store sedang tutup?`
      )

    return `
      https://wa.me/${phone}?text=${text}
    `.replace(/\s/g, "")

  }

export const createDefaultStoreRows =
  () => {
    return STORE_KEYS.map(
      key => ({
        store_key: key,
        is_open: true,
        updated_at:
          new Date()
            .toISOString()

      })
    )

  }
