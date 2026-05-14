const drinkCategories = [
  "Baru",
  "Coffee",
  "Non Coffee",
  "Little Kenangan",
  "Pistachio",
  "Oatside Series",
  "Frappe"
]

const drinkOptions = {
  Temperature: ["Ice", "Hot"],
  Size: ["Regular", "Large"],
  "Sugar Level": [
    "Normal Sugar",
    "Less Sugar",
    "No Sugar"
  ],
  "Ice Level": [
    "Normal Ice",
    "Less Ice",
    "No Ice"
  ]
}

// =========================
// KOPKEN MENU
// =========================

const kopkenMenu = [

 {
  "No.": 1,
  "Nama Produk": "OG Aren Milky Speculoos",
  "Harga Asli": 23000,
  "Harga Promo": 15000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/og_aren_milky_speculoos.png"
 },
 {
  "No.": 112,
  "Nama Produk": "Thai Chicken Spaghetti",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/thai_chicken_spaghetti.png"
 },
  {
  "No.": 113,
  "Nama Produk": "Pasta Indoghetti",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/indoghetti.png"
 },
  {
  "No.": 114,
  "Nama Produk": "Spaghetti Tuna Aglio Olio",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/tuna_aglio.png"
 },
  {
  "No.": 115,
  "Nama Produk": "Pasta Mentai",
  "Harga Asli": 24000,
  "Harga Promo": 15000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/pasta_mentai.png"
 },
 {
  "No.": 2,
  "Nama Produk": "OG Aren Speculoos Latte",
  "Harga Asli": 21000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/og_aren_speculoos_latte.png"
 },
 {
  "No.": 3,
  "Nama Produk": "Dua Shot OG Aren",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/dua_shot_og_aren.png"
 },
 {
  "No.": 4,
  "Nama Produk": "Canele Aren",
  "Harga Asli": 16000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/canele_aren.webp"
 },
 {
  "No.": 5,
  "Nama Produk": "Aren Apple Pie",
  "Harga Asli": 18000,
  "Harga Promo": 12000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/aren_apple_pie.webp"
 },
 {
  "No.": 6,
  "Nama Produk": "Choco Muffin",
  "Harga Asli": 16000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/muffin_choco.webp"
 },
 {
  "No.": 7,
  "Nama Produk": "Blueberry Muffin",
  "Harga Asli": 16000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/muffin_bluberry.webp"
 },
 {
  "No.": 8,
  "Nama Produk": "Choco Mocha Swirl Toast",
  "Harga Asli": 18000,
  "Harga Promo": 12000,
  "Kategori Produk": "Toast",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/toast/swirl.webp"
 },
 {
  "No.": 9,
  "Nama Produk": "Tiramisu Latte",
  "Harga Asli": 20000,
  "Harga Promo": 13000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/tiramisu_latte.webp"
 },
 {
  "No.": 10,
  "Nama Produk": "Tiramisu Mocha Latte",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/tiramisu_mocha.webp"
 },
 {
  "No.": 11,
  "Nama Produk": "Toffee Nut Latte",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/toffee_nut_latte.webp"
 },
 {
  "No.": 12,
  "Nama Produk": "Toffee Nut Aren Latte",
  "Harga Asli": 21000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/toffee_nut_aren.webp"
 },
 {
  "No.": 13,
  "Nama Produk": "Toffee Nut Oat Latte",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/toffee_nut_oat.webp"
 },
 {
  "No.": 14,
  "Nama Produk": "Dubai Pistachio Latte",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Pistachio",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/dubai_pistachio_latte.png"
 },
 {
  "No.": 15,
  "Nama Produk": "Pistachio Latte",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Pistachio",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/pistachio_latte.png"
 },
 {
  "No.": 16,
  "Nama Produk": "Pistachio Aren Latte",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Pistachio",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/pistachio_aren_latte.webp"
 },
 {
  "No.": 17,
  "Nama Produk": "Cafe Malt Latte",
  "Harga Asli": 23000,
  "Harga Promo": 15000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/cafe_malt.webp"
 },
 {
  "No.": 18,
  "Nama Produk": "Kopi Kenangan Mantan",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/kopi_kenangan_mantan.webp"
 },
 {
  "No.": 19,
  "Nama Produk": "Mocha Latte",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/mocha_latte.webp"
 },
 {
  "No.": 20,
  "Nama Produk": "Vanilla Latte",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/vanilla_latte.webp"
 },
 {
  "No.": 21,
  "Nama Produk": "Caramel Machiato",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/caramel_machiatto.webp"
 },
 {
  "No.": 22,
  "Nama Produk": "Hazelnut Latte",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/hazelnut_latte.webp"
 },
 {
  "No.": 23,
  "Nama Produk": "Kopi Susu Black Aren",
  "Harga Asli": 21000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/kopi_susu_aren.webp"
 },
 {
  "No.": 24,
  "Nama Produk": "Matcha Espresso",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/matcha_espresso.webp"
 },
 {
  "No.": 25,
  "Nama Produk": "Creamy Aren Latte",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/creamy_aren_latte.webp"
 },
 {
  "No.": 26,
  "Nama Produk": "Butterscoth Aren Latte",
  "Harga Asli": 20000,
  "Harga Promo": 13000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/butterscoth_aren.webp"
 },
 {
  "No.": 27,
  "Nama Produk": "Caramel Latte",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/caramel_latte.webp"
 },
 {
  "No.": 28,
  "Nama Produk": "Dua Shot Iced Shaken",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/dua_shot_shaken.webp"
 },
 {
  "No.": 29,
  "Nama Produk": "Avocado Coffe",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/avocado_coffee.webp"
 },
 {
  "No.": 30,
  "Nama Produk": "Spanish Latte",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/spanish_latte.webp"
 },
 {
  "No.": 31,
  "Nama Produk": "Butterscoth Sea Salt Latte",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/butterscoth_sea_salt.webp"
 },
 {
  "No.": 32,
  "Nama Produk": "Americano",
  "Harga Asli": 17000,
  "Harga Promo": 12000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/americano.webp"
 },
 {
  "No.": 33,
  "Nama Produk": "Capuccino",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/capuccino.webp"
 },
 {
  "No.": 34,
  "Nama Produk": "Latte",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/latte.webp"
 },
 {
  "No.": 35,
  "Nama Produk": "Toffe Nut Choco Macchiato",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Little Kenangan",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/little_kenangan/toffee_nut_choco_matchiato.jpg"
 },
 {
  "No.": 36,
  "Nama Produk": "Butterscoth Sea Salt Crumble",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Little Kenangan",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/little_kenangan/butterscoth_sea_salt_crumble.jpg"
 },
 {
  "No.": 37,
  "Nama Produk": "Milk Oreo Crumble",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Little Kenangan",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/little_kenangan/milk_oreo_crumble.jpg"
 },
 {
  "No.": 38,
  "Nama Produk": "Babyccino",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Little Kenangan",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/little_kenangan/babyccino.png"
 },
 {
  "No.": 39,
  "Nama Produk": "Hazelnut Choco Milk Tea",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/hazelnut_choco_milk.webp"
 },
 {
  "No.": 40,
  "Nama Produk": "Avocado Caramel",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/avocado_caramel.webp"
 },
 {
  "No.": 41,
  "Nama Produk": "Avocado Milk",
  "Harga Asli": 24000,
  "Harga Promo": 15000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/avocado_milk.webp"
 },
 {
  "No.": 42,
  "Nama Produk": "Caramel Dutch Choco",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/caramel_dutch_choco.webp"
 },
 {
  "No.": 43,
  "Nama Produk": "Dubai Pistachio Chocolate",
  "Harga Asli": 27000,
  "Harga Promo": 17000,
  "Kategori Produk": "Pistachio",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/dubai-pistachio-chocolate.png"
 },
 {
  "No.": 44,
  "Nama Produk": "Fresh Lemonade",
  "Harga Asli": 17000,
  "Harga Promo": 12000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/lemonade.webp"
 },
 {
  "No.": 45,
  "Nama Produk": "Dutch Chocolate",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/dutch_choco.webp"
 },
 {
  "No.": 46,
  "Nama Produk": "Hazelnut Dutch Choco",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/hazelnut_dutch_choco.webp"
 },
 {
  "No.": 47,
  "Nama Produk": "Lemon Black Tea",
  "Harga Asli": 17000,
  "Harga Promo": 12000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/lemon_black_tea.webp"
 },
 {
  "No.": 48,
  "Nama Produk": "Kenangan Milk Tea",
  "Harga Asli": 21000,
  "Harga Promo": 14000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/kenangan_milk_tea.webp"
 },
 {
  "No.": 50,
  "Nama Produk": "Matcha Latte",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/matcha_latte.webp"
 },
 {
  "No.": 51,
  "Nama Produk": "Milo Dinosaurus",
  "Harga Asli": 23000,
  "Harga Promo": 15000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/milo_dinosaurus.png"
 },
 {
  "No.": 52,
  "Nama Produk": "Oreo Shaken",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/oreo_shaken.webp"
 },
 {
  "No.": 53,
  "Nama Produk": "Oatside Matcha Latte",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Oatside Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/oatside/oatside_matcha_latte.webp"
 },
 {
  "No.": 54,
  "Nama Produk": "Raspberry Hibiscus",
  "Harga Asli": 20000,
  "Harga Promo": 13000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/raspberry_hibiscus.webp"
 },
 {
  "No.": 55,
  "Nama Produk": "Susu Grass Jelly",
  "Harga Asli": 24000,
  "Harga Promo": 15000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/susu_grass_jelly.webp"
 },
 {
  "No.": 56,
  "Nama Produk": "Tiramisu Frappe",
  "Harga Asli": 26000,
  "Harga Promo": 17000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/tiramisu.webp"
 },
 {
  "No.": 57,
  "Nama Produk": "Pistachio Frappe",
  "Harga Asli": 32000,
  "Harga Promo": 19000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/pistachio.png"
 },
 {
  "No.": 58,
  "Nama Produk": "Butterscoth Frappe",
  "Harga Asli": 30000,
  "Harga Promo": 18000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/butterscoth.webp"
 },
 {
  "No.": 59,
  "Nama Produk": "Matcha Frappe",
  "Harga Asli": 32000,
  "Harga Promo": 19000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/matcha.webp"
 },
 {
  "No.": 60,
  "Nama Produk": "Dutch Choco Frappe",
  "Harga Asli": 29000,
  "Harga Promo": 18000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/dutch_choco.webp"
 },
 {
  "No.": 61,
  "Nama Produk": "Kopi Kenangan Mantan Frappe",
  "Harga Asli": 27000,
  "Harga Promo": 17000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/mantan.webp"
 },
 {
  "No.": 62,
  "Nama Produk": "Vanila Frappe",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/vanilla.webp"
 },
 {
  "No.": 63,
  "Nama Produk": "Choco Caramel",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Non Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/non_coffee/choco_caramel.webp"
 },
 {
  "No.": 64,
  "Nama Produk": "Mocha Caramel",
  "Harga Asli": 26000,
  "Harga Promo": 16000,
  "Kategori Produk": "Coffee",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/coffee/mocha_caramel.webp"
 },
 {
  "No.": 65,
  "Nama Produk": "Choco Caramel Frappe",
  "Harga Asli": 28000,
  "Harga Promo": 17000,
  "Kategori Produk": "Frappe",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/frappe/choco_caramel.webp"
 },
 {
  "No.": 66,
  "Nama Produk": "Vanilla Choux Puff",
  "Harga Asli": 13000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/puff_vanilla.webp"
 },
 {
  "No.": 67,
  "Nama Produk": "Strawberry Choux Puff",
  "Harga Asli": 13000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/puff_strawberry.webp"
 },
 {
  "No.": 68,
  "Nama Produk": "Chocolate Choux Puff",
  "Harga Asli": 13000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/puff_chocolate.webp"
 },
 {
  "No.": 69,
  "Nama Produk": "Choco Chip Cookies",
  "Harga Asli": 14000,
  "Harga Promo": 10000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/choco_chip.webp"
 },
 {
  "No.": 70,
  "Nama Produk": "Join the Dark Side Cookies",
  "Harga Asli": 21000,
  "Harga Promo": 14000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/dark_side.webp"
 },
 {
  "No.": 71,
  "Nama Produk": "Butter Croissant",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/butter_croissant.webp"
 },
 {
  "No.": 72,
  "Nama Produk": "Chocolate Croissant",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/choco_croissant.webp"
 },
 {
  "No.": 73,
  "Nama Produk": "Donut Abon",
  "Harga Asli": 14000,
  "Harga Promo": 10000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_abon.webp"
 },
 {
  "No.": 74,
  "Nama Produk": "Donut Almond",
  "Harga Asli": 14000,
  "Harga Promo": 10000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_almond.png"
 },
 {
  "No.": 75,
  "Nama Produk": "Donut Matcha",
  "Harga Asli": 14000,
  "Harga Promo": 10000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_matcha.png"
 },
 {
  "No.": 76,
  "Nama Produk": "Donut Pink Confetti",
  "Harga Asli": 12000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_pink_confetti.png"
 },
 {
  "No.": 77,
  "Nama Produk": "Cheese Donut",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_cheese.webp"
 },
 {
  "No.": 78,
  "Nama Produk": "Sugar Donut",
  "Harga Asli": 10000,
  "Harga Promo": 8000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_sugar.webp"
 },
 {
  "No.": 79,
  "Nama Produk": "Roti Gulung Abon",
  "Harga Asli": 18000,
  "Harga Promo": 12000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/gulung_abon.webp"
 },
 {
  "No.": 80,
  "Nama Produk": "Roto Gulung Aren",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/gulung_aren.webp"
 },
 {
  "No.": 81,
  "Nama Produk": "Donut Tiramisu",
  "Harga Asli": 14000,
  "Harga Promo": 10000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/donut_tiramisu.webp"
 },
 {
  "No.": 82,
  "Nama Produk": "Danish Tiramisu",
  "Harga Asli": 20000,
  "Harga Promo": 13000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/danish_tiramisu.webp"
 },
 {
  "No.": 83,
  "Nama Produk": "Roti Sisir Original",
  "Harga Asli": 12000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/sisir_original.webp"
 },
 {
  "No.": 84,
  "Nama Produk": "Roti Sisir Keju",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/sisir_keju.webp"
 },
 {
  "No.": 85,
  "Nama Produk": "Salt Bread Original",
  "Harga Asli": 12000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/salt_original.webp"
 },
 {
  "No.": 86,
  "Nama Produk": "Salt Bread Beef and Cheese",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/salt_beef.webp"
 },
 {
  "No.": 87,
  "Nama Produk": "Roti Sisir Coklat",
  "Harga Asli": 14000,
  "Harga Promo": 10000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/sisir_coklat.webp"
 },
 {
  "No.": 88,
  "Nama Produk": "Dirty Croissant Milo",
  "Harga Asli": 20000,
  "Harga Promo": 13000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/dirty_chocolate.webp"
 },
  {
  "No.": 111,
  "Nama Produk": "Dirty Croissant Matcha",
  "Harga Asli": 20000,
  "Harga Promo": 13000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/dirty_matcha.png"
 },
 {
  "No.": 89,
  "Nama Produk": "Bolu Marble Chocolate",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/bolu_marble_chocolate.png"
 },
 {
  "No.": 90,
  "Nama Produk": "Bolu Marble Ube",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/bolu_marble_ube.png"
 },
 {
  "No.": 91,
  "Nama Produk": "Roti Keju Manis",
  "Harga Asli": 12000,
  "Harga Promo": 9000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/roti_keju.webp"
 },
 {
  "No.": 92,
  "Nama Produk": "Roti Srikaya",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/roti_srikaya.webp"
 },
 {
  "No.": 93,
  "Nama Produk": "Bolu Marble Mocha",
  "Harga Asli": 15000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/bolu_marble_mocha.png"
 },
 {
  "No.": 94,
  "Nama Produk": "Croissant Abon",
  "Harga Asli": 18000,
  "Harga Promo": 12000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/croissant_abon.webp"
 },
 {
  "No.": 95,
  "Nama Produk": "Sandwich Smoked Beef and Cheese",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/sandwich_beef.webp"
 },
 {
  "No.": 96,
  "Nama Produk": "Sandwich Chicken Tartar",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/sandwich_chicken.webp"
 },
 {
  "No.": 97,
  "Nama Produk": "Bambang Choco Cheese Toast",
  "Harga Asli": 17000,
  "Harga Promo": 12000,
  "Kategori Produk": "Toast",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/toast/bambang.webp"
 },
 {
  "No.": 98,
  "Nama Produk": "Adam Ayam Toast",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Toast",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/toast/adam.webp"
 },
 {
  "No.": 99,
  "Nama Produk": "Roti Coklat Klasik",
  "Harga Asli": 9000,
  "Harga Promo": 8000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/roti_coklat.webp"
 },
 {
  "No.": 100,
  "Nama Produk": "Roti Susu Manis",
  "Harga Asli": 9000,
  "Harga Promo": 8000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/roti_susu.webp"
 },
 {
  "No.": 101,
  "Nama Produk": "Wahyu Sapi Toast",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Toast",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/toast/wahyu.webp"
 },
 {
  "No.": 102,
  "Nama Produk": "Friend Chip Cookies",
  "Harga Asli": 17000,
  "Harga Promo": 12000,
  "Kategori Produk": "Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/food/friend_chip.webp"
 },
 {
  "No.": 103,
  "Nama Produk": "Canele Original",
  "Harga Asli": 13000,
  "Harga Promo": 9000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/canele.webp"
 },
 {
  "No.": 104,
  "Nama Produk": "Canele Toffee Nut Crumble",
  "Harga Asli": 18000,
  "Harga Promo": 11000,
  "Kategori Produk": "Signature Food",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/signaturebake/canele_toffee_nut.webp"
 },
 {
  "No.": 105,
  "Nama Produk": "Oatside Latte",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Oatside Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/oatside/oatside_latte.webp"
 },
 {
  "No.": 106,
  "Nama Produk": "Oatside Kopi Kenangan",
  "Harga Asli": 22000,
  "Harga Promo": 14000,
  "Kategori Produk": "Oatside Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/oatside/oatside_kkm.webp"
 },
 {
  "No.": 107,
  "Nama Produk": "OG Thai Tea",
  "Harga Asli": 19000,
  "Harga Promo": 13000,
  "Kategori Produk": "Thai Tea Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/baru/og_thai_tea.webp"
 },
 {
  "No.": 108,
  "Nama Produk": "Thai Tea Loaded",
  "Harga Asli": 27000,
  "Harga Promo": 17000,
  "Kategori Produk": "Thai Tea Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/baru/thai_tea_loaded.webp"
 },
 {
  "No.": 109,
  "Nama Produk": "Thai Tea Aren",
  "Harga Asli": 24000,
  "Harga Promo": 15000,
  "Kategori Produk": "Thai Tea Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/baru/thai_tea_aren.webp"
 },
 {
  "No.": 110,
  "Nama Produk": "Thai Tea Coffee",
  "Harga Asli": 25000,
  "Harga Promo": 16000,
  "Kategori Produk": "Thai Tea Series",
  "SUPABASE URL PUBLIC": "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/baru/thai_tea_coffee.webp"
 }
]

// =========================
// AUTO NORMALIZE MENU
// =========================

const onlyIce = {
  Temperature: ["Ice"]
}

const onlyLarge = {
  Size: ["Large"]
}

const onlyRegular = {
  Size: ["Regular"]
}

const onlyIceLarge = {
  Temperature: ["Ice"],
  Size: ["Large"]
}

const onlyIceRegular = {
  Temperature: ["Ice"],
  Size: ["Regular"]
}

const normalizedKopkenMenu =
  kopkenMenu.map((item) => {

    const name =
      item["Nama Produk"] || ""

    const price =
      Number(item["Harga Promo"]) || 0

    const originalPrice =
      Number(item["Harga Asli"]) || price

    const category =
      item["Kategori Produk"] || "Food"

    const image =
      item["SUPABASE URL PUBLIC"] || ""

    const productName = name

    const normalized = {
      id: name
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-"),

      name: name,

      category: category,

      price: price,

      originalPrice: originalPrice,

      badge:
        originalPrice > price
          ? "Promo"
          : "",

      image: image
    }

    // AUTO OPTIONS ONLY DRINK
    if (
  drinkCategories.includes(category)
) {

  normalized.options = {
    ...drinkOptions
  }

  // ======================
  // THAI TEA
  // ======================

  if (
  productName.includes("Thai Tea Loaded")
) {
  normalized.options = {
    ...drinkOptions,
    ...onlyIceLarge
  }

  normalized.disableLargeCharge = true
}

if (
  productName.includes("Thai Tea Aren")
) {
  normalized.options = {
    ...drinkOptions,
    ...onlyLarge
  }

  normalized.disableLargeCharge = true
}

if (
  productName.includes("Thai Tea Coffee")
) {
  normalized.options = {
    ...drinkOptions,
    ...onlyLarge
  }

  normalized.disableLargeCharge = true
}

  // ======================
  // FRAPPE
  // ======================

  if (
    category === "Frappe"
  ) {
    normalized.options = {
      ...drinkOptions,
      ...onlyIce
    }
  }

  // ======================
  // LITTLE KENANGAN
  // ======================

  if (
    productName.includes("Milk Oreo Crumble")
  ) {
    normalized.options = {
      ...drinkOptions,
      ...onlyIceRegular
    }
  }

  if (
    productName.includes("Babyccino") ||
    productName.includes("Toffee Nut Choco Macchiato") ||
    productName.includes("Butterscoth Sea Salt Crumble")
  ) {
    normalized.options = {
      ...drinkOptions,
      ...onlyRegular
    }
  }

  // ======================
  // NON COFFEE ONLY ICE
  // ======================

  if (
    productName.includes("Fresh Lemonade") ||
    productName.includes("Avocado Coffe") ||
    productName.includes("Avocado Caramel") ||
    productName.includes("Avocado Milk") ||
    productName.includes("Lemon Black Tea") ||
    productName.includes("Oreo Shaken") ||
    productName.includes("Raspberry Hibiscus") ||
    productName.includes("Susu Grass Jelly")
  ) {
    normalized.options = {
      ...drinkOptions,
      ...onlyIce
    }
  }

  // ======================
  // ONLY LARGE
  // ======================

  if (
    productName.includes("Fresh Lemonade")
  ) {
    normalized.options = {
      ...drinkOptions,
      ...onlyIceLarge
    }
    normalized.disableLargeCharge = true
  }
  
}

    return normalized
  })

// =========================
// BRANDS
// =========================

export const brands = [
  {
    name: "Kopi Kenangan",
    menu: normalizedKopkenMenu
  },

  {
    name: "Janji Jiwa",
    menu: []
  },

  {
    name: "Fore",
    menu: []
  }
]

// =========================
// DIGITAL PRODUCTS
// =========================

export const digitalProducts = [
  {
    id: "imei",
    name: "Unblock IMEI",
    type: "imei",
    image: "imei",
    variants: [
      {
        name: "1 Bulan",
        price: 65000
      },

      {
        name: "3 Bulan",
        price: 85000
      }
    ]
  },

  {
    id: "internet",
    name: "Paket Akrab XL/Axis",
    type: "internet",
    image: "kouta",

    variants: [
      {
        name: "XDA / Super Mini",
        price: 50000
      },

      {
        name: "XDA25 / Extra Mini",
        price: 56000
      },

      {
        name: "XDA31 / Mini",
        price: 62000
      },

      {
        name: "XDA38 / Big",
        price: 68000
      },

      {
        name: "XDA50 / Jumbo V2",
        price: 75000
      },

      {
        name: "XDA63 / Super Big",
        price: 85000
      },

      {
        name: "XDA76 / Super Jumbo",
        price: 93000
      },

      {
        name: "XDA88 / Mega Big",
        price: 105000
      }
    ]
  }
]