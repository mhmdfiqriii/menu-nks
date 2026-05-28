import { supabase }
from "../lib/supabase.js"

import { brands }
from "../mocks/menu.mock.js"

import normalizeBrandSlug
from "../utils/normalizeBrandSlug.js"

const products =

  brands.flatMap((brand) =>

    brand.menu.map((item) => ({

      brand: brand.name,

      slug: `${normalizeBrandSlug(
        brand.name
      )}-${item.id}`,

      name: item.name,

      category: item.category,

      price: item.price,

      original_price:
        item.originalPrice,

      image_url:
        item.image ||
        "/fallback-product.png",

      badge:
        item.badge || null,

      options:
        item.options || null,

      disable_large_charge:
        item.disableLargeCharge || false,

      is_available: true

    }))

  )

async function seedProducts() {

  console.log(
    "START SEED PRODUCTS..."
  )

  // =====================
  // DETECT DUPLICATES
  // =====================

  const duplicateSlugs = []

  const slugMap = new Map()

  products.forEach(product => {

    if (
      slugMap.has(product.slug)
    ) {

      duplicateSlugs.push(
        product.slug
      )

    }

    slugMap.set(
      product.slug,
      product
    )

  })

  // =====================
  // UNIQUE PRODUCTS
  // =====================

  const uniqueProducts =

    Array.from(
      slugMap.values()
    )

  // =====================
  // DUPLICATE LOG
  // =====================

  const uniqueDuplicates =

    [...new Set(
      duplicateSlugs
    )]

  if (
    uniqueDuplicates.length > 0
  ) {

    console.warn(
      "\nDUPLICATE DETECTED:"
    )

    uniqueDuplicates.forEach(
      slug => {

        console.warn(
          `- ${slug}`
        )

      }
    )

    console.warn(
      `TOTAL DUPLICATES: ${uniqueDuplicates.length}\n`
    )

  }

  console.log(
    `TOTAL PRODUCTS: ${products.length}`
  )

  console.log(
    `TOTAL UNIQUE PRODUCTS: ${uniqueProducts.length}`
  )

  // =====================
  // DEV AUTO CLEAN
  // =====================

  console.log(
    "NODE_ENV:",
    process.env.NODE_ENV
  )

  const isDevelopment =

  process.env.NODE_ENV
    ?.trim()
    .toLowerCase() ===
  "development"

  if (isDevelopment) {

    console.log(
      "DEV MODE DETECTED"
    )

    console.log(
      "CLEANING OLD PRODUCTS..."
    )

    const {
      error: deleteError
    } = await supabase

      .from("products")

      .delete()

.not("id", "is", null)

    if (deleteError) {

      console.error(
        "DELETE ERROR:",
        deleteError
      )

      return

    }

    console.log(
      "OLD PRODUCTS REMOVED"
    )

  }

  // =====================
  // UPSERT
  // =====================

  const { error } =

    await supabase

      .from("products")

      .upsert(uniqueProducts, {
        onConflict: "slug"
      })

  if (error) {

    console.error(
      "SEED ERROR:",
      error
    )

    return

  }

  console.log(
    "SEED SUCCESS"
  )

  console.log(
    "DATABASE SYNCHRONIZED"
  )

}

seedProducts()