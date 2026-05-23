import { supabase }
from "../lib/supabase.js"

import { brands }
from "../data/menu.js"

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
  // REMOVE DUPLICATES
  // =====================

  const duplicateSlugs = []

  const uniqueProducts =

    Array.from(

      new Map(

        products.map(item => {

          if (

            products.filter(
              product =>

                product.slug ===
                item.slug

            ).length > 1

          ) {

            duplicateSlugs.push(
              item.slug
            )

          }

          return [
            item.slug,
            item
          ]

        })

      ).values()

    )

  // =====================
  // DUPLICATE LOG
  // =====================

  if (duplicateSlugs.length > 0) {

    console.log(
      "DUPLICATE SLUGS:"
    )

    console.table(
      [...new Set(
        duplicateSlugs
      )]
    )

  }

  console.log(
    `TOTAL PRODUCTS: ${products.length}`
  )

  console.log(
    `TOTAL UNIQUE PRODUCTS: ${uniqueProducts.length}`
  )

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