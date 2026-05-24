function normalizeProduct(product) {

  return {

    // =====================
    // BASIC
    // =====================

    id:
      product.id,

    slug:
      product.slug,

    brand:
      product.brand,

    name:
      product.name,

    category:
      product.category,

    // =====================
    // PRICE
    // =====================

    price:
      product.price || 0,

    originalPrice:
      product.original_price ||
      product.price ||
      0,

    // =====================
    // IMAGE
    // =====================

    image:
      product.image_url ||
      "/fallback-product.png",

    // =====================
    // UI
    // =====================

    badge:
      product.badge || "",

    options:
      product.options || {},

    disableLargeCharge:
      product.disable_large_charge || false,

    // =====================
    // DATABASE
    // =====================

    is_available:
      product.is_available ?? true

  }

}

export default normalizeProduct