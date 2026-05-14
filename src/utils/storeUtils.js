import { supabase } from "../lib/supabase"

export const DEFAULT_STORE_STATUS = {
  admin_status: "offline"
}

export const normalizeStoreData =
  (data) => {

    if (!data) {

      return {
        admin_status:
          "offline"
      }

    }

    return {

      admin_status:

        data.admin_status ===
        "online"

          ? "online"

          : "offline"

    }

  }

export const fetchStoreStatus =
  async () => {

    const {
      data,
      error
    } = await supabase

      .from("settings")

      .select(`
        admin_status,
        updated_at
      `)

      .eq("id", 1)

      .single()

    if (error) {

      console.log(
        "Fetch settings error:",
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
    isOpen
  ) => {

    const {
      error
    } = await supabase

      .from("settings")

      .update({

        admin_status:

          isOpen
            ? "online"
            : "offline",

        updated_at:
          new Date()
            .toISOString()

      })

      .eq("id", 1)

    if (error) {

      console.log(
        "Update settings error:",
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
          "settings-realtime"
        )

        .on(
          "postgres_changes",

          {
            event: "UPDATE",
            schema: "public",
            table: "settings",
            filter: "id=eq.1"
          },

          payload => {

            if (!payload.new)
              return

            callback(

              normalizeStoreData(
                payload.new
              )

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
    storeStatus
  ) => {

    return (

      storeStatus
        ?.admin_status ===
      "online"

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

    return `
      ${storeName}
      sedang tutup sementara.
    `

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