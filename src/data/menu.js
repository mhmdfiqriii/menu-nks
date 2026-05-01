// src/data/menu.js
export const brands = [
  {
    name: "Kopi Kenangan",
    menu: [
      {
        id: 1,
        name: "Kopi Kenangan Mantan",
        category: "Coffee",
        price: 13000,
        originalPrice: 19000,
        badge: "Promo",
        image: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/kopi-kenangan-mantan.png",
        options: {
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
      },
      {
        id: 2,
        name: "Friend Chip Cookies",
        category: "Food",
        price: 12000,
        originalPrice: 17000,
        badge: "Promo",
        image: "https://hreulbsrxakoxwshzmgj.supabase.co/storage/v1/object/public/assets/products/kopken/friend-chip-cookies.png"
      }
    ]
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

export const digitalProducts = [
  {
    id: "imei",
    name: "Unblock IMEI",
    type: "imei",
    image: "imei",
    variants: [
      { name: "1 Bulan", price: 65000 },
      { name: "3 Bulan", price: 85000 }
    ]
  },
  {
    id: "internet",
    name: "Paket Akrab XL/Axis",
    type: "internet",
    image: "kouta",
    variants: [
      { name: "XDA / Super Mini", price: 50000 },
      { name: "XDA25 / Extra Mini", price: 56000 },
      { name: "XDA31 / Mini", price: 62000 },
      { name: "XDA38 / Big", price: 68000 },
      { name: "XDA50 / Jumbo V2", price: 75000 },
      { name: "XDA63 / Super Big", price: 85000 },
      { name: "XDA76 / Super Jumbo", price: 93000 },
      { name: "XDA88 / Mega Big", price: 105000 },
    ]
  }
]