import { supabase } from "../lib/supabase"
import { brands } from "../data/menu"

const products =
  brands.flatMap((brand) =>
    brand.menu.map((item) => ({
      slug: item.id,

      name: item.name,

      category: item.category,

      price: item.price,

      original_price:
        item.originalPrice,

      image_url:
        item.image,

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

  // =========================
  // DUPLICATE FILTER
  // =========================

  const uniqueProducts =
    Array.from(
      new Map(
        products.map((item) => [
          item.slug,
          item
        ])
      ).values()
    )

  console.log(
    `TOTAL UNIQUE PRODUCTS: ${uniqueProducts.length}`
  )

  // =========================
  // INSERT
  // =========================

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
}

seedProducts()