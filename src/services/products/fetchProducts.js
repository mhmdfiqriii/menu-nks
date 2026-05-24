import { supabase }
from "../../lib/supabase"

import normalizeProduct
from "./normalizeProduct"

async function fetchProducts(
  brandName = null
) {

  let query = supabase

    .from("products")

    .select("*")

    .eq(
      "is_available",
      true
    )

    .order(
      "id",
      {
        ascending: true
      }
    )

  // =====================
  // FILTER BRAND
  // =====================

  if (brandName) {

    query = query.eq(
      "brand",
      brandName
    )

  }

  // =====================
  // FETCH
  // =====================

  const {
    data,
    error
  } = await query

  // =====================
  // ERROR
  // =====================

  if (error) {

    console.error(
      "FETCH PRODUCTS ERROR:",
      error
    )

    return []

  }

  // =====================
  // NORMALIZE
  // =====================

  return data.map(
    normalizeProduct
  )

}

export default fetchProducts